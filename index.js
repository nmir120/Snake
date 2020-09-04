/*
1. get snake and apple drawn in starting positions $$$
2. get snake head moving $$$
3. colored / checkered background? $$$
4. border = death... game over screen (grid pattern? or is there any easier way?)
5. add body ... duplicate last position?
6. 
7. reorganize where variables should go... var or let?
...
unnecessary to load apple each time? only load when consumed? nbd tho
*/

var continueGame = true;
setInterval(draw, 1000 / 8); //draw 8 times a second
//possible feature: adjustable speed/difficulty

document.addEventListener("keydown", keyDownEvent);
var snakeBody = [];

var snakeX = 6 * 20;
var snakeY = 10 * 20;

var nextX = 0;
var nextY = 0;
var appleX = 14 * 20;
var appleY = 10 * 20;

var snakeColour = 'rgb(255, 255, 102)';
var appleColour = 'rgb(255, 30, 30)';

var currentDirection = 0; //1 = left, 2 = up, 3 = right, 4 = down
//start with no direction and only head piece?

function draw() {
  var canvas = document.getElementById('canvas');
  var prevX;
  var prevY;
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

    if (continueGame) {
      //end game if border is touched
      if ((snakeX + 20*nextX) < 0 || (snakeX + 20*nextX) > 19*20 || (snakeY + 20*nextY) < 0 || (snakeY + 20*nextY) > 19*20) {
        continueGame = false;
        //get rid of apple and snake?

        //else if snake head touches body piece
      } else {
        //apple
        ctx.fillStyle = appleColour;
        ctx.fillRect(appleX, appleY, 20, 20);
        //snake
        ctx.fillStyle = snakeColour;
        //copy prev X and Y position for body, and update snakeX and Y,
        prevX = snakeX; //where the head was before the keydown event
        prevY = snakeY;
        snakeX += 20 * nextX; //new head position after keydown event
        snakeY += 20 * nextY;

        //snake shifter: move body pieces along one space
        // if (snakeBody.length > 2) {
        //   for (var i = snakeBody.length; i > 2; i - 2) {
        //     snakeBody[i] = snakeBody[i - 2]; //update Y for each body piece
        //     snakeBody[i - 1] = snakeBody [i - 3] //update X
        //   }
        // }

        snakeBody[0] = snakeX; //update snake head
        snakeBody[1] = snakeY;

        ctx.fillRect(snakeBody[0], snakeBody[1], 20, 20); //draw head

        if (snakeBody.length > 2) {
        //   for (var i = 2; i < snakeBody.length; i + 2) {
        //     ctx.fillRect(snakeBody[i], snakeBody[i+1], 20, 20); 
        //   }
          ctx.fillRect(prevX, prevY, 20, 20);
        }
        //tried to draw all of body... 
        // for (var i = 0; i < snakeBodyX.length; i++) {
        //     ctx.fillRect(snakeBodyX[i], snakeBodyY[i], 20, 20);
        // }
        
      }

      //if snake head touches apple... add body piece, respawn apple
      if (snakeX == appleX && snakeY == appleY) {
        console.log(snakeBody.length);
        snakeBody.push(prevX);
        snakeBody.push(prevY);
        console.log(snakeBody.length);
        //ctx.fillRect(prevX, prevY, 20, 20); //body

        //implement: make sure apple doesn't respawn in snake body
        appleX = Math.floor(Math.random()*20) * 20;
        appleY = Math.floor(Math.random()*20) * 20;
      }

    } else { //if game over, leave snake and apple in position?
      //apple
      ctx.fillStyle = appleColour;
      ctx.fillRect(appleX, appleY, 20, 20);
      //snake
      ctx.fillStyle = snakeColour;
      ctx.fillRect(snakeX, snakeY, 20, 20); //not sure why theres a blink, trace code
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
