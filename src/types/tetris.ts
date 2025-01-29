/**
 * テトロミノの種類を表す型
 */
export type Tetromino = 'I' | 'O' | 'T' | 'S' | 'Z' | 'J' | 'L';

/**
 * ゲームの状態を表すインターフェース
 */
export interface GameState {
  board: number[][];
  currentPiece: Tetromino;
  currentRotation: number;
  position: Position;
  score: number;
  level: number;
  gameOver: boolean;
}

/**
 * 位置を表すインターフェース
 */
export interface Position {
  x: number;
  y: number;
}

/**
 * テトロミノの形状を表す型
 */
export type TetrominoShape = number[][];

/**
 * テトロミノの回転状態を表す型
 */
export type TetrominoRotations = TetrominoShape[];

/**
 * 全テトロミノの形状を表す型
 */
export type TetrominoShapes = Record<Tetromino, TetrominoRotations>;

/**
 * 移動方向を表す型
 */
export type MoveDirection = 'left' | 'right' | 'down';

/**
 * テトロミノの色を表す型
 */
export type TetrominoColors = Record<Tetromino, string>;
