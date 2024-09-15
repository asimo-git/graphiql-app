import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import AuthenticationForm from '../../app/components/authentication-form/AuthenticationForm';
import { registerWithEmailAndPassword } from '@/app/services/firebase';

jest.mock('../../app/services/firebase', () => ({
  registerWithEmailAndPassword: jest.fn(),
}));

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

describe('AuthenticationForm', () => {
  it('should render the form with email and password fields', () => {
    render(<AuthenticationForm formType="auth" />);
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  });

  it('should validate the email and password fields', async () => {
    render(<AuthenticationForm formType="auth" />);
    fireEvent.submit(screen.getByRole('button', { name: /submit/i }));

    expect(await screen.findByText(/email is required/i)).toBeInTheDocument();
    expect(
      await screen.findByText(/password is required/i)
    ).toBeInTheDocument();
  });

  it('should show password strength bar', async () => {
    const { container } = render(<AuthenticationForm formType="reg" />);
    const passwordField = screen.getByLabelText(/password/i);

    const passwordStrengthBar = container.querySelector(
      '.password-strength-bar'
    );

    await act(async () => {
      fireEvent.change(passwordField, { target: { value: 'weak' } });
    });

    await waitFor(() => {
      expect(passwordStrengthBar).toHaveStyle('width: 25%');
    });

    await act(async () => {
      fireEvent.change(passwordField, { target: { value: 'Password!1' } });
    });

    await waitFor(() => {
      expect(passwordStrengthBar).toHaveStyle('width: 100%');
    });
  });

  it('should call registerWithEmailAndPassword on form submission with valid data', async () => {
    render(<AuthenticationForm formType="reg" />);
    (registerWithEmailAndPassword as jest.Mock).mockResolvedValueOnce(
      'success'
    );

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'Password!1' },
    });
    fireEvent.change(screen.getByLabelText(/name/i), {
      target: { value: 'Name' },
    });

    fireEvent.submit(screen.getByRole('button', { name: /submit/i }));

    await waitFor(() =>
      expect(registerWithEmailAndPassword).toHaveBeenCalledWith(
        'Name',
        'test@example.com',
        'Password!1'
      )
    );
  });
});
