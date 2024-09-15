import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { onAuthStateChanged } from 'firebase/auth';
import { useAuthenticated } from '@/app/utils/Auth';

jest.mock('@/app/services/firebase', () => ({
  auth: {},
}));

jest.mock('firebase/auth', () => ({
  onAuthStateChanged: jest.fn(),
}));

const TestComponent = () => {
  const { user, isLoading } = useAuthenticated();
  return (
    <div>
      <div data-testid="user">{user ? user.email : 'No user'}</div>
      <div data-testid="loading">{isLoading ? 'Loading' : 'Not loading'}</div>
    </div>
  );
};

describe('useAuthenticated', () => {
  it('should show user email when authenticated', async () => {
    const user = { uid: '123', email: 'test@example.com' };
    (onAuthStateChanged as jest.Mock).mockImplementation((auth, callback) => {
      callback(user);
      return () => {};
    });

    render(<TestComponent />);
    await waitFor(() => {
      expect(screen.getByTestId('user')).toHaveTextContent('test@example.com');
      expect(screen.getByTestId('loading')).toHaveTextContent('Loading');
    });
  });

  it('should show "No user" when not authenticated', async () => {
    (onAuthStateChanged as jest.Mock).mockImplementation((auth, callback) => {
      callback(null);
      return () => {};
    });

    render(<TestComponent />);
    await waitFor(() => {
      expect(screen.getByTestId('user')).toHaveTextContent('No user');
      expect(screen.getByTestId('loading')).toHaveTextContent('Loading');
    });
  });
});
