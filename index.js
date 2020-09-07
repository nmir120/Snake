/*
1. get snake and apple drawn in starting positions $$$
2. get snake head moving $$$
3. colored / checkered background? $$$
4. border = death... game over screen (grid pattern? or is there any easier way?)
5. add body $$$
6. 
7. reorganize where variables should go... var or let?
...
unnecessary to load apple each time? only load when consumed? nbd tho
*/

document.addEventListener("keydown", keyDownEvent);
var continueGame = true;
var snakeBody = [];
var snakeHeadX = 6 * 20;
var snakeHeadY = 10 * 20;
var nextX = 0;
var nextY = 0;
var appleX = 14 * 20;
var appleY = 10 * 20;
var snakeColour = 'rgb(255, 255, 102)';
var appleColour = 'rgb(255, 30, 30)';
var currentDirection = 0; //1 = left, 2 = up, 3 = right, 4 = down


snakeBody.push({x: snakeHeadX, y: snakeHeadY});

setInterval(draw, 1000 / 8); //draw 8 times a second
//possible feature: adjustable speed/difficulty

function loadBackground() {
  //checkered background
  var ctx = canvas.getContext('2d');
  for (var i = 0; i < 20; i++) {
    for (var j = 0; j < 20; j++) {
      if (j % 2 == 0 && i % 2 == 0) {
        ctx.fillStyle = 'rgb(0, 180, 0)';
      } else if (j % 2 != 0 && i % 2 == 0) {
        ctx.fillStyle = 'rgb(0, 200, 0)';
      } else if (j % 2 == 0 && i % 2 != 0) {
        ctx.fillStyle = 'rgb(0, 200, 0)';
      } else {
        ctx.fillStyle = 'rgb(0, 180, 0)';
      }
      ctx.fillRect(j * 20, i * 20, 20, 20);
    }
  }
}

function checkBorderCollision() {
  if ((snakeHeadX + 20*nextX) < 0 || (snakeHeadX + 20*nextX) > 19*20 || (snakeHeadY + 20*nextY) < 0 || (snakeHeadY + 20*nextY) > 19*20) {
    return true;
  }
}

function checkBodyCollision() {
  for (var i = 1; i < snakeBody.length; i++) {
    if ((snakeHeadX + 20*nextX) == snakeBody[i].x && (snakeHeadY + 20*nextY) == snakeBody[i].y) {
      return true;
    }
  }
}

function draw() {
  var canvas = document.getElementById('canvas');
  var prevX;
  var prevY;
  if (canvas.getContext) {
    var ctx = canvas.getContext('2d');
    // load checkered background
    loadBackground();

    if (continueGame) {
      //end game if border is touched
      if (checkBorderCollision() || checkBodyCollision()) {
        continueGame = false;
      } else {
        //load apple
        ctx.fillStyle = appleColour;
        ctx.fillRect(appleX, appleY, 20, 20);
        
        //copy prev X and Y position for body, and update snakeHeadX and Y,
        prevX = snakeBody[snakeBody.length - 1].x; //where the last body piece was before the keydown event
        prevY = snakeBody[snakeBody.length - 1].y;
        snakeHeadX += 20 * nextX; //new head position after keydown event
        snakeHeadY += 20 * nextY;

        //snake shifter: move body pieces along one space
        if(snakeBody.length >= 2) { //two or more body pieces
          for (var i = snakeBody.length - 1; i > 0; i--) {
            snakeBody[i].x = snakeBody[i - 1].x; //this wouldn't work if body length is just 2
            snakeBody[i].y = snakeBody[i - 1].y;
          }
        }
        

        snakeBody[0].x = snakeHeadX; //update snake head
        snakeBody[0].y = snakeHeadY;

        //snake
        ctx.fillStyle = snakeColour;
        for (var i = 0; i < snakeBody.length; i++) { //*** idk why this crashes
          ctx.fillRect(snakeBody[i].x, snakeBody[i].y, 20, 20);
        }
        

      }

      //if snake head touches apple... add body piece, respawn apple
      if (snakeHeadX == appleX && snakeHeadY == appleY) {
        snakeBody.push({x: prevX, y: prevY});
        //ctx.fillRect(prevX, prevY, 20, 20); //body

        //implement: make sure apple doesn't respawn in snake body
        appleX = Math.floor(Math.random()*20) * 20;
        appleY = Math.floor(Math.random()*20) * 20;
      }

    } else { //if game over, leave snake and apple in position?
      //apple
      //   ctx.fillStyle = appleColour;
      //   ctx.fillRect(appleX, appleY, 20, 20);
      //   //snake
      //   ctx.fillStyle = snakeColour;
      //   ctx.fillRect(snakeHeadX, snakeHeadY, 20, 20); //not sure why theres a blink, trace code


      //game over screen + score + (hi-score?)
    }
  }
}

//implement border death (probably done somewhere else)
function keyDownEvent(e) {
  switch (e.keyCode) {
  case 37:
    //if snakeLength > 1 && currentDirection is right, set nextX and Y to 0, else { ...
    nextX = -1;
    nextY = 0;
    break;
  case 38:
    nextX = 0;
    nextY = -1;
    break;
  case 39:
    nextX = 1;
    nextY = 0;
    break;
  case 40:
    nextX = 0;
    nextY = 1;
    break;
  }
}

//   - arrow key triggers change in Image/canvas
//    - certain moves not possible (cant turn left if ur going right etc)
//   - apple appears in a random square excludings spaces occupied by snake
//   - boundary checker: end game if snake touches boundary
//    - disable boundary option
//   - collision checker: end game if head touches body
//   - sound effects
//   - apple count
