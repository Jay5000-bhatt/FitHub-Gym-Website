import jwt from "jsonwebtoken";

export const AuthTrainer = (req, res, next) => {
  try {
    const token =
      req.headers.TrainerToken ||
      req.headers["trainertoken"] ||
      req.headers["TrainerToken"];

    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "Token Required" });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.body.TrainerId = decoded.TrainerId;
    next();
  } catch (error) {
    console.error("Token verification failed:", error.message);
    return res.status(401).json({ message: "Not authorized, invalid token" });
  }
};
