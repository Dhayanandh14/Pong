press = document.querySelector("#click") // audio sound for clicking the option
options = document.querySelector("#list-of-options") // computer or two player options

//when you click exit it will show alert Do you want to close if click yes it will close otherwise it will not close
function exit() {
    press.play();
    if (confirm("Do you want to close"))
        window.close();
    else alert("Okay Continue Your game")
}

//when click start next will show the options computer or two player if i click computer computer function will execute if i click two player players function will execute 
function start() {
    press.play();
    var removecolor = document.querySelector("#start-page").style.color = "#00000000"
    var removecolor = document.querySelector("#start-page").style.display = "none"
    options.style.display = "block"

}
let playerandcomputerBot =  false // decide who is 

// this function for one player vs bot 
function computer() {
    press.play();
    playerandcomputerBot = true
    alert("Computer Selected")
    options.style.display = "none"
    alert("Player one Use to control W and S key for Paddle Down and Up")
    entered()
}

// this function for 2 players
function players() {
    playerandcomputerBot = false
    press.play();
    options.style.display = "none"
    alert("Player One use W and S keys Player 2 use Up and down arrows")
    entered()
}

//game will or canvas will execute from this function
function entered() {

    press.play();
    var playeronename = document.querySelector("#playername")
    var playertwoname = document.querySelector("#playername2")

    var loadgame = setTimeout(() => {
        var removecolor = document.querySelector("#start-page").style.color = "#00000000"
        document.getElementById("name-form").style.display = "none"
        var paddleSound = document.getElementById("paddle"); // paddle hiting sound
        var wallSound = document.getElementById("wall"); // wall hinting sound
        var canvas = document.querySelector("#canvas");
        var ctx = canvas.getContext("2d")
        canvas.width = window.innerWidth - 30 // canvas width
        canvas.height = window.innerHeight - 20 // canvas height

        let firstMovingStep; // this variable use to maintain the ball speed upto 10 hotss
        let secondMovingStep; // this variable use to increase the ball speed 
        let winnerName, winnerResult = false,
            winnerResult2 = false;

        let radius = 15 // radius of ball
        let x = canvas.width / 2 // x axis
        let y = canvas.height / 2 // y axis
        let movingSpeed = 10 // initiol ball speed
        let dx = 3 //direction of x axix
        let dy = -2 //direction of y axis
        let batWidth = radius // bat width
        let batHeight = 130 // bat height

        var lb1 = canvas.height / 2 - 100 // lefe bat or left paddle
        var rb1 = canvas.height / 2 - 100 //right bat or right paddle
        let ballSpeed = 10


        let pressedUp1 = false
        let pressedDown1 = false
        let rightbatpositon = canvas.width - 45
        let pressedUp2 = false
        let pressedDown2 = false
        let speedcount = 10
        let stopSpeed = true
        //Left side paddle
        let playerOneScore = 0
        let playerOneLoss = 3

        //Right Side paddle
        let playerTwoScore = 0
        let playerTwoLoss = 3


        clearInterval(firstMovingStep)

        //When you click key or press key this condition will true
        document.addEventListener("keydown", (e) => {
            if (e.key == "KeyW" || e.keyCode == 87) pressedUp1 = true
            if (e.key == "keyS" || e.keyCode == 83) pressedDown1 = true
            if (e.key == "Up" || e.key == "ArrowUp") pressedUp2 = true
            if (e.key == "Down" || e.key == "ArrowDown") pressedDown2 = true
            // console.log(e)
        })

        //When you pull from the key or keyup  this condition will false so it will prevent paddle going infinity 
        document.addEventListener("keyup", (e) => {
            if (e.key == "KeyW" || e.keyCode == 87) pressedUp1 = false
            if (e.key == "keyS" || e.keyCode == 83) pressedDown1 = false
            if (e.key == "Up" || e.key == "ArrowUp") pressedUp2 = false
            if (e.key == "Down" || e.key == "ArrowDown") pressedDown2 = false
            // console.log(e)
        })

        //Player one Score how much he got
        function leftBatScore() {
            ctx.font = "30px Arial";
            ctx.fillStyle = 'green';
            ctx.shadowBlur = 10;
            ctx.shadowColor = "black";
            ctx.fillText(`${playerTwoScore}`, canvas.width / 2 - 40, 40);
            ctx.fillText(`${playeronename.value}`, canvas.width / 2 - 250, 40);
            ctx.closePath()
        }

        //it will indicate player one chances how much chance he have 
        function leftBatChances() {
            ctx.font = "30px Arial";
            ctx.fillStyle = "green";
            ctx.shadowBlur = 10;
            ctx.shadowColor = "black";
            ctx.fillText(`${playerTwoLoss}`, canvas.width / 2 - 100, 40)
            ctx.closePath()
        }
        //Player two or computer Score how much score he got
        function rightBatScore() {
            ctx.font = "30px Arial";
            ctx.fillStyle = "blue";
            ctx.shadowBlur = 10;
            ctx.shadowColor = "black";
            ctx.fillText(`${playerOneScore}`, canvas.width / 2 + 30, 40);
            ctx.closePath()
        }

        //it will indicate player two OR computer chances how much chance he have 
        function rightBatChances() {
            ctx.font = "30px Arial";
            ctx.fillStyle = 'blue';
            ctx.shadowBlur = 10;
            ctx.shadowColor = "black";
            ctx.fillText(`${playerOneLoss}`, canvas.width / 2 + 80, 40);
            ctx.fillText(`${playertwoname.value}`, canvas.width / 2 + 150, 40);
            ctx.closePath()
        }

        //this funciton is use to show the final score board 
        function endCard() {
            ctx.font = "25px Arial";
            ctx.strokeRect(canvas.width / 2 - 250, canvas.height / 2 - 100, 500, 200);
            //player one result or score will display
            if (winnerResult) {
                ctx.fillStyle = "green";
                ctx.shadowColor = "green"
                ctx.fillText("GAME OVER", canvas.width / 2 - 90, canvas.height / 2 - 50)
                ctx.fillText(`${winnerName}`, canvas.width / 2 - 150, canvas.height / 2);
                ctx.fillText(`${playername.value} Score is: ${playerTwoScore}`, canvas.width / 2 - 150, canvas.height / 2 + 50);
                ctx.closePath();
            }
            //player two or computer result or score will display
            if (!winnerResult) {
                ctx.fillStyle = "blue";
                ctx.fillText("GAME OVER", canvas.width / 2 - 90, canvas.height / 2 - 50)
                ctx.fillText(`${winnerName}`, canvas.width / 2 - 150, canvas.height / 2);
                ctx.fillText(`${playertwoname.value} Score Is: ${playerOneScore}`, canvas.width / 2 - 150, canvas.height / 2 + 50);
                ctx.closePath();
            }
            ctx.closePath()
        }

        // middle of line in canvas game 
        function middleLine() {
            ctx.beginPath();
            ctx.moveTo(canvas.width / 2, 0);
            ctx.lineTo(canvas.width / 2, canvas.height)
            ctx.strokeStyle = "white"
            ctx.stroke()
            ctx.closePath()
        }

        //Ball creating and moving
        function ball() {
            ctx.beginPath();
            ctx.arc(x, y, radius, 0, 2 * Math.PI)
            ctx.fillStyle = "yellow"
            ctx.shadowBlur = 40;
            ctx.shadowColor = "gold";
            ctx.fill()
            ctx.closePath()
        }
        // left paddle or left bat creating or moving 
        function leftBat() {
            ctx.beginPath();
            ctx.rect(25, lb1, batWidth, batHeight)
            ctx.fillStyle = "green"
            ctx.shadowBlur = 20;
            ctx.shadowColor = "green";
            ctx.lineJoin = "round";
            ctx.fill()
            ctx.closePath()
        }

        // right bat or right paddle creating and moving 
        function rightbatmovementfunction() {
            ctx.beginPath();
            ctx.rect(rightbatpositon, rb1, batWidth, batHeight);
            ctx.fillStyle = "green"
            ctx.lineJoin = "round";
            ctx.shadowBlur = 20;
            ctx.shadowColor = "blue";
            ctx.fillStyle = "blue"
            ctx.fill()
            ctx.closePath()
        }

        //all the movements,calling the functions and executing the function 
        function moving() {
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            ball()
            leftBat()
            middleLine()
            leftBatScore()
            rightBatScore()
            rightBatChances()
            leftBatChances()
            rightbatmovementfunction()
            if (!playerandcomputerBot) { // If bot playerandcomputerBot true the bot will execute
                if (pressedUp2)
                    if (rb1 > 0) rb1 = rb1 - 5
                if (pressedDown2)
                    if (rb1 < canvas.height - 130) rb1 = rb1 + 5
            }
            //Calculate the score and chances for first Player 
            if (x < radius + radius + 25) {
                if (y >= lb1 && y <= lb1 + batHeight) {
                    if (speedcount == 1 && stopSpeed) {
                        speed(7);
                        speedcount = 1;
                        stopSpeed = false
                    } else if (speedcount > 0 && stopSpeed) speedcount--
                    wallSound.pause()
                    paddleSound.play();
                    dx = -dx;
                } else {
                    playerTwoLoss--
                    playerOneScore++
                    x = canvas.width / 2
                    y = canvas.height / 2
                    if (playerTwoLoss == 0) {
                        winnerName = `${playertwoname.value} Won The Match`;
                        clearInterval(secondMovingStep);
                        clearInterval(firstMovingStep);
                        ctx.clearRect(0, 0, canvas.width, canvas.height);
                        winnerResult = false;
                        endCard();
                    }
                }
            }

            // Calculate the score and chances for Second Player or BOT
            if (x > canvas.width - radius - 45) {
                if (y >= rb1 && y <= rb1 + batHeight) {
                    paddleSound.play();
                    dx = -dx;
                } else {
                    playerOneLoss--
                    playerTwoScore++
                    x = canvas.width / 2
                    y = canvas.height / 2;
                    winnerResult = true;
                    if (playerOneLoss == 0) {
                        winnerName = `${playeronename.value} Won The Match`;
                        clearInterval(secondMovingStep);
                        clearInterval(firstMovingStep);
                        ctx.clearRect(0, 0, canvas.width, canvas.height);
                        endCard();
                    }
                }
            }
            //Ball moving step by step
            if (y > canvas.height - 20) {
                dy = -dy
                wallSound.play();
            }
            if (y < radius) {
                wallSound.play();
                dy = -dy
            }
            x = x + dx
            y = y - dy

            //left side paddle up and down movements
            if (pressedUp1)
                if (lb1 > 0) lb1 = lb1 - 5;
            if (pressedDown1)
                if (lb1 < canvas.height - 130) lb1 = lb1 + 5

            //Computer BOT it will automatically move depending upon the ball movements
            if (playerandcomputerBot) {
                if (x > canvas.width - 150) {
                    if (rb1 > 0) {
                        rb1 = y
                        if (y > canvas.height - 130) rb1 = y - 130
                    }
                }
            }
        }

        firstMovingStep = setInterval(moving, movingSpeed) // calling moving function every 500 milisecond

        //Increase the Ball speed when you reach 10 time hitting ball 
        //ball speed will increase one step permanently
        speed = (ha) => {
            clearInterval(firstMovingStep)
            secondMovingStep = setInterval(moving, ha) // call same moving function every 500 milliseconds but ball speed will accept from the paramenter
        }
    }, 500)

}
