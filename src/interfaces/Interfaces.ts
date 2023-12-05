import { CollisionBlock } from '../classes/CollisionBlock';

export interface Position {
    x: number;
    y: number;
}
export interface PlayerOptions {
    position: Position;
    width: number;
    height: number;
    gravity?: number;
    collisionBlocks?: CollisionBlock[];

}
export interface SpriteOptions {
    position: Position;
    width: number;
    height: number;
}
export interface CollisionBlockOptions {
    position: Position;
    width: number;
    height: number;
}
export enum Direction {
    UP = "UP",
    DOWN = "DOWN",
    LEFT = "LEFT",
    RIGHT = "RIGHT",
    NONE = "NONE",
}