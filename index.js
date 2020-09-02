/*
1. get snake and apple drawn in starting positions
2. get snake head moving $$$
3. colored / checkered background? $$$
4. border = death... game over screen
...
*/



setInterval(draw, 1000 / 8); //draw 8 times a second

document.addEventListener("keydown", keyDownEvent);
var snakeX = 6*20;
var snakeY = 10*20;
var nextX = 0;
var nextY = 0;
var appleX = 14*20;
var appleY = 10*20;

var snakeColour = 'rgb(255, 255, 102)';

var currentDirection = 3; //1 = left, 2 = up, 3 = right, 4 = down
//start with no direction and only head piece?

function draw() {
    var canvas = document.getElementById('canvas');
    if (canvas.getContext) {
        var ctx = canvas.getContext('2d');

        //checkered background
        for (var i = 0; i < 20; i++) {
            for (var j = 0; j < 20; j++) {
                if (j % 2 == 0 && i % 2 == 0) {
                    ctx.fillStyle = 'rgb(0, 180, 0)';
                } else if (j % 2 != 0 && i % 2 == 0) {
                    ctx.fillStyle = 'rgb(0, 200, 0)';
                }
                else if (j % 2 == 0 && i % 2 != 0) {
                    ctx.fillStyle = 'rgb(0, 200, 0)';
                }
                else {
                    ctx.fillStyle = 'rgb(0, 180, 0)';
                }
                ctx.fillRect(j * 20, i * 20, 20, 20);
            }
        }
        //apple starting position
        ctx.fillStyle = 'rgb(255, 30, 30)';
        ctx.fillRect(appleX, appleY, 20, 20);


        //snake starting position
        ctx.fillStyle = snakeColour;
        ctx.fillRect((snakeX + 20 * nextX), (snakeY + 20 * nextY), 20, 20); //head

        //update snakeX and Y
        snakeX += 20 * nextX;
        snakeY += 20 * nextY;
        //body
        // ctx.fillRect(5*20, 10*20, 20, 20);
        // ctx.fillRect(4*20, 10*20, 20, 20);


        //if snake head touches apple... change colour for now, and respawn apple
        if(snakeX == appleX && snakeY == appleY) {
            snakeColour = 'rgb('+
            Math.floor(Math.random()*256)+','+
            Math.floor(Math.random()*256)+','+
            Math.floor(Math.random()*256)+')';

            //implement make sure apple doesn't respawn in snake body
            appleX = Math.floor(Math.random()*20) * 20;
            appleY = Math.floor(Math.random()*20) * 20;
        }
    
    }
}

//implement border death (probably done somewhere else)
function keyDownEvent(e) {
    switch (e.keyCode) {
    case 37:
        console.log("left")
        //implement: does nothing if snake headed right? 
        nextX = -1;
        nextY = 0;
        break;
    case 38:
        console.log("up");
        nextX = 0;
        nextY = -1;
        break;
    case 39:
        console.log("right");
        nextX = 1;
        nextY = 0;
        break;
    case 40:
        console.log("down");
        nextX = 0;
        nextY = 1;
        break;
    }
  }

  
//   - arrow key triggers change in Image/canvas
//      - certain moves not possible (cant turn left if ur going right etc)
//   - apple appears in a random square excludings spaces occupied by snake
//   - boundary checker: end game if snake touches boundary
//      - disable boundary option
//   - collision checker: end game if head touches body
//   - sound effects
//   - apple count
