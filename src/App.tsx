import { useState } from 'react';
import React from 'react';
import './App.css';
import TetrisGame from './components/TetrisGame';

function App() {
  const [gameStarted, setGameStarted] = useState(false);

  return (
    <div className="App">
      {gameStarted ? (
        <TetrisGame />
      ) : (
        <header className="App-header">
          <img src={`/logo192.png`} className="App-logo" alt="logo" />
          <button onClick={() => setGameStarted(true)} className="start-button">
            Start Game
          </button>
        </header>
      )}
    </div>
  );
}

export default App;
