import { CollisionBlock } from './classes/CollisionBlock';
import { Player } from "./classes/Player";

const canvas = document.querySelector('canvas');
const CONTEXT = canvas!.getContext('2d');

canvas!.width = 1024;
canvas!.height = 576;

const GRAVITY = 0.5;
const CONTROLS = {
  JUMP: {
    pressed: false
  },
  RIGHT: {
    pressed: false
  },
  LEFT: {
    pressed: false
  }
}
const groundBlock = new CollisionBlock(CONTEXT!, { position: { x: 0, y: canvas!.height - 10 }, width: canvas!.width, height: 5 });
const ceilingBlock = new CollisionBlock(CONTEXT!, { position: { x: 0, y: 10 }, width: canvas!.width, height: 5 });
const centerObstacle = new CollisionBlock(CONTEXT!, { position: { x: canvas!.width / 4, y: canvas!.height / 2 }, width: canvas!.width / 2, height: 10 });
const rightWall = new CollisionBlock(CONTEXT!, { position: { x: canvas!.width - 10, y: 0 }, width: 5, height: canvas!.height });
const verticalObstacle = new CollisionBlock(CONTEXT!, { position: { x: canvas!.width/2, y: 300 }, width: 10, height: canvas!.height/2 });
const leftWall = new CollisionBlock(CONTEXT!, { position: { x: 10, y: 0 }, width: 5, height: canvas!.height });

const collisionBlocks = [groundBlock, rightWall, leftWall, ceilingBlock, centerObstacle,verticalObstacle]
const player = new Player(CONTEXT!, {
  position: { x: 400, y: 30 },
  gravity: GRAVITY,
  collisionBlocks,
  width: 50,
  height: 50
});

function animate() {
  window.requestAnimationFrame(animate);
  CONTEXT!.fillStyle = 'white';
  CONTEXT!.fillRect(0, 0, canvas!.width, canvas!.height);
  collisionBlocks.forEach(block => {
    block.update()
  });
  player.update();
  if (CONTROLS.JUMP.pressed) player.jump()
  if (CONTROLS.LEFT.pressed) player.moveLeft()
  else player.stop
  if (CONTROLS.RIGHT.pressed) player.moveRight()
  else player.stop
}

animate();

window.addEventListener('keydown', event => {
  switch (event.key) {
    case 'ArrowUp':
      CONTROLS.JUMP.pressed = true
      break;
    case 'ArrowRight':
      CONTROLS.RIGHT.pressed = true
      break;
    case 'ArrowLeft':
      CONTROLS.LEFT.pressed = true
      break;
    default:
      break;
  }
})
window.addEventListener('keyup', event => {
  switch (event.key) {
    case 'ArrowUp':
      CONTROLS.JUMP.pressed = false
      break;
    case 'ArrowRight':
      CONTROLS.RIGHT.pressed = false
      break;
    case 'ArrowLeft':
      CONTROLS.LEFT.pressed = false
      break;
    default:
      break;
  }
})