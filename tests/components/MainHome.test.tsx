import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import MainHome from '@/app/components/main/MainHome';
import Routers from '../../app/utils/routes';

jest.mock('@/app/services/firebase', () => ({
  auth: {
    currentUser: {
      displayName: 'John Doe',
    },
  },
}));

jest.mock('@/app/components/info/Info', () => {
  const MockInfo = () => <div>Info Component</div>;
  MockInfo.displayName = 'MockInfo';
  return MockInfo;
});

describe('MainHome Component', () => {
  it('renders welcome message with the user name', () => {
    render(<MainHome />);
    expect(screen.getByText('Welcome, John Doe!')).toBeInTheDocument();
  });

  it('renders links correctly', () => {
    render(<MainHome />);
    expect(screen.getByRole('link', { name: 'REST Client' })).toHaveAttribute(
      'href',
      Routers.RESTfull
    );
    expect(
      screen.getByRole('link', { name: 'GraphiQL Client' })
    ).toHaveAttribute('href', Routers.GraphiQL);
    expect(screen.getByRole('link', { name: 'History' })).toHaveAttribute(
      'href',
      Routers.History
    );
  });

  it('renders the Info component', () => {
    render(<MainHome />);
    expect(screen.getByText('Info Component')).toBeInTheDocument();
  });
});
