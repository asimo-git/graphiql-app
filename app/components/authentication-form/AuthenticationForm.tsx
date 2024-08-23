'use client';
import { ReactElement, useState } from 'react';
import { useForm } from 'react-hook-form';
import { getPasswordStrengthPercentage } from '../../utils/helpers';
import './AuthenticationForm.scss';
import {
  Alert,
  Button,
  IconButton,
  InputAdornment,
  LinearProgress,
  TextField,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { handleAuthentication } from '../../services/firebase';
import { FirebaseError } from 'firebase/app';
// import { useRouter } from 'next/navigation';

type FormValues = {
  email: string;
  password: string;
};

export default function AuthenticationForm(): ReactElement {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormValues>({
    mode: 'onChange',
  });

  // const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPasswordStrength(getPasswordStrengthPercentage(newPassword));
  };

  const onSubmit = async (data: FormValues) => {
    try {
      setIsLoading(true);
      await handleAuthentication(data.email, data.password);
      setError(null);
      console.log('success');
      // при успешном сабмите перенаправление на рест-страницу
      // router.push('/rest')
    } catch (err) {
      if (err instanceof FirebaseError) {
        setError(err.message);
      } else {
        console.error('An error occurred during submission:', err);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <form
        className="authentication-container"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="field-container">
          <TextField
            id="email"
            label="Email"
            variant="outlined"
            fullWidth
            error={!!errors.email}
            helperText={errors.email ? errors.email.message : ''}
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Invalid email address',
              },
            })}
          />
        </div>

        <div></div>

        <div className="field-container">
          <TextField
            id="password"
            label="Password"
            type={showPassword ? 'text' : 'password'}
            variant="outlined"
            fullWidth
            error={!!errors.password}
            helperText={errors.password ? errors.password.message : ''}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword((prevState) => !prevState)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            {...register('password', {
              required: 'Password is required',
              minLength: {
                value: 8,
                message: 'Password must be at least 8 characters long',
              },
              pattern: {
                value:
                  /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[\p{S}\p{P}\p{M}\p{Sk}\p{Sc}]).{8,}$/u,
                message:
                  'Password must contain at least one letter, one digit, and one special character',
              },
              onChange: handlePasswordChange,
            })}
          />
          {isLoading ? (
            <LinearProgress className="password-strength-container" />
          ) : (
            <div className="password-strength-container">
              <div
                className="password-strength-bar"
                style={{
                  width: `${passwordStrength}%`,
                  backgroundColor:
                    passwordStrength < 26
                      ? 'red'
                      : passwordStrength < 51
                        ? 'orange'
                        : passwordStrength < 76
                          ? 'yellow'
                          : 'green',
                }}
              />
            </div>
          )}
        </div>

        <Button
          variant="contained"
          type="submit"
          className="submit-button"
          disabled={!isValid || isLoading}
        >
          Submit
        </Button>
      </form>
      {error && (
        <Alert
          severity="error"
          onClose={() => {
            setError(null);
          }}
        >
          {error}
        </Alert>
      )}
    </>
  );
}
