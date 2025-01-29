import React from 'react';
import { GameState, TETROMINOES, Tetromino } from '../core/tetrisLogic';

interface TetrisBoardProps {
  gameState: GameState;
}

// テトロミノの色を定義
const TETROMINO_COLORS: Record<Tetromino, string> = {
  I: 'cyan',
  O: 'yellow',
  T: 'purple',
  S: 'green',
  Z: 'red',
  J: 'blue',
  L: 'orange',
};

const TetrisBoard: React.FC<TetrisBoardProps> = ({ gameState }) => {
  // 現在のピースの位置を含むボードの状態を作成
  const getDisplayBoard = () => {
    const displayBoard = gameState.board.map((row) => [...row]);
    const shape =
      TETROMINOES[gameState.currentPiece][gameState.currentRotation];

    // 現在のピースを表示用ボードに追加
    for (let y = 0; y < shape.length; y++) {
      for (let x = 0; x < shape[y].length; x++) {
        if (shape[y][x]) {
          const boardY = gameState.position.y + y;
          const boardX = gameState.position.x + x;

          // ボードの範囲内の場合のみ描画
          if (
            boardY >= 0 &&
            boardY < displayBoard.length &&
            boardX >= 0 &&
            boardX < displayBoard[0].length
          ) {
            // 2は現在落下中のピースを表す
            displayBoard[boardY][boardX] = 2;
          }
        }
      }
    }

    return displayBoard;
  };

  const displayBoard = getDisplayBoard();

  // セルのスタイルを取得
  const getCellStyle = (value: number) => {
    if (value === 0) return {};
    if (value === 1) return { backgroundColor: '#666' }; // 固定されたピース
    return { backgroundColor: TETROMINO_COLORS[gameState.currentPiece] }; // 現在のピース
  };

  return (
    <div className="tetris-board">
      {displayBoard.map((row, rowIndex) => (
        <div key={rowIndex} className="tetris-row">
          {row.map((cell, cellIndex) => (
            <div
              key={cellIndex}
              className={`tetris-cell ${cell ? 'filled' : ''}`}
              style={getCellStyle(cell)}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default TetrisBoard;
