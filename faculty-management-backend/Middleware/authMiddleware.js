import jwt from "jsonwebtoken";

export default authMiddleware = (req, res, next) => {
  const token = res.header("Authorization");
  if (!token) return res.status(401).json({ message: "You are not authorized" });

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded;

    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid Token" });
  }
};
