export const getPasswordStrengthPercentage = (password: string) => {
  let strength = 0;
  if (password.length >= 8) strength += 25;
  if (/[a-zA-Z]/.test(password)) strength += 25;
  if (/\d/.test(password)) strength += 25;
  if (/[^a-zA-Z0-9\s]/.test(password)) strength += 25;
  return strength;
};
