interface PasswordStrengthProps {
  password: string;
}

const passwordLengthCheck = ({ password }: PasswordStrengthProps) => {
  const isPasswordLength = password.length >= 8;

  return isPasswordLength;
};

const passwordComplexityCheck = ({ password }: PasswordStrengthProps) => {
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumeral = /\d/.test(password);
  const isPasswordHasUppercaseLowercaseNumeral = hasUppercase && hasLowercase && hasNumeral;

  return isPasswordHasUppercaseLowercaseNumeral;
};

export { passwordLengthCheck, passwordComplexityCheck };
