import userModel from "../schemas/userSchema.js";
export const adminMiddleware = async (req, res, next) => {
  if (req.user.admin === true) {
    next();
  } else {
    res.status(403).json({ message: "Admin only" });
  }
};
