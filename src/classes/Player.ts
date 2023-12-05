import { PlayerOptions } from './../interfaces/Position';
import { Position } from '../interfaces/Position';
import { CollisionBlock } from './CollisionBlock';
export class Player {
    _position: Position;
    _context: CanvasRenderingContext2D;
    _velocity: Position = { x: 5, y: 0 };
    _gravity: number = 0;
    _acceleration: number = 0;
    _maxVelocity: number = 20;
    _width: number = 100;
    _height: number = 100;
    _CollisionBlocks: CollisionBlock[] = [];
    constructor(context: CanvasRenderingContext2D, options: PlayerOptions) {
        this._position = options.position;
        this._context = context;
        this._gravity = options.gravity || 0;
        this._CollisionBlocks = options.collisionBlocks || [];
    }

    draw() {
        this._context.fillStyle = 'red';
        this._context.fillRect(this._position.x, this._position.y, this._width, this._height);
    }
    update() {
        this.draw();
        this.addGravity()
    }
    addGravity() {
        this._position.y += this._velocity.y;
        for (let i = 0; i < this._CollisionBlocks.length; i++) {
            const block = this._CollisionBlocks[i];
            // console.log(`block position x: ${block._position.x} , y: ${block._position.y}`);

            if (this.isCollidingVertically(this, block)) {
                this._velocity.y = 0;
            } else {
                this._velocity.y += this._gravity;
                return
            }
            if (this.isCollidingHorizontally(this, block)) {
                // this.stop()
                console.log('CollidingHorizontally');
                
            } else {
                this._velocity.x += this._acceleration;
            }
        }
    }
    // CONTROLS
    jump() {
        this._velocity.y = -15;
    }
    moveRight() {
        this._position.x += this._velocity.x; return
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
        this._position.x -= this._velocity.x;
    }
    stop() {
        this._velocity.x = 0;
        console.log(this._velocity);

    }
    isCollidingVertically(player: Player, object2: CollisionBlock): Boolean {
        if (player._position.y + player._height + player._velocity.y < object2._position.y) {
            return false
        } else {
            return true
        }
    }
    isCollidingHorizontally(player: Player, object2: CollisionBlock): Boolean {
        // if (object2.y)
        let blockIsOnRightSide = (player._position.x < object2._position.x);
        let isCollidingRight = false;
        let isCollidingLeft = false;
        // console.log('blockIsOnRightSide:', blockIsOnRightSide);


        if (blockIsOnRightSide) {
            isCollidingRight = (player._position.x + player._width < object2._position.x) ? true : false
        } else {
            isCollidingLeft = (player._position.x > object2._position.x + object2._width) ? true : false
        }
        return isCollidingLeft// || isCollidingRight) ? true : false
    }
}