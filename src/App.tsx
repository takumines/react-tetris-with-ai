import React from 'react';
import TetrisGame from './components/TetrisGame';
import './App.css';

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h1>React Tetris</h1>
      </header>
      <main>
        <TetrisGame />
      </main>
    </div>
  );
};

export default App;
