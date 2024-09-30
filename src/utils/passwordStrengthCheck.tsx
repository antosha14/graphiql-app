export const passwordStrengthCheck = (password: string): number | undefined => {
  if (!password) {
    return undefined;
  }
  let strength = 0;
  if (password.length > 7) {
    strength += 1;
  }
  if (password.match(/[A-Z]/)) {
    strength += 1;
  }
  if (password.match(/[0-9]/)) {
    strength += 1;
  }
  if (password.match(/[^A-Za-z0-9]/)) {
    strength += 1;
  }
  return strength;
};
