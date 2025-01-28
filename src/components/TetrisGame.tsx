import React, { useState } from 'react';
import {
  initializeGame,
  movePiece,
  rotatePiece,
  dropPiece,
  checkForCompleteLines,
  GameState,
} from '../core/tetrisLogic';
import TetrisBoard from './TetrisBoard';

const TetrisGame: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>(initializeGame());

  const handleKeyPress = (event: React.KeyboardEvent) => {
    let newState = gameState;
    switch (event.key) {
      case 'ArrowLeft':
        newState = movePiece(gameState, 'left');
        break;
      case 'ArrowRight':
        newState = movePiece(gameState, 'right');
        break;
      case 'ArrowDown':
        newState = movePiece(gameState, 'down');
        break;
      case ' ':
        newState = dropPiece(gameState);
        break;
      case 'ArrowUp':
        newState = rotatePiece(gameState);
        break;
      default:
        break;
    }
    newState = checkForCompleteLines(newState);
    setGameState(newState);
  };

  return (
    <div className="tetris-game" tabIndex={0} onKeyDown={handleKeyPress}>
      <TetrisBoard gameState={gameState} />
      <div className="score">Score: {gameState.score}</div>
      <div className="level">Level: {gameState.level}</div>
      {gameState.gameOver && <div className="game-over">Game Over</div>}
    </div>
  );
};

export default TetrisGame;
