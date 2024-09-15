import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import Header from '../../app/components/header/Header';
import '@testing-library/jest-dom';
import { logout } from '../../app/services/firebase';

jest.mock('../../app/services/firebase', () => ({
  logout: jest.fn(),
  auth: {},
}));

jest.mock('firebase/auth', () => ({
  onAuthStateChanged: jest.fn((auth, callback) => {
    const mockUser = { uid: '12345', email: 'test@example.com' };
    callback(mockUser);
  }),
}));

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

jest.mock('../../app/utils/Auth', () => ({
  useAuthenticated: () => ({
    user: { uid: '12345', email: 'test@example.com' },
    isLoading: true,
  }),
}));

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (str: string) => str,
    i18n: {
      changeLanguage: jest.fn(),
    },
  }),
  initReactI18next: {
    type: '3rdParty',
    init: jest.fn(),
  },
}));

describe('Header component', () => {
  beforeEach(async () => {
    render(<Header />);
    await waitFor(() => expect(screen.getByRole('banner')).toBeInTheDocument());
  });

  it('should render the header when loading is true', () => {
    expect(screen.getByRole('banner')).toBeInTheDocument();
  });

  it('should toggle language from EN to RU and back on switch toggle', () => {
    const switchElement = screen.getByRole('checkbox', { name: /controlled/i });
    expect(switchElement).toBeChecked();
    fireEvent.click(switchElement);
    expect(screen.getByText('RU')).toBeInTheDocument();
    expect(switchElement).not.toBeChecked();
    fireEvent.click(switchElement);
    expect(screen.getByText('EN')).toBeInTheDocument();
    expect(switchElement).toBeChecked();
  });

  it('should handle sign-in or sign-out based on user authentication', () => {
    const buttonElement = screen.getByRole('button', { name: /Sign out/i });
    expect(buttonElement).toBeInTheDocument();
    fireEvent.click(buttonElement);
    expect(logout).toHaveBeenCalled();
  });
});
