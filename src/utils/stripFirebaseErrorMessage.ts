export const stripFirebaseErrorMessage = (message: string) => {
  if (message.startsWith('Firebase: ')) {
    return message.slice(10);
  }
  return message;
};
