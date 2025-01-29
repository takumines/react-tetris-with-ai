import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from './App';

describe('App', () => {
  it('renders React Tetris header', () => {
    render(<App />);
    const headerElement = screen.getByText(/React Tetris/i);
    expect(headerElement).toBeInTheDocument();
  });
});
