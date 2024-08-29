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
import { auth, registerWithEmailAndPassword } from '../../services/firebase';
import { FirebaseError } from 'firebase/app';
import { useRouter } from 'next/navigation';
import { signInWithEmailAndPassword } from 'firebase/auth';
import PasswordStrengthBar from '../password-strength-bar/PasswordStrengthBar';
import Routes from '@/app/utils/routes';
import { useTranslation } from 'react-i18next';
import { ERROR_MESSAGES } from '@/app/utils/constants';

type FormValues = {
  name?: string;
  email: string;
  password: string;
};

type AuthenticationFormProps = {
  formType: 'auth' | 'reg';
};

export default function AuthenticationForm({
  formType,
}: AuthenticationFormProps): ReactElement {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormValues>({
    mode: 'onChange',
  });

  const { t } = useTranslation();
  const router = useRouter();
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
      if (formType === 'reg') {
        await registerWithEmailAndPassword(
          data.name || 'user',
          data.email,
          data.password
        );
      } else {
        await signInWithEmailAndPassword(auth, data.email, data.password);
      }
      setError(null);
      router.push(Routes.Home);
    } catch (err) {
      if (err instanceof FirebaseError) {
        // TODO - fix a bug
        // there is a problem with authorization(!) error messages.
        // instead of specific errors, the code auth/invalid-credential always comes
        // registration errors are correct
        const message =
          ERROR_MESSAGES[err.code as keyof typeof ERROR_MESSAGES] ||
          ERROR_MESSAGES['default'];
        setError(t(message));
      } else {
        throw err;
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
        {formType === 'reg' && (
          <div className="field-container">
            <TextField
              id="name"
              label={t('Name')}
              variant="outlined"
              fullWidth
              error={!!errors.name}
              helperText={errors.name ? errors.name.message : ''}
              {...register('name', {
                required: t('Name is required'),
              })}
            />
          </div>
        )}

        <div className="field-container">
          <TextField
            id="email"
            label={t('Email')}
            variant="outlined"
            fullWidth
            error={!!errors.email}
            helperText={errors.email ? errors.email.message : ''}
            {...register('email', {
              required: t('Email is required'),
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: t('Invalid email address'),
              },
            })}
          />
        </div>

        <div></div>

        <div className="field-container">
          <TextField
            id="password"
            label={t('Password')}
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
              required: t('Password is required'),
              minLength: {
                value: 8,
                message: t('Password must be at least 8 characters long'),
              },
              pattern: {
                value:
                  /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[\p{S}\p{P}\p{M}\p{Sk}\p{Sc}]).{8,}$/u,
                message: t(
                  'Password must contain at least one letter, one digit, and one special character'
                ),
              },
              onChange: handlePasswordChange,
            })}
          />
          {isLoading ? (
            <LinearProgress className="password-strength-container" />
          ) : (
            formType === 'reg' && (
              <PasswordStrengthBar passwordStrength={passwordStrength} />
            )
          )}
        </div>

        <Button
          variant="contained"
          type="submit"
          className="submit-button"
          disabled={!isValid || isLoading}
        >
          {t('Submit')}
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
