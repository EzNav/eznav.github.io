var midgame = false;
var midcar = false;


function startpong(){
    
    var canvas = document.getElementById("pongcanv");
    var ctx = canvas.getContext("2d");
    ctx.font = "200px Arial";
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setTimeout(function() {
        ctx.fillText("3", canvas.width/2 - 50, 400);
    }, 0);
    setTimeout(function() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }, 999);
    
    setTimeout(function() {
        ctx.fillText("2", canvas.width/2 - 50, 400);
    }, 1000);
     setTimeout(function() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }, 1999);
    
    setTimeout(function() {
        ctx.fillText("1", canvas.width/2 - 50, 400);
    }, 2000);
     setTimeout(function() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }, 2999);
    
    setTimeout(function() {
        ctx.fillText("GO!", canvas.width/2 - 150, 400);
    }, 3000);
     setTimeout(function() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }, 3999);
    
    if (midgame == false){
        setTimeout(function() {
            playpong();
        }, 4000);
    }
}
function playpong(){
    
    class ball{

        constructor(xpos,ypos){
            this.x = xpos;
            this.y = ypos;
            this.r = 10;
            this.dx = 10;
            this.dy = -10;
        }
    }
    class paddle{

        constructor(){
            this.x = (canvas.width-75)/2;
            this.PH = 10;
            this.PW = 100;
        }
    }
    
    
    var canvas = document.getElementById("pongcanv");
    var ctx = canvas.getContext("2d");
    var Ball = new ball(canvas.width/2, canvas.height-30);
    var Paddle = new paddle();
    var rightPressed = false;
    var leftPressed = false;
    var brickRowCount = canvas.width/100;
    var brickColumnCount = 3;
    var brickWidth = 75;
    var brickHeight = 20;
    var brickPadding = 10;
    var brickOffsetTop = 30;
    var brickOffsetLeft = 70;
    var score = 0;
    var lives = 3;
    var hack = false;
    midgame = true;
    var bricks = [];

    for(c=0; c<brickColumnCount; c++) {
        bricks[c] = [];
        for(r=0; r<brickRowCount; r++) {
            var x = Math.random()*200;
            var y = Math.random()*200;
            var z = Math.random()*200;
            var col = 'rgb(' + x + ', ' + y + ', ' + z + ')';
            bricks[c][r] = { x: 0, y: 0, status: 3 , color: col};
        }
    }
    
    document.addEventListener("keydown", keyDownHandler, false);
    document.addEventListener("keyup", keyUpHandler, false);
    document.addEventListener("mousemove", mouseMoveHandler, false);
   
    

    function keyDownHandler(e) {
        if(e.keyCode == 39) {
            rightPressed = true;
        }
        else if(e.keyCode == 37) {
            leftPressed = true;
        }
    }
    function keyUpHandler(e) {
        if(e.keyCode == 39) {
            rightPressed = false;
        }
        else if(e.keyCode == 37) {
            leftPressed = false;
        }
    }
    function mouseMoveHandler(e) {
        var relativeX = e.clientX - canvas.offsetLeft;
        if(relativeX > 0 && relativeX < canvas.width) {
            Paddle.x = relativeX;
        }
    }
    function collisionDetection() {
        for(c=0; c<brickColumnCount; c++) {
            for(r=0; r<brickRowCount; r++) {
                var b = bricks[c][r];
                if(b.status >= 1) {
                    if(Ball.x > b.x && Ball.x < b.x+brickWidth && Ball.y > b.y && Ball.y < b.y+brickHeight) {
                        Ball.dy = -Ball.dy;
                        b.status--;
                        score++;
                        if(score/3 == brickRowCount*brickColumnCount) {
                            ctx.clearRect(0, 0, canvas.width, canvas.height);
                            ctx.fillText("You Won!?", canvas.width/2 - 550, 400);
                            midgame = false;
                            lives = 0;
                            
                        }
                    }
                }
            }
        }
    }

    function drawBall() {
        ctx.beginPath();
        ctx.arc(Ball.x, Ball.y, Ball.r, 0, Math.PI*2);
        ctx.fillStyle = "#0095DD";
        ctx.fill();
        ctx.closePath();
    }
    function drawPaddle() {
        ctx.beginPath();
        console.log(Paddle.x);
        ctx.rect(Paddle.x, canvas.height-Paddle.PH, Paddle.PW, Paddle.PH);
        ctx.fillStyle = "#0095DD";
        ctx.fill();
        ctx.closePath();
    }
    function drawBricks() {
        for(c=0; c<brickColumnCount; c++) {
            for(r=0; r<brickRowCount; r++) {
                if(bricks[c][r].status >= 1) {
                    var brickX = (r*(brickWidth+brickPadding))+brickOffsetLeft;
                    var brickY = (c*(brickHeight+brickPadding))+brickOffsetTop;
                    bricks[c][r].x = brickX;
                    bricks[c][r].y = brickY;
                    ctx.beginPath();
                    ctx.rect(brickX, brickY, brickWidth, brickHeight);
                    if (bricks[c][r].status == 3) ctx.fillStyle = "#0095DD";
                    else if (bricks[c][r].status == 2) ctx.fillStyle = "#9995AD";
                    else if (bricks[c][r].status == 1) ctx.fillStyle = "#3332AA";
                    ctx.fill();
                    ctx.closePath();
                }
            }
        }
    }
    function drawScore() {
        ctx.font = "16px Arial";
        ctx.fillStyle = "#0095DD";
        ctx.fillText("Score: "+score, 8, 20);
    }
    function drawLives() {
        ctx.font = "16px Arial";
        ctx.fillStyle = "#0095DD";
        ctx.fillText("Lives: "+lives, canvas.width-65, 20);
    }
    function updatehacks() {
        hack = !hack;
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawBricks();
        drawBall();
        drawPaddle();
        drawScore();
        drawLives();
        collisionDetection();

        if(Ball.x + Ball.dx > canvas.width-Ball.r || Ball.x + Ball.dx < Ball.r) {
            Ball.dx = -Ball.dx;
        }
        if(Ball.y + Ball.dy < Ball.r) {
            Ball.dy = -Ball.dy;
        }
        else if(Ball.y + Ball.dy > canvas.height-Ball.r) {
            if(Ball.x > Paddle.x && Ball.x < Paddle.x + Paddle.PW) {
                Ball.dy = -Ball.dy;
            }
            else {
                lives--;
                if(!lives) {
                    midgame = false;
                }
                else {
                    Ball.x = canvas.width/2;
                    Ball.y = canvas.height-30;
                    Ball.dx = 10;
                    Ball.dy = -10;
                    Paddle.x = (canvas.width-Paddle.PW)/2;
                }
            }
        }
        if (hack){
            Paddle.x = Ball.x - Paddle.PW/2;
        }
        else if(rightPressed && Paddle.x < canvas.width-Paddle.PW) {
            Paddle.x += 10;
        }
        else if(leftPressed && Paddle.x > 0) {
            Paddle.x -= 10;
        }


        Ball.x += Ball.dx;
        Ball.y += Ball.dy;
        if(lives > 0) {
            requestAnimationFrame(draw);
        }else{
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.font = "200px Arial";
            ctx.fillText("Play Again?", canvas.width/2 - 550, 400);
            midgame = false;
            return 0;
        }
    }
    draw();
    
}

function startcar(){
    
    var canvas = document.getElementById("carcanv");
    var ctx = canvas.getContext("2d");
    ctx.font = "200px Arial";
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setTimeout(function() {
        ctx.fillText("3", canvas.width/2 - 50, 400);
    }, 0);
    setTimeout(function() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }, 999);
    
    setTimeout(function() {
        ctx.fillText("2", canvas.width/2 - 50, 400);
    }, 1000);
     setTimeout(function() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }, 1999);
    
    setTimeout(function() {
        ctx.fillText("1", canvas.width/2 - 50, 400);
    }, 2000);
     setTimeout(function() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }, 2999);
    
    setTimeout(function() {
        ctx.fillText("GO!", canvas.width/2 - 150, 400);
    }, 3000);
     setTimeout(function() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }, 3999);
    
    if (midcar == false){
        setTimeout(function() {
            playpong();
        }, 4000);
    }
}

