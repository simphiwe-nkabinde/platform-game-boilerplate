import { Position, SpriteOptions } from "../interfaces/Interfaces";

export class Sprite {
    _context: CanvasRenderingContext2D;
    _position: Position;
    _width: number = 100;
    _height: number = 100;

    constructor(context: CanvasRenderingContext2D, options: SpriteOptions) {
        this._context =  context;
        this._position = options.position;
        this._width =  options.width;
        this._height = options.height
    }

    draw(fillStyle : string) {
        this._context.fillStyle = fillStyle;
        this._context.fillRect(this._position.x, this._position.y, this._width, this._height);
    }
}