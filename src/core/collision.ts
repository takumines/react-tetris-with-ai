import { GameState, Position, Tetromino } from '../types/tetris';
import { TETROMINOES } from '../constants/tetromino';

/**
 * 衝突判定を行う
 * @param board ゲームボード
 * @param piece テトロミノの種類
 * @param rotation 現在の回転状態
 * @param position 位置
 * @returns 衝突する場合はtrue
 */
export const checkCollision = (
  board: number[][],
  piece: Tetromino,
  rotation: number,
  position: Position
): boolean => {
  const shape = TETROMINOES[piece][rotation];

  for (let y = 0; y < shape.length; y++) {
    for (let x = 0; x < shape[y].length; x++) {
      if (shape[y][x]) {
        const newX = position.x + x;
        const newY = position.y + y;

        if (
          newX < 0 ||
          newX >= board[0].length ||
          newY < 0 ||
          newY >= board.length ||
          (newY >= 0 && board[newY][newX])
        ) {
          return true;
        }
      }
    }
  }
  return false;
};

/**
 * テトロミノをボードに固定する
 * @param state 現在のゲーム状態
 */
export const lockPiece = (state: GameState): void => {
  const shape = TETROMINOES[state.currentPiece][state.currentRotation];

  for (let y = 0; y < shape.length; y++) {
    for (let x = 0; x < shape[y].length; x++) {
      if (shape[y][x]) {
        const boardY = state.position.y + y;
        const boardX = state.position.x + x;
        if (boardY >= 0 && boardY < state.board.length) {
          state.board[boardY][boardX] = 1;
        }
      }
    }
  }
};
