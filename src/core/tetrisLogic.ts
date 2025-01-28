export type Tetromino = 'I' | 'O' | 'T' | 'S' | 'Z' | 'J' | 'L';

export interface GameState {
  board: number[][];
  currentPiece: Tetromino;
  position: { x: number; y: number };
  score: number;
  level: number;
  gameOver: boolean;
}

export function initializeGame(): GameState {
  return {
    board: Array.from({ length: 20 }, () => Array(10).fill(0)),
    currentPiece: 'I',
    position: { x: 4, y: 0 },
    score: 0,
    level: 1,
    gameOver: false,
  };
}

export function movePiece(
  state: GameState,
  direction: 'left' | 'right' | 'down'
): GameState {
  // Implement logic to move the piece
  return state;
}

export function rotatePiece(state: GameState): GameState {
  // Implement logic to rotate the piece
  return state;
}

export function dropPiece(state: GameState): GameState {
  // Implement logic to drop the piece
  return state;
}

export function checkForCompleteLines(state: GameState): GameState {
  // Implement logic to check for complete lines and update score
  return state;
}
