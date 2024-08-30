export const encodeBase64 = () => {
  try {
    const encoded = btoa(inputText); // Encode to Base64
    setEncodedText(encoded);
  } catch (error) {
    console.error('Error encoding:', error);
  }
};

export const decodeBase64 = () => {
  return '';
};
