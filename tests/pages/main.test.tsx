import React from 'react';
import { render, screen } from '@testing-library/react';
import { useAuthenticated } from '@/app/utils/Auth';
import Welcome from '@/app/page';

jest.mock('@/app/components/main/MainHome', () => {
  const MockMainHome = () => <div>MainHome</div>;
  MockMainHome.displayName = 'MockMainHome';
  return MockMainHome;
});

jest.mock('@/app/components/main/MainWelcome', () => {
  const MockMainWelcome = () => <div>MainWelcome</div>;
  MockMainWelcome.displayName = 'MockMainWelcome';
  return MockMainWelcome;
});

jest.mock('@/app/utils/Auth', () => ({
  useAuthenticated: jest.fn(),
}));

describe('Welcome Component', () => {
  it('renders MainHome when user is authenticated and loading is true', () => {
    (useAuthenticated as jest.Mock).mockImplementation(() => ({
      user: { name: 'John Doe' },
      isLoading: true,
    }));
    render(<Welcome />);
    expect(screen.getByText('MainHome')).toBeInTheDocument();
    expect(screen.queryByText('MainWelcome')).not.toBeInTheDocument();
  });

  it('renders MainWelcome when user is not authenticated and loading is true', () => {
    (useAuthenticated as jest.Mock).mockImplementation(() => ({
      user: null,
      isLoading: true,
    }));
    render(<Welcome />);
    expect(screen.getByText('MainWelcome')).toBeInTheDocument();
    expect(screen.queryByText('MainHome')).not.toBeInTheDocument();
  });

  it('renders an empty main when isLoading is false', () => {
    (useAuthenticated as jest.Mock).mockImplementation(() => ({
      user: null,
      isLoading: false,
    }));
    render(<Welcome />);
    const mainElement = screen.getByRole('main');
    expect(mainElement).toBeInTheDocument();
    expect(mainElement).toBeEmptyDOMElement();
    expect(screen.queryByText('MainHome')).not.toBeInTheDocument();
    expect(screen.queryByText('MainWelcome')).not.toBeInTheDocument();
  });
});
