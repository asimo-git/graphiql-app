import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import Header from '../../app/components/header/Header';
import '@testing-library/jest-dom';

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
      const buttonElement = screen.getByRole('link', { name: /sign in/i });
      expect(buttonElement).toHaveTextContent('Sign in');
      expect(buttonElement).toHaveAttribute('href', 'https://rs.school/');
    });
  });
});
