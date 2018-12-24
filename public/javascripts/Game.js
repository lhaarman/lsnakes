// Our (only) dice
var dice = document.getElementById('dobbelsteen');
var placeholder = document.getElementById('dobbelsteen');
var dicemessage = document.getElementById('dobbelmessage');
var hover = document.getElementById('hover');
var element;
var player;
var isMyTurn = false;
var ID;
var isOver = false;
var socket = new WebSocket("ws://tinysnl.herokuapp.com/");
var currentP = 1;
var screen = document.getElementById("body");
var FSButton = document.getElementById("fsbutton");
var fullscreen = false;
var gameID;
var ID = 0;

dicemessage.innerHTML = "Waiting for players...";


function Player(element){
    this.Xposition = 1;
    this.Yposition = 1;
    this.element = element;
}

Player.prototype.move = function(X, Y){
    this.Xposition = X;
    this.Yposition = Y;
    this.element.style.left = 15 + (this.Xposition -1) * 60 + 'px';
    element.style.top = (540 - (player.Yposition - 1) * 60) + 'px';
}

Player.prototype.move = function(x, y, temp){
    this.Xposition = x;
    this.Yposition = y;
    this.element.style.left = (this.Xposition -1 )*60 + 15 +'px';
    this.element.style.top = (540 - (this.Yposition - 1) * 60) - 45 * (temp - 1) + 'px';
}



dice.onclick = function() {

    dice.style.pointerEvents = "none";
    hover.style.opacity= "0";
    dicemessage.innerHTML = "";
    var audio = new Audio('../images/dicesound.mp3');
    audio.play();

    var result;
    if (isMyTurn && !isOver){
        for(let i = 0; i < 25; i++){
            setTimeout( function timer(){
                result = Math.floor(Math.random() * 6) + 1;
                placeholder.style.backgroundImage = 'url(images/'+ result + '.png)';
                placeholder.style.backgroundSize = 'cover';
                if (i == 24){
                    for (let i = 0; i < result; i++){
                        setTimeout( function timer(){
                                player.Xposition ++;
                                if (player.Xposition == 10 && player.Yposition == 10){
                                    dice.style.pointerEvents = "none";
                                    hover.style.opacity= "0";
                                    dicemessage.innerHTML = "";
                                    console.log("WE WIN");
                                    var win = new Audio('../images/victory.mp3');
                                    console.log(win);
                                    win.play();
                                
                                    isOver = true;
                                    document.getElementById('gameover').innerHTML = "Game over! Player " +  " won!";
                                    socket.send("WON: " + ID + " " + gameID + " ");   
                                }
                                if (((player.Xposition -1 ) %10 == 0) && !isOver){
                                    player.Yposition ++;
                                    element.style.top = (540 - (player.Yposition - 1) * 60) - 45 * (ID - 1) + 'px';
                                    player.Xposition = 1;
                                }
                                if (result === 6 && !isOver){
                                    dicemessage.innerHTML = "You threw 6, throw again!";
                                }
                                if (isOver){
                                    player.Yposition = 10;
                                    player.Xposition = 10;
                                }
                                element.style.left = (player.Xposition -1 )*60 + 15 +'px';

                        }, i* 150);
                    }

                }
            }, i*100 );
        }
        setTimeout( function timer(){
            if (player.Xposition == 3 && player.Yposition == 1){
                player.Xposition = 1;
                player.Yposition = 6;
                player.element.style.left = (player.Xposition -1 )*60 + 15 +'px';
                player.element.style.top = (540 - (player.Yposition - 1) * 60) - 45 * (ID - 1) + 'px';
            }
            if (player.Xposition == 6 && player.Yposition == 1){
                player.Xposition = 7;
                player.Yposition = 3;
                player.element.style.left = (player.Xposition -1 )*60 + 15 +'px';
                player.element.style.top = (540 - (player.Yposition - 1) * 60) - 45 * (ID - 1) + 'px';
            }
            if (player.Xposition == 10 && player.Yposition == 2){
                player.Xposition = 10;
                player.Yposition = 7;
                player.element.style.left = (player.Xposition -1 )*60 + 15 +'px';
                player.element.style.top = (540 - (player.Yposition - 1) * 60) - 45 * (ID - 1) + 'px';
            }
            if (player.Xposition == 6 && player.Yposition == 4){
                player.Xposition = 5;
                player.Yposition = 6;
                player.element.style.left = (player.Xposition -1 )*60 + 15 +'px';
                player.element.style.top = (540 - (player.Yposition - 1) * 60) - 45 * (ID - 1) + 'px';
            }
            if (player.Xposition == 3 && player.Yposition == 7){
                player.Xposition = 5;
                player.Yposition = 10;
                player.element.style.left = (player.Xposition -1 )*60 + 15 +'px';
                player.element.style.top = (540 - (player.Yposition - 1) * 60) - 45 * (ID - 1) + 'px';
            }
            if (player.Xposition == 8 && player.Yposition == 7){
                player.Xposition = 8;
                player.Yposition = 10;
                player.element.style.left = (player.Xposition -1 )*60 + 15 +'px';
                player.element.style.top = (540 - (player.Yposition - 1) * 60) - 45 * (ID - 1) + 'px';
            }
            if (player.Xposition == 5 && player.Yposition == 3){
                player.Xposition = 5;
                player.Yposition = 1;
                player.element.style.left = (player.Xposition -1 )*60 + 15 +'px';
                player.element.style.top = (540 - (player.Yposition - 1) * 60) - 45 * (ID - 1) + 'px';
            }
            if (player.Xposition == 4 && player.Yposition == 4){
                player.Xposition = 1;
                player.Yposition = 1;
                player.element.style.left = (player.Xposition -1 )*60 + 15 +'px';
                player.element.style.top = (540 - (player.Yposition - 1) * 60) - 45 * (ID - 1) + 'px';
            }
            if (player.Xposition == 7 && player.Yposition == 5){
                player.Xposition = 9;
                player.Yposition = 2;
                player.element.style.left = (player.Xposition -1 )*60 + 15 +'px';
                player.element.style.top = (540 - (player.Yposition - 1) * 60) - 45 * (ID - 1) + 'px';
            }
            if (player.Xposition == 5 && player.Yposition == 7){
                player.Xposition = 2;
                player.Yposition = 6;
                player.element.style.left = (player.Xposition -1 )*60 + 15 +'px';
                player.element.style.top = (540 - (player.Yposition - 1) * 60) - 45 * (ID - 1) + 'px';
            }
            if (player.Xposition == 7 && player.Yposition == 9){
                player.Xposition = 7;
                player.Yposition = 6;
                player.element.style.left = (player.Xposition -1 )*60 + 15 +'px';
                player.element.style.top = (540 - (player.Yposition - 1) * 60) - 45 * (ID - 1) + 'px';
            }
            if (player.Xposition == 1 && player.Yposition == 10){
                player.Xposition = 1;
                player.Yposition = 7;
                player.element.style.left = (player.Xposition -1 )*60 + 15 +'px';
                player.element.style.top = (540 - (player.Yposition - 1) * 60) - 45 * (ID - 1) + 'px';
            }
            if (player.Xposition == 9 && player.Yposition == 10){
                player.Xposition = 9;
                player.Yposition = 7;
                player.element.style.left = (player.Xposition -1 )*60 + 15 +'px';
                player.element.style.top = (540 - (player.Yposition - 1) * 60) - 45 * (ID - 1) + 'px';
            }

            if (result != 6 && !isOver){
                console.log("Message sent");
                console.log("ID: " + ID + " X: " + player.Xposition + " Y: " + player.Yposition);
                socket.send("ID: " + ID + " X: " + player.Xposition + " Y: " + player.Yposition + " GD: " + gameID);
                isMyTurn = false;
            }
            else{
                dice.style.pointerEvents = "auto";
                hover.style.opacity= "1";
            }

            }, 3400);
    }
}


