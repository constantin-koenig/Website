var context, canvas;

var foodPosition = [
    Math.floor(Math.random() * 100) * 10,
    Math.floor(Math.random() * 60) * 10,
];

var snakePosition = [ 100,100 ];
var snakeCorps = [[100,100],[90,100],[80,100]];
var direction ='ArrowRight';
var block = 10;
var over = false;
var score = 0;
var framesPerSeconds = 1000/10;

window.onload = () => {
    canvas = document.getElementById('canvas');
    context = canvas.getContext('2d');
    setInterval(() =>  {
        drawSnake();
        snakeAnimation();
        eatFruit();
    }, framesPerSeconds);
    document.addEventListener('keydown', directionChange, false);
    document.addEventListener('click', () => {
        if(over){
            resetGame();
        }
    });
};

function directionChange(event) {
    switch(event.key) {
        case "ArrowUp":
            if(direction !== "ArrowDown") {
                direction = event.key;
            }
            break;

        case "ArrowDown":
            if(direction !== "ArrowUp") {
              direction = event.key;
            }
            break;

        case "ArrowRight":
            if(direction !== "ArrowLeft") {
                direction = event.key;
            }
            break;

        case "ArrowLeft":
            if(direction !== "ArrowRight") {
                direction = event.key;
            }
            break;
        default:
            console.log("No match");
            return;    
    }
}

function snakeAnimation() {
    if (over){
        return;
    }

    switch(direction) {
        case "ArrowUp":
            snakePosition[1] = snakePosition[1] - 10;
            break;
        case "ArrowDown":
            snakePosition[1] = snakePosition[1] + 10;
            break;
        case "ArrowLeft":
            snakePosition[0] = snakePosition[0] - 10;
            break;
        case "ArrowRight":
            snakePosition[0] = snakePosition[0] + 10;
            break;
    }
    gameover();
}

function eatFruit() {
    if(snakePosition[0] === foodPosition[0] && snakePosition[1] === foodPosition[1]) {
        foodPosition = [
            Math.floor(Math.random()*72) * 10,
            Math.floor(Math.random()*48) * 10,
        ];
        score = score + 10;
    } else {
        snakeCorps.pop();
    }
}

function createRectangle(posX,posY,width,height,color,position) {
    if(position === 0) {
        context.fillStyle = 'green';
    } else {
        context.fillStyle = color;
    }
    
    context.fillRect(posX,posY,width,height);
}

function drawSnake() {
    createRectangle(0,0,canvas.width,canvas.height,'white');
    createRectangle(foodPosition[0],foodPosition[1],block,block,'red');
    snakeCorps.splice(0,0,[snakePosition[0],snakePosition[1]]);
    snakeCorps.forEach((element,index) => {
        console.log(element);
        createRectangle(element[0],element[1],block,block,'black',index);
    })

    context.font = "25px sans serif";
    context.fillText("Points: " + score, 20 ,30);
    
    if(over) {
        displayMessage("Gameover")
    }
}

function gameover() {
    if(snakePosition[0] > canvas.width - 10 || snakePosition[0] < 0 ) {
        over = true;
    } else if(snakePosition[1] > canvas.height - 10 || snakePosition[1] < 0) {
        over = true;
    }

    for(var i = 3; i < snakeCorps.length; i++) {
        var body = snakeCorps[i];
        if(snakePosition[0] === body[0] && snakePosition[1] === body[1]) {
            over = true;
        } 
    }
}

function displayMessage(message) {
    context.fillStyle = "rgb(0,255,0)";
    context.font = "50px sans-serif";
    context.fillText(message, 250, 250);
    context.font = "25px sans-serif";
    context.fillText("Click to continue", 275, 300)
    
}

function resetGame() {
    foodPosition = [
        Math.floor(Math.random()*72) * 10,
        Math.floor(Math.random()*48) * 10,
    ];
    snakePosition = [ 100,100 ];
    score = 0;
    snakeCorps = [[100,100],[90,100],[80,100]];
    over = false;
    direction ='ArrowRight';
}
// todo display points etc
