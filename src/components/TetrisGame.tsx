import React, { useState, useEffect, useCallback } from 'react';
import {
  initializeGame,
  movePiece,
  rotatePiece,
  dropPiece,
  checkForCompleteLines,
  GameState,
} from '../core/tetrisLogic';
import TetrisBoard from './TetrisBoard';
import '../styles/TetrisGame.css';

const TetrisGame: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>(initializeGame());
  const [isPaused, setIsPaused] = useState(false);

  // 落下速度の計算（レベルが上がるごとに速くなる）
  const getDropSpeed = useCallback(() => {
    // レベル1: 1000ms, レベル2: 900ms, ..., レベル10: 100ms
    return Math.max(100, 1000 - (gameState.level - 1) * 100);
  }, [gameState.level]);

  // ゲーム状態の更新
  const updateGameState = useCallback((newState: GameState) => {
    const stateAfterLineCheck = checkForCompleteLines(newState);
    setGameState(stateAfterLineCheck);
  }, []);

  // キー入力のハンドリング
  const handleKeyPress = useCallback(
    (event: KeyboardEvent) => {
      if (gameState.gameOver) return;

      if (event.key === 'p' || event.key === 'P' || event.key === 'Escape') {
        setIsPaused((prev) => !prev);
        return;
      }

      if (isPaused) return;

      let newState = { ...gameState };
      switch (event.key) {
        case 'ArrowLeft':
          event.preventDefault(); // 左キーによるスクロールを防止
          newState = movePiece(newState, 'left');
          break;
        case 'ArrowRight':
          event.preventDefault(); // 右キーによるスクロールを防止
          newState = movePiece(newState, 'right');
          break;
        case 'ArrowDown':
          event.preventDefault(); // 下キーによるスクロールを防止
          newState = movePiece(newState, 'down');
          break;
        case 'ArrowUp':
          event.preventDefault(); // 上キーによるスクロールを防止
          newState = rotatePiece(newState);
          break;
        case ' ':
          event.preventDefault(); // スペースキーによるスクロールを防止
          newState = dropPiece(newState);
          break;
        default:
          return;
      }
      updateGameState(newState);
    },
    [gameState, isPaused, updateGameState]
  );

  // 自動落下の処理
  useEffect(() => {
    if (gameState.gameOver || isPaused) return;

    const dropInterval = setInterval(() => {
      const newState = movePiece(gameState, 'down');
      updateGameState(newState);
    }, getDropSpeed());

    return () => clearInterval(dropInterval);
  }, [gameState, isPaused, getDropSpeed, updateGameState]);

  // キーボードイベントの設定
  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleKeyPress]);

  // ゲームのリセット
  const resetGame = () => {
    setGameState(initializeGame());
    setIsPaused(false);
  };

  return (
    <div className="tetris-game" tabIndex={0}>
      <div className="game-info">
        <div className="score">Score: {gameState.score}</div>
        <div className="level">Level: {gameState.level}</div>
        <div className="controls">
          <p>Controls:</p>
          <ul>
            <li>←/→: Move left/right</li>
            <li>↑: Rotate</li>
            <li>↓: Soft drop</li>
            <li>Space: Hard drop</li>
            <li>P/ESC: Pause</li>
          </ul>
        </div>
      </div>
      <TetrisBoard gameState={gameState} />
      {isPaused && !gameState.gameOver && (
        <div className="overlay">
          <div className="message">Paused</div>
          <button onClick={() => setIsPaused(false)} className="button">
            Resume
          </button>
        </div>
      )}
      {gameState.gameOver && (
        <div className="overlay">
          <div className="message">Game Over</div>
          <div className="final-score">Final Score: {gameState.score}</div>
          <button onClick={resetGame} className="button">
            Try Again
          </button>
        </div>
      )}
    </div>
  );
};

export default TetrisGame;
