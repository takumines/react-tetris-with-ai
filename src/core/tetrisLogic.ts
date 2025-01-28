export type Tetromino = 'I' | 'O' | 'T' | 'S' | 'Z' | 'J' | 'L';

export interface GameState {
  board: number[][];
  currentPiece: Tetromino;
  position: { x: number; y: number };
  score: number;
  level: number;
  gameOver: boolean;
}

export const getRandomTetromino = (): Tetromino => {
  const tetrominos: Tetromino[] = ['I', 'O', 'T', 'S', 'Z', 'J', 'L'];
  const randomIndex = Math.floor(Math.random() * tetrominos.length);
  return tetrominos[randomIndex];
};

export const initializeGame = (): GameState => ({
  board: Array.from({ length: 20 }, () => Array(10).fill(0)),
  currentPiece: getRandomTetromino(),
  position: { x: 4, y: 0 },
  score: 0,
  level: 1,
  gameOver: false,
});

export const movePiece = (
  state: GameState,
  direction: 'left' | 'right' | 'down'
): GameState => {
  const newPosition = { ...state.position };
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
  // 衝突をチェックし、有効な場合は位置を更新
  if (!checkCollision(state.board, newPosition)) {
    state.position = newPosition;
  }
  return state;
};

const checkCollision = (
  board: number[][],
  position: { x: number; y: number }
): boolean => {
  // 位置が範囲外か既存のピースと衝突しているかを確認
  if (
    position.x < 0 ||
    position.x >= board[0].length ||
    position.y < 0 ||
    position.y >= board.length ||
    board[position.y][position.x] !== 0
  ) {
    return true;
  }
  return false;
};

export const rotatePiece = (state: GameState): GameState => {
  // ピースを回転させるロジックを実装
  return state;
};

export const dropPiece = (state: GameState): GameState => {
  const newState = { ...state };
  while (
    !checkCollision(newState.board, {
      x: newState.position.x,
      y: newState.position.y + 1,
    })
  ) {
    newState.position.y += 1;
  }
  // ピースをその場に固定
  lockPiece(newState);
  // Generate a new piece
  newState.currentPiece = getRandomTetromino();
  newState.position = { x: 4, y: 0 };
  return newState;
};

const lockPiece = (state: GameState) => {
  // 現在のピースをボードに固定
  const { board, position, currentPiece } = state;
  // ピースを固定するための例のロジック（簡略化）
  // '1'が固定されたピースを表すと仮定
  // 通常、currentPieceの形状をボードにマッピングします
  // 簡単のため、現在の位置のみをマークします
  board[position.y][position.x] = 1;
  // Additional logic to handle full lines or other game state updates can be added here
};

export const checkForCompleteLines = (state: GameState): GameState => {
  // Implement logic to check for complete lines and update score
  return state;
};
