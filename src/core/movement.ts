import { cloneDeep } from 'lodash';
import { GameState, MoveDirection } from '../types/tetris';
import { checkCollision, lockPiece } from './collision';
import { getRandomTetromino } from './utils';

/**
 * 指定された方向にテトロミノを移動する
 * @param state 現在のゲーム状態
 * @param direction 移動方向
 * @returns 更新されたゲーム状態
 */
export const movePiece = (
  state: GameState,
  direction: MoveDirection
): GameState => {
  const newState = cloneDeep(state);
  const newPosition = { ...newState.position };

  switch (direction) {
    case 'left':
      newPosition.x -= 1;
      break;
    case 'right':
      newPosition.x += 1;
      break;
    case 'down':
      newPosition.y += 1;
      break;
  }

  if (
    !checkCollision(
      newState.board,
      newState.currentPiece,
      newState.currentRotation,
      newPosition
    )
  ) {
    newState.position = newPosition;
  } else if (direction === 'down') {
    lockPiece(newState);
    newState.currentPiece = getRandomTetromino();
    newState.currentRotation = 0;
    newState.position = { x: 4, y: 0 };

    if (
      checkCollision(
        newState.board,
        newState.currentPiece,
        newState.currentRotation,
        newState.position
      )
    ) {
      newState.gameOver = true;
    }
  }

  return newState;
};

/**
 * テトロミノを回転させる
 * @param state 現在のゲーム状態
 * @returns 更新されたゲーム状態
 */
export const rotatePiece = (state: GameState): GameState => {
  const newState = cloneDeep(state);
  const newRotation = (newState.currentRotation + 1) % 4;

  if (
    !checkCollision(
      newState.board,
      newState.currentPiece,
      newRotation,
      newState.position
    )
  ) {
    newState.currentRotation = newRotation;
  }

  return newState;
};

/**
 * テトロミノを一番下まで落とす
 * @param state 現在のゲーム状態
 * @returns 更新されたゲーム状態
 */
export const dropPiece = (state: GameState): GameState => {
  const newState = cloneDeep(state);
  const finalPosition = { ...newState.position };
  let moved = false;

  while (
    !checkCollision(
      newState.board,
      newState.currentPiece,
      newState.currentRotation,
      { x: finalPosition.x, y: finalPosition.y + 1 }
    )
  ) {
    finalPosition.y += 1;
    moved = true;
  }

  newState.position = finalPosition;

  if (moved) {
    lockPiece(newState);
    const originalPiece = newState.currentPiece;
    newState.currentPiece = getRandomTetromino();
    while (newState.currentPiece === originalPiece) {
      newState.currentPiece = getRandomTetromino();
    }
    newState.currentRotation = 0;
    newState.position = { x: 4, y: 0 };

    if (
      checkCollision(
        newState.board,
        newState.currentPiece,
        newState.currentRotation,
        newState.position
      )
    ) {
      newState.gameOver = true;
    }
  }

  return newState;
};
