const Admin = require("../models/Admin");
const jwt = require("jsonwebtoken");

// Register Admin
const registerAdmin = async (req, res) => {
  try {
    const admin = new Admin(req.body);

    await admin.save();

    res.status(201).json({
      message: "Admin Registered Successfully",
      admin,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

// Login Admin
const loginAdmin = async (req, res) => {

  try {

    const { email, password } = req.body;

    console.log("Admin Login Email:", email);

    const admin = await Admin.findOne({ email });

    console.log("Admin Found:", admin);

    if (!admin) {
      return res.status(404).json({
        message: "Admin Not Found",
      });
    }

    if (admin.password !== password) {
      return res.status(400).json({
        message: "Invalid Password",
      });
    }

    // Generate JWT Token
    const token = jwt.sign(
      {
        id: admin._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.status(200).json({
      message: "Admin Login Successful",
      token,
      admin,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};

module.exports = {
  registerAdmin,
  loginAdmin,
};