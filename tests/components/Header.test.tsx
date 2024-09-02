import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import Header from '../../app/components/header/Header';
import '@testing-library/jest-dom';

jest.mock('../../app/services/firebase', () => ({
  getAuth: jest.fn(),
}));
jest.mock('firebase/auth', () => ({
  onAuthStateChanged: jest.fn((auth, callback) => {
    const mockUser = { uid: '12345', email: 'test@example.com' };
    setTimeout(() => callback(mockUser), 0);
  }),
}));

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

jest.mock('react-i18next', () => ({
  useTranslation: () => {
    return {
      t: (str: string) => str,
      i18n: {
        changeLanguage: () => new Promise(() => {}),
      },
    };
  },
  initReactI18next: {
    type: '3rdParty',
    init: jest.fn(),
  },
}));

describe('Header', () => {
  beforeEach(() => {
    render(<Header />);
  });

  it('should render the header', () => {
    const headerElement = screen.getByRole('banner');
    expect(headerElement).toBeInTheDocument();
  });
  it('should render with RU/EN', () => {
    expect(screen.getByText('EN')).toBeInTheDocument();
    const switchElement = screen.getByRole('checkbox', {
      name: /controlled/i,
    });
    expect(switchElement).toBeChecked();
    fireEvent.click(switchElement);
    expect(screen.getByText('RU')).toBeInTheDocument();
    expect(switchElement).not.toBeChecked();
    fireEvent.click(switchElement);
    expect(screen.getByText('EN')).toBeInTheDocument();
    expect(switchElement).toBeChecked();
  });
  describe('SignIn', () => {
    it('should render button', () => {
      const buttonElement = screen.getByRole('button');
      expect(buttonElement).toHaveTextContent('Sign in');
    });
  });
});
