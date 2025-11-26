import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../../App';

test('renders Beauty Beats brand link', () => {
  render(<App />);
  const linkElement = screen.getByText(/Beauty Beats/i);
  expect(linkElement).toBeInTheDocument();
});
