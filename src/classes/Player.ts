import { PlayerOptions } from '../interfaces/Interfaces';
import { Position } from '../interfaces/Interfaces';
import { CollisionBlock } from './CollisionBlock';
import { Sprite } from './Sprite';
export class Player extends Sprite {
    _context: CanvasRenderingContext2D;
    _velocity: Position = { x: 5, y: 0 };
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
        this.addGravity()
        this.addHorizontalCollisions();
    }
    addHorizontalCollisions() {
        for (let i = 0; i < this._CollisionBlocks.length; i++) {
            const block = this._CollisionBlocks[i];
            if (this.isCollidingHorizontally(this, block)) {
                if (this._velocity.x > 0) {

                }

            } else {
                this._velocity.x += this._acceleration;
            }
        }

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
        }
    }
    // CONTROLS
    jump() {
        this._velocity.y = -15;
    }
    moveRight() {
        this._velocity.x = 2;
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
        this._velocity.x = -2;
        this.moveHorizontally()
    }
    moveHorizontally() {
        this._position.x += this._velocity.x;
    }
    stop() {
        this._velocity.x = 0;
    }
    isCollidingVertically(player: Player, object2: Sprite): Boolean {
        if (player._position.y + player._height + player._velocity.y < object2._position.y) {
            return false
        } else {
            return true
        }
    }
    isCollidingHorizontally(player: Player, object2: Sprite): Boolean {

        if (object2._position.y > player._position.y + player._height - 1
            || object2._position.y + object2._height + 1 < player._position.y) {
            return false
        }
        let blockIsOnRightSide = (player._position.x + player._width < object2._position.x);
        let blockIsOnLeftSide = (player._position.x > object2._position.x + object2._width);

        return (!blockIsOnLeftSide && !blockIsOnRightSide) ? true : false;
    }
    // collision(player: Player, object2: CollisionBlock): string {

    // }
}