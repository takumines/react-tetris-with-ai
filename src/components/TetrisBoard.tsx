import React from 'react';
import { GameState } from '../core/tetrisLogic';

interface TetrisBoardProps {
  gameState: GameState;
}

const TetrisBoard: React.FC<TetrisBoardProps> = ({ gameState }) => {
  return (
    <div className="tetris-board">
      {gameState.board.map((row, rowIndex) => (
        <div key={rowIndex} className="tetris-row">
          {row.map((cell, cellIndex) => (
            <div
              key={cellIndex}
              className={`tetris-cell ${cell ? 'filled' : ''}`}
            ></div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default TetrisBoard;
