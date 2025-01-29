import { describe, it, expect, beforeEach } from 'vitest';
import {
  initializeGame,
  movePiece,
  rotatePiece,
  dropPiece,
  checkForCompleteLines,
  GameState,
  TETROMINOES,
  Tetromino,
} from '../src/core/tetrisLogic';

describe('Tetris Logic', () => {
  let initialState: GameState;

  beforeEach(() => {
    initialState = initializeGame();
  });

  it('should initialize the game state correctly', () => {
    expect(initialState.board).toHaveLength(20);
    expect(initialState.board[0]).toHaveLength(10);
    expect(['I', 'O', 'T', 'S', 'Z', 'J', 'L']).toContain(
      initialState.currentPiece
    );
    expect(initialState.position).toEqual({ x: 4, y: 0 });
    expect(initialState.score).toBe(0);
    expect(initialState.level).toBe(1);
    expect(initialState.gameOver).toBe(false);
  });

  describe('movePiece', () => {
    it('should move piece left', () => {
      const state = movePiece(initialState, 'left');
      expect(state.position.x).toBe(3);
      expect(state.position.y).toBe(0);
    });

    it('should move piece right', () => {
      const state = movePiece(initialState, 'right');
      expect(state.position.x).toBe(5);
      expect(state.position.y).toBe(0);
    });

    it('should move piece down', () => {
      const state = movePiece(initialState, 'down');
      expect(state.position.x).toBe(4);
      expect(state.position.y).toBe(1);
    });

    it('should not move piece outside left boundary', () => {
      let state = initialState;
      state.position.x = 0;
      state = movePiece(state, 'left');
      expect(state.position.x).toBe(0);
    });

    it('should not move piece outside right boundary', () => {
      let state = initialState;
      state.position.x = 9;
      state = movePiece(state, 'right');
      expect(state.position.x).toBe(9);
    });
  });

  describe('rotatePiece', () => {
    it('should rotate piece clockwise', () => {
      let state = initialState;
      state.currentPiece = 'T';
      state.currentRotation = 0;
      state = rotatePiece(state);
      expect(state.currentRotation).toBe(1);
    });

    it('should wrap rotation back to 0 after 4 rotations', () => {
      let state = initialState;
      state.currentPiece = 'T';
      state.currentRotation = 3;
      state = rotatePiece(state);
      expect(state.currentRotation).toBe(0);
    });

    it('should not rotate if it would cause collision', () => {
      let state = initialState;
      state.currentPiece = 'I';
      state.position = { x: 9, y: 0 };
      state.currentRotation = 0;
      state = rotatePiece(state);
      expect(state.currentRotation).toBe(0);
    });
  });

  describe('dropPiece', () => {
    it('should drop piece to bottom', () => {
      let state = initialState;
      // ボードを空にして、ピースが最下部まで落下できるようにする
      state.board = Array.from({ length: 20 }, () => Array(10).fill(0));
      state.currentPiece = 'I';
      state.currentRotation = 0;
      state.position = { x: 4, y: 0 };

      const originalPiece = state.currentPiece;
      state = dropPiece(state);

      // ボードに固定されたピースがあることを確認
      const hasLockedPiece = state.board.some((row) =>
        row.some((cell) => cell === 1)
      );
      expect(hasLockedPiece).toBe(true);

      // 新しいピースが生成されたことを確認
      expect(state.currentPiece).not.toBe(originalPiece);
      expect(state.position).toEqual({ x: 4, y: 0 });
    });

    it('should lock piece at bottom', () => {
      let state = initialState;
      state = dropPiece(state);
      expect(state.board.some((row) => row.some((cell) => cell === 1))).toBe(
        true
      );
    });

    it('should generate new piece after dropping', () => {
      let state = initialState;
      const originalPiece = state.currentPiece;
      state = dropPiece(state);
      expect(state.currentPiece).not.toBe(originalPiece);
      expect(state.position).toEqual({ x: 4, y: 0 });
    });
  });

  describe('checkForCompleteLines', () => {
    it('should clear complete lines', () => {
      let state = initialState;
      state.board[19] = Array(10).fill(1);
      state = checkForCompleteLines(state);
      expect(state.board[19].every((cell) => cell === 0)).toBe(true);
    });

    it('should update score when clearing lines', () => {
      let state = initialState;
      state.board[19] = Array(10).fill(1);
      state = checkForCompleteLines(state);
      expect(state.score).toBe(100);
    });

    it('should update level when reaching score threshold', () => {
      let state = initialState;
      state.score = 990;
      state.board[19] = Array(10).fill(1);
      state = checkForCompleteLines(state);
      expect(state.level).toBe(2);
    });
  });

  describe('TETROMINOES', () => {
    it('should have correct shapes for all pieces', () => {
      const pieces: Tetromino[] = ['I', 'O', 'T', 'S', 'Z', 'J', 'L'];
      pieces.forEach((piece) => {
        expect(TETROMINOES[piece]).toHaveLength(4);
        TETROMINOES[piece].forEach((rotation) => {
          expect(Array.isArray(rotation)).toBe(true);
          rotation.forEach((row) => {
            expect(Array.isArray(row)).toBe(true);
            row.forEach((cell) => {
              expect(typeof cell).toBe('number');
              expect(cell).toBeLessThanOrEqual(1);
              expect(cell).toBeGreaterThanOrEqual(0);
            });
          });
        });
      });
    });
  });
});
