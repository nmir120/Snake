/*
- make sure apple does not spawn within body (while loop?) 
- reorganize where variables should go... var or let?
- unnecessary to load apple and background each time? only load when consumed? nbd tho
- push on two body pieces rather than 1?
- adjustable grid (and tile) size?
  - full screen mode?
- adjustable speed/difficulty (higher draws per second)
- disable borders option (portals instead)
- apple count
  - change font
- centre canvas in window
- game over screen (apple count, high-score apple count?)
- add an html element beneath canvas that displays current score mid-game?
- sound effects
- what happens if you win?
*/

document.addEventListener("keydown", keyDownEvent);
var continueGame = true;
var tileSize = 20;
var appleCount = 0;
var snakeBody = [];
var snakeHeadX = 6 * tileSize;
var snakeHeadY = 10 * tileSize;
var nextX = 0;
var nextY = 0;
var appleX = 14 * tileSize;
var appleY = 10 * tileSize;
var snakeColour = 'rgb(255, 255, 102)';
var currentSnakeColour = snakeColour;
var appleColour = 'rgb(255, 30, 30)';
var deadSnakeColour = 'rgb(115, 115, 115)';
var currentDirection = 0; //1 = left, 2 = up, 3 = right, 4 = down

snakeBody.push({x: snakeHeadX, y: snakeHeadY});
setInterval(draw, 1000 / 8); //draw 7 times a second

function loadBackground(ctx) {
  //checkered background
  for (var i = 0; i < tileSize; i++) {
    for (var j = 0; j < tileSize; j++) {
      if (j % 2 == 0 && i % 2 == 0) {
        ctx.fillStyle = 'rgb(0, 180, 0)';
      } else if (j % 2 != 0 && i % 2 == 0) {
        ctx.fillStyle = 'rgb(0, 200, 0)';
      } else if (j % 2 == 0 && i % 2 != 0) {
        ctx.fillStyle = 'rgb(0, 200, 0)';
      } else {
        ctx.fillStyle = 'rgb(0, 180, 0)';
      }
      ctx.fillRect(j * tileSize, i * tileSize, tileSize, tileSize);
    }
  }
}

function checkBorderCollision() {
  if ((snakeHeadX + tileSize * nextX) < 0 || (snakeHeadX + tileSize * nextX) > (tileSize-1) * tileSize || (snakeHeadY + tileSize * nextY) < 0 || (snakeHeadY + tileSize * nextY) > (tileSize - 1) * tileSize) {
    return true;
  }
}

function checkBodyCollision() {
  for (var i = 1; i < snakeBody.length; i++) {
    if ((snakeHeadX + tileSize * nextX) == snakeBody[i].x && (snakeHeadY + tileSize * nextY) == snakeBody[i].y) {
      return true;
    }
  }
}

function drawSnake(ctx) {
  for (var i = 0; i < snakeBody.length; i++) {
    ctx.fillStyle = currentSnakeColour;
    ctx.fillRect(snakeBody[i].x, snakeBody[i].y, tileSize, tileSize);
    // ctx.strokeStyle = 'rgb(255, 255, 255)';
    // ctx.beginPath();
    // ctx.moveTo(snakeBody[i].x + 10, snakeBody[i].y + 20);
    // ctx.bezierCurveTo(20, 100, 200, 100, snakeBody[i].x + 10, snakeBody[i].y);
    // ctx.stroke();
  }
}

function draw() {
  var canvas = document.getElementById('canvas');

  var prevX;
  var prevY;

  if (canvas.getContext) {
    var ctx = canvas.getContext('2d');

    // load checkered background
    loadBackground(ctx);
    //load apple
    ctx.fillStyle = appleColour;
    ctx.fillRect(appleX, appleY, tileSize, tileSize);
    document.getElementById("apples").innerHTML = "Apple count: " + appleCount; 

    if (continueGame) {
      //end game if border or body is touched
      if (checkBorderCollision() || checkBodyCollision()) {
        continueGame = false;
        currentSnakeColour = deadSnakeColour;
        drawSnake(ctx);

      } else {
        //copy prev X and Y position for body, and update snakeHeadX and Y,
        prevX = snakeBody[snakeBody.length - 1].x; //where the last body piece was before the keydown event
        prevY = snakeBody[snakeBody.length - 1].y;
        snakeHeadX += tileSize * nextX; //new head position after keydown event
        snakeHeadY += tileSize * nextY;

        //snake shifter: move body pieces along one space
        if(snakeBody.length >= 2) { //two or more body pieces
          for (var i = snakeBody.length - 1; i > 0; i--) {
            snakeBody[i].x = snakeBody[i - 1].x;
            snakeBody[i].y = snakeBody[i - 1].y;
          }
        }

        snakeBody[0].x = snakeHeadX; //update snake head
        snakeBody[0].y = snakeHeadY;

        //snake
        currentSnakeColour = snakeColour;
        drawSnake(ctx);
        
      }

      //if snake head touches apple... add body piece, respawn apple
      if (snakeHeadX == appleX && snakeHeadY == appleY) {
        snakeBody.push({x: prevX, y: prevY});

        //implement: make sure apple doesn't respawn in snake body
        appleX = Math.floor(Math.random() * tileSize) * tileSize;
        appleY = Math.floor(Math.random() * tileSize) * tileSize;
        appleCount++;
      }

    } else {
      //game over screen + score + (hi-score?)
      currentSnakeColour = deadSnakeColour;
      drawSnake(ctx);
    }
  }
}

function keyDownEvent(e) {
  switch (e.keyCode) {
    case 37:
      if (snakeBody.length > 1 && currentDirection == 3) { //cannot turn directly left if snake is going right
        nextX = 1;
      } else { 
        nextX = -1;
        currentDirection = 1;
      }
      nextY = 0;
      break;
    case 38:
      nextX = 0;
      if (snakeBody.length > 1 && currentDirection == 4) { //cannot go directly up if snake is moving down
        nextY = 1;
      } else {
        nextY = -1;
        currentDirection = 2;
      }
      break;
    case 39:
      if (snakeBody.length > 1 && currentDirection == 1) { //cannot go directly right if snake is moving left
        nextX = -1;
      } else {
        nextX = 1;
        currentDirection = 3;
      }
      nextY = 0;
      break;
    case 40:
      nextX = 0;
      if (snakeBody.length > 1 && currentDirection == 2) { //cannot go directly down if snake is going up
        nextY = -1;
      } else {
        nextY = 1;
        currentDirection = 4;
      }
      break;
  }
}

