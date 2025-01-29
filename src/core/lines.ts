import { cloneDeep } from 'lodash';
import { GameState } from '../types/tetris';
import { calculateScore, calculateLevel } from './utils';
import { GAME_CONFIG } from '../constants/tetromino';

/**
 * 完成したラインをチェックして消去する
 * @param state 現在のゲーム状態
 * @returns 更新されたゲーム状態
 */
export const checkForCompleteLines = (state: GameState): GameState => {
  const newState = cloneDeep(state);
  let linesCleared = 0;

  for (let y = newState.board.length - 1; y >= 0; y--) {
    if (newState.board[y].every((cell: number) => cell === 1)) {
      // 完成したラインを消去し、上のラインを下に移動
      newState.board.splice(y, 1);
      newState.board.unshift(Array(GAME_CONFIG.BOARD_WIDTH).fill(0));
      linesCleared++;
      y++; // 同じ行を再チェック（上の行が下がってくるため）
    }
  }

  // スコアの更新
  if (linesCleared > 0) {
    newState.score += calculateScore(linesCleared);

    // レベルの更新
    const newLevel = calculateLevel(newState.score);
    if (newLevel > newState.level) {
      newState.level = newLevel;
    }
  }

  return newState;
};
