var express = require("express");
var http = require("http");
var websocket = require("ws");
var cookies = require("cookie-parser");
// hope this worksS
var indexRouter = require("./routes/index");
var port = 443;
var app = express();

var counter = 0;
var playercounter = 0;
var games = [];
var gamecounter = 1;
var completed = 0;
var aborted = 0;

app.set('view engine', 'ejs');
app.use(express.static(__dirname + "/public"));

var server = http.createServer(app);

server.listen(process.env.PORT || port);

const wss = new websocket.Server({ server});

app.get("/", (req, res, next) => {
    counter++;
    res.cookie("Amount of times visited ", counter. httpOnly);
    res.render('splash.ejs', {games: gamecounter - 1 , complete: completed, abort: aborted });
    next();
});
app.get("/play", indexRouter);

function Game(amount){
    this.ID = gamecounter;
    this.amount = amount;
    this.players = [];
    this.isOver = false;
    this.started = false;
    this.currentPlayer = 0;
}

var currentGame = new Game(4);
games.push(currentGame);

function Player(ID, X , Y, ws){
    this.Xposition = X;
    this.Yposition = Y;
    this.ID = ID;
    this.ws = ws;
}

Game.prototype.addPlayer = function(player){
    this.players.push(player);
    console.log("[GAME] player added")
    if (this.players.length == this.amount){
        this.start();
        console.log("[GAME] Game " + gamecounter + " created");
        gamecounter ++;
        newGame = new Game(4);
        games.push(newGame);
    } 
}    

Game.prototype.start = function(){
    console.log("[GAME] game started");
    this.started = true;
    for (var i = 0; i < this.players.length; i++){
        this.players[i].ws.send("Game started");
    }
}

wss.on("connection", function(ws){
    playercounter++;
    ws.send("Player: " + playercounter + " GD: " + gamecounter);
    if (playercounter >= 4){
      playercounter = 0;
    }
    console.log("[Message-LOG] Message sent: " + "Player: " + playercounter + " GD: " + gamecounter);

    var player = new Player(playercounter, 1 ,1, ws);
    games[gamecounter -1].addPlayer(player);

    ws.on("message", function incoming(message){
        console.log("[Message-LOG] " + message);
        if (message.includes("ID")){
            var ID = message.slice(0,6);
            ID = ID.replace(/[^0-9\.]+/g, "");

            var X = message.slice(6,12);
            X = X.replace(/[^0-9\.]+/g, "");

            var Y = message.slice(12,18);
            Y = Y.replace(/[^0-9\.]+/g, "");

            var gameID = message.slice(19,22);
            gameID = gameID.replace(/[^0-9\.]+/g, "");
            
            games[gameID -1].players[ID - 1].Xposition = X;
            games[gameID -1].players[ID - 1].Yposition = Y;
            console.log("We have player " + ID + " in game " + gameID + " at X = " + games[gameID -1].players[ID - 1].Xposition + " and at Y = " + games[gameID -1].players[ID - 1].Yposition);
            
            for (var i = 0; i < games[gameID -1].players.length; i++){
                games[gameID -1].players[i].ws.send("ID: " + ID + " X: " + games[gameID -1].players[ID - 1].Xposition + " Y: " + games[gameID -1].players[ID - 1].Yposition);
            }

            games[gameID -1].currentPlayer = (games[gameID -1].currentPlayer + 1 )% 4;
            games[gameID -1].players[games[gameID -1].currentPlayer].ws.send("GO"); 
        }
        if (message.includes("WON")){
            var winnerID = message.slice(0,6);
            winnerID = winnerID.replace(/[^0-9\.]+/g, "");
            var wonID = message.slice(6,8);
            wonID = wonID.replace(/[^0-9\.]+/g, "");
            for (var i = 0; i < games[wonID -1].players.length; i++){
              games[wonID -1].players[i].ws.send("WON: " + winnerID);
            }
            completed++;
        }
        if (message.includes("CLOSE")){
            var gameID = message.slice(6, 100);
            gameID = message.replace(/[^0-9\.]+/g, "");
            let currentGame = games[gameID - 1];
            for (var i = 0; i < currentGame.players.length; i++){
                try { 
                    currentGame.players[i].ws.send("ABORTED");
                    currentGame.players[i].ws.close();
                }
                catch (e){
                    console.log("player " + (i+1) + "is closing");
                }
            }
            aborted++;
        }
    });

});

