import { Direction, PlayerOptions } from '../interfaces/Interfaces';
import { Position } from '../interfaces/Interfaces';
import { CollisionBlock } from './CollisionBlock';
import { Sprite } from './Sprite';
export class Player extends Sprite {
    _context: CanvasRenderingContext2D;
    _velocity: Position = { x: 5, y: 1 };
    _gravity: number = 0;
    _acceleration: number = 0;
    _maxVelocity: number = 20;
    _CollisionBlocks: CollisionBlock[] = [];

    constructor(context: CanvasRenderingContext2D, options: PlayerOptions) {
        super(context, options);
        this._context = context;
        this._gravity = options.gravity || 0;
        this._CollisionBlocks = options.collisionBlocks || [];
    }
    update() {
        this.draw('red');
        this.reactToCollisions();
        this.addGravity();
console.log(this._velocity.x);

    }
    reactToCollisions() {
        for (let i = 0; i < this._CollisionBlocks.length; i++) {
            const block = this._CollisionBlocks[i];

            const collisionDirection = this.collision(block);

            switch (collisionDirection) {
                case Direction.DOWN:
                    this._velocity.y = 0;
                    break;
                case Direction.UP:
                    this._velocity.y = 0;
                    break;
                case Direction.RIGHT:
                    this._velocity.x = -10;
                    break;
                case Direction.LEFT:
                    // this._velocity.x = 0;
                    break;
                default:
                    break;
            }
        }

    }
    addGravity() {
        this._position.y += this._velocity.y;
        this._velocity.y += this._gravity;
    }
    // CONTROLS
    jump() {
        this._velocity.y = -15;
    }
    moveRight() {
        this._velocity.x = 5;
        this.moveHorizontally();
        return
        for (let i = 0; i < this._CollisionBlocks.length; i++) {
            const block = this._CollisionBlocks[i];
            if (this._position.x + this._width + this._velocity.x < block._position.x) {
                this._velocity.x += this._acceleration;
            } else {
                this._velocity.x = 0;
                return
            }
        }
    }
    moveLeft() {
        this._velocity.x = -5;
        this.moveHorizontally()
    }
    moveHorizontally() {
        this._position.x += this._velocity.x;
    }
    stop() {
        this._velocity.x = 0;
    }
    collision(obstacle: Sprite): string | null {
        const obstacleYPos = obstacle._position.y;
        const obstacleXPos = obstacle._position.x;
        const obstacleWidth = obstacle._width;
        const obstacleHeight = obstacle._height;

        if (this._position.y >= obstacleYPos && this._position.y <= obstacleYPos + obstacleHeight) {
            if ((this._position.x < obstacleXPos) && this._position.x + this._width >= obstacleXPos) {
                console.log('right');
                
                return Direction.RIGHT
            }
            if ((this._position.x > obstacleXPos) && this._position.x <= obstacleXPos + obstacleWidth) {
                return Direction.LEFT
            }
        }
        if (this._position.x >= obstacleXPos && this._position.x <= obstacleXPos + obstacleWidth) {
            if ((this._position.y < obstacleYPos) && this._position.y + this._height + this._velocity.y >= obstacleYPos) {
                return Direction.DOWN
            }
            if (this._position.y >= obstacleYPos + obstacleHeight + this._velocity.y &&
                this._position.y < obstacleYPos + obstacleHeight - this._velocity.y
            ) {
                return Direction.UP
            }
        }

        return null
    }
}