socket.onmessage = function(message){
    console.log(message);
    if (message.data.includes("Player: ")){
        // example message
        // "Player: 1 ID: 1"
        //  123456789ABCDEF
        ID = message.data.slice(0,9);
        ID = ID.replace(/[^0-9\.]+/g, "");
        gameID = message.data.slice(10,15);
        gameID = gameID.replace(/[^0-9\.]+/g, "");
        console.log("You are player: " + ID + " with game ID: " + gameID);
        element = document.getElementById('player' + ID);
        player = new Player(element);  
    }
    if (message.data.includes("Game started")){
        console.log("Game has started");
        if (ID == 1){
            isMyTurn = true;
            dice.style.pointerEvents = "auto";
            hover.style.opacity = "1";
            dicemessage.innerHTML = "Your turn!";
        }
        else{
            dicemessage.innerHTML = "Player 1 to throw!";
        }
    }
    else if (message.data.includes("WON: ")){
        var wonID = message.data.replace(/[^0-9\.]+/g, "");
        isOver = true;
        document.getElementById('gameover').innerHTML = "Game over! Player " + wonID + " won!";
        tempplayer = new Player(document.getElementById('player' + wonID))
        tempplayer.move(10,10, wonID);
    }
    // receive player moved
    else if (message.data.includes("ID: ")) {
        // example message
        //"ID: 1 X: 10 Y: 10
        // 0123456789ABCDEFG
        var tempID = message.data.slice(0,6);
        tempID = tempID.replace(/[^0-9\.]+/g, "");

        var X = message.data.slice(6,12);
        X = X.replace(/[^0-9\.]+/g, "");

        var Y = message.data.slice(12,100);
        Y = Y.replace(/[^0-9\.]+/g, "");

        tempplayer = new Player(document.getElementById('player' + tempID));
        tempplayer.move(X,Y, tempID);

        currentP ++;
        if (currentP == 5){
            currentP = 1;
        }
        console.log("Player " + currentP + "'s turn.");
        if (currentP == ID){
            dicemessage.innerHTML = "Your turn!";
            isMyTurn = true;
            dice.style.pointerEvents = "auto";
            hover.style.opacity = "1";
        }
        else{
            dicemessage.innerHTML = "Player " + currentP + " to throw!";
        }
    }
    else if (message.data.includes("ABORTED")){
        dicemessage.innerHTML = "Game aborted";
        dice.style.pointerEvents = "none";
        hover.style.opacity = "0";
    }
    
}
socket.onopen = function(){
    socket.send("Hello from the client! I am a player from game: " + gameID);
};

window.onbeforeunload = function(){
    socket.send("CLOSE " + gameID);
}


/* When the openFullscreen() function is executed, open the video in fullscreen.
Note that we must include prefixes for different browsers, as they don't support the requestFullscreen method yet */
FSButton.onclick = function() {
    if(!fullscreen){
        fullscreen = true;
        if (screen.requestFullscreen) {
            screen.requestFullscreen();
        } else if (screen.mozRequestFullScreen) { /* Firefox */
            screen.mozRequestFullScreen();
        } else if (screen.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
            screen.webkitRequestFullscreen();
        } else if (screen.msRequestFullscreen) { /* IE/Edge */
            screen.msRequestFullscreen();
        }
    }
    else{
        fullscreen = false;
        if (document.exitFullscreen) {
        document.exitFullscreen();
        } else if (document.mozCancelFullScreen) { /* Firefox */
        document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) { /* Chrome, Safari and Opera */
        document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) { /* IE/Edge */
        document.msExitFullscreen();
        }
    }
}
