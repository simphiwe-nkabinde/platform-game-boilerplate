import { CollisionBlock } from './../classes/CollisionBlock';

export interface Position {
    x: number;
    y: number;
}
export interface PlayerOptions {
    position: Position;
    gravity?: number;
    collisionBlocks?: CollisionBlock[];
}
export interface CollisionBlockOptions {
    position: Position;
    width: number;
    height: number;
}