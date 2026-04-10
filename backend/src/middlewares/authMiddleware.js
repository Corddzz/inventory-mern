import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) return res.status(401).json({ error: "No token provided" });

  try {

    const decoded = jwt.verify(token, process.env.JWT_TOKEN_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ error: "Invalid or token expired." });
  }
};

export const verifyRole = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.roles))
      return res.status(403).json({ error: "Access denied." });
    next();
  };
};