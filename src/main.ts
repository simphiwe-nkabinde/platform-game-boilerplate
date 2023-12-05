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
const groundBlock = new CollisionBlock(CONTEXT!, { position: { x: 0, y: canvas!.height - 5 }, width: canvas!.width, height: 10 });
const rigthWall = new CollisionBlock(CONTEXT!, { position: { x: canvas!.width - 5, y: 0 }, width: 10, height: canvas!.height });
const collisionBlocks = [groundBlock]
const player = new Player(CONTEXT!, {
  position: { x: 200, y: 0 },
  gravity: GRAVITY,
  collisionBlocks
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