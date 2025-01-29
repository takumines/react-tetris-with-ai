import { Tetromino } from '../types/tetris';
import { GAME_CONFIG } from '../constants/tetromino';

/**
 * ランダムなテトロミノを生成する
 * @returns テトロミノの種類
 */
export const getRandomTetromino = (): Tetromino => {
  const tetrominos: Tetromino[] = ['I', 'O', 'T', 'S', 'Z', 'J', 'L'];
  const randomIndex = Math.floor(Math.random() * tetrominos.length);
  return tetrominos[randomIndex];
};

/**
 * レベルに応じた落下速度を計算する
 * @param level 現在のレベル
 * @returns 落下速度（ミリ秒）
 */
export const calculateDropSpeed = (level: number): number => {
  return Math.max(
    GAME_CONFIG.DROP_SPEEDS.MIN,
    GAME_CONFIG.DROP_SPEEDS.MAX -
      (level - 1) * GAME_CONFIG.DROP_SPEEDS.DECREASE_PER_LEVEL
  );
};

/**
 * スコアを計算する
 * @param linesCleared 消去したライン数
 * @returns スコア
 */
export const calculateScore = (linesCleared: number): number => {
  return GAME_CONFIG.SCORE_MULTIPLIERS[linesCleared] || 0;
};

/**
 * レベルを計算する
 * @param score 現在のスコア
 * @returns レベル
 */
export const calculateLevel = (score: number): number => {
  return Math.floor(score / GAME_CONFIG.LEVEL_UP_SCORE) + 1;
};

/**
 * 新しいゲームボードを作成する
 * @returns 空のゲームボード
 */
export const createEmptyBoard = (): number[][] => {
  return Array.from({ length: GAME_CONFIG.BOARD_HEIGHT }, () =>
    Array(GAME_CONFIG.BOARD_WIDTH).fill(0)
  );
};
