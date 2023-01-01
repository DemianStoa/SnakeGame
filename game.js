import { update as updateSnake, draw as drawSnake, SNAKE_SPEED, onSnake, getSnakeHead, snakeIntersection } from './snake.js'
import { update as updateFood, draw as drawFood } from './food.js'
import { outsideGrid  } from './grid.js'
import { inputDirection, lastInputDirection } from './input.js'

let lastRenderTime = 0
let gameOver = false
const gameBoard = document.getElementById('game-board')

function main(currentTime) {
    if(gameOver) {
        if(confirm("you lost. Press ok to restart")) {
            window.location = '/'
        }
        return
    }
 

    window.requestAnimationFrame(main)
    const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000
    if(secondsSinceLastRender < 1 /SNAKE_SPEED) return
   
    
    lastRenderTime = currentTime

    update()
    draw() 
    lastInputDirection.x = inputDirection.x
    lastInputDirection.y = inputDirection.y
    console.log(lastInputDirection)
}

window.requestAnimationFrame(main)

function update(){
  updateSnake()
  updateFood()
  checkDeath()
}

function draw(){
   gameBoard.innerHTML=""
   drawSnake(gameBoard)
   drawFood(gameBoard)
}

function checkDeath() {
    gameOver = outsideGrid(getSnakeHead()) || snakeIntersection()
}
