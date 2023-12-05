import { CollisionBlockOptions, Position } from '../interfaces/Position';
export class CollisionBlock {
    _context: CanvasRenderingContext2D;
    _width: number = 0;
    _height: number = 0;
    _position: Position = { x: 0, y: 0 };
    constructor(context: CanvasRenderingContext2D, options: CollisionBlockOptions) {
        this._context = context;
        this._width = options.width;
        this._height = options.height;
        this._position = options.position;
    }
    draw() {
        this._context.fillStyle = 'blue';
        this._context.fillRect(this._position.x, this._position.y, this._width, this._height);
    }
    update() {
        this.draw();
    }
}