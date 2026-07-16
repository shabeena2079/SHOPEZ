const Admin = require("../models/Admin");

const adminProtect = async (req, res, next) => {
  try {
    const admin = await Admin.findById(req.user.id);

    if (!admin) {
      return res.status(403).json({
        message: "Access Denied. Admin Only.",
      });
    }

    next();
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = adminProtect;