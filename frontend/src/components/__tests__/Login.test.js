import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Login from '../../Login';

const mockUsers = [
  { id: 1, username: 'user1', password: 'pass1', email: 'user1@example.com' },
  { id: 2, username: 'user2', password: 'pass2', email: 'user2@example.com' }
];

test('renders login form elements', () => {
  render(<Login users={mockUsers} onLogin={jest.fn()} onUserRegister={jest.fn()} />);
  expect(screen.getByLabelText(/Username/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
  expect(screen.getByText(/Login/i)).toBeInTheDocument();
});

test('login success with valid credentials', () => {
  const onLoginMock = jest.fn();
  render(<Login users={mockUsers} onLogin={onLoginMock} onUserRegister={jest.fn()} />);
  fireEvent.change(screen.getByLabelText(/Username/i), { target: { value: 'user1' } });
  fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'pass1' } });
  fireEvent.click(screen.getByText(/Login/i));
  expect(onLoginMock).toHaveBeenCalledWith(mockUsers[0]);
});

test('login failure with invalid credentials', () => {
  render(<Login users={mockUsers} onLogin={jest.fn()} onUserRegister={jest.fn()} />);
  fireEvent.change(screen.getByLabelText(/Username/i), { target: { value: 'userX' } });
  fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'wrong' } });
  fireEvent.click(screen.getByText(/Login/i));
  expect(screen.getByText(/Invalid credentials/i)).toBeInTheDocument();
});
