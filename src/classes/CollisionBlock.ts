import { CollisionBlockOptions, Position } from '../interfaces/Interfaces';
import { Sprite } from './Sprite';
export class CollisionBlock extends Sprite {
    constructor(context: CanvasRenderingContext2D, options: CollisionBlockOptions) {
        super(context, options);
    }
    update() {
        this.draw('blue');
    }
}