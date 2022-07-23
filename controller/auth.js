exports.protect = (req, res, next) => {
  if (!req.user)
    res.status(401).json({
      status: "failed",
      message: "unauthorized user!",
    });

  next();
};
