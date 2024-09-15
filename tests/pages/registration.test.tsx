import { useAuthenticated } from '@/app/utils/Auth';
import { render, screen } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import AuthenticationPage from '@/app/registration/page';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

jest.mock('../../app/utils/Auth', () => ({
  useAuthenticated: jest.fn(),
}));

jest.mock('@/app/components/authentication-form/AuthenticationForm', () => {
  const MockAuthenticationForm = () => <div>AuthenticationForm</div>;
  MockAuthenticationForm.displayName = 'MockAuthenticationForm';
  return MockAuthenticationForm;
});

describe('AuthenticationPage', () => {
  it('renders the authentication form when no user is authenticated and is loading', () => {
    (useAuthenticated as jest.Mock).mockImplementation(() => ({
      user: null,
      isLoading: true,
    }));
    const mockRouter = {
      push: jest.fn(),
    };
    (useRouter as jest.Mock).mockImplementation(() => mockRouter);

    render(<AuthenticationPage />);

    expect(screen.getByText('Sign Up')).toBeInTheDocument();
    expect(screen.getByText('AuthenticationForm')).toBeInTheDocument();
    expect(mockRouter.push).not.toHaveBeenCalled();
  });
});
