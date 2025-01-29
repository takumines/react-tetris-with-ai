import { GameState } from '../types/tetris';
import { GAME_CONFIG } from '../constants/tetromino';
import { movePiece, rotatePiece, dropPiece } from './movement';
import { checkForCompleteLines } from './lines';
import { getRandomTetromino, createEmptyBoard } from './utils';

/**
 * 新しいゲームの状態を初期化する
 * @returns 初期化されたゲーム状態
 */
export const initializeGame = (): GameState => ({
  board: createEmptyBoard(),
  currentPiece: getRandomTetromino(),
  currentRotation: 0,
  position: { ...GAME_CONFIG.INITIAL_POSITION },
  score: 0,
  level: GAME_CONFIG.INITIAL_LEVEL,
  gameOver: false,
});

// 他のモジュールからの機能をエクスポート
export {
  movePiece,
  rotatePiece,
  dropPiece,
  checkForCompleteLines,
  getRandomTetromino,
};

// 定数のエクスポート
export {
  GAME_CONFIG,
  TETROMINOES,
  TETROMINO_COLORS,
} from '../constants/tetromino';

// 型のエクスポート
export type {
  GameState,
  Tetromino,
  Position,
  MoveDirection,
} from '../types/tetris';
