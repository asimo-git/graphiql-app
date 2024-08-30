import { ReactElement } from 'react';

type PasswordStrengthBarProps = {
  passwordStrength: number;
};

export default function PasswordStrengthBar({
  passwordStrength,
}: PasswordStrengthBarProps): ReactElement {
  return (
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
  );
}
