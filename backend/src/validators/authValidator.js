export const validateSignup = (email, password) => {
  if (!email || !password) return "Email and password are required!";

  if (password.length < 8) return "Password must be at least 8 characters.";

  return null;
};

export const validateLogin = (email, password) => {
  if (!email || !password) return "Email and password are required.";

  return null;
};