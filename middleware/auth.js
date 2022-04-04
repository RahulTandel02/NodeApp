const jwt = require("jsonwebtoken");
const userSchema = require("../models/user");

exports.protect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    res.status(401).json({
      success: false,
      message: "Unauthorized access",
    });
    return;
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userSchema.findById(decoded.id);
    if (!user) {
      res.status(404).json({
        success: false,
        message: "not Authorized",
      });
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      error: error,
    });
  }
};
