const Requester = require("../models/Requester");
const bcrypt = require("bcrypt");

const authController = {};

authController.login = async (req, res, next) => {
  try {
    // Login Process
    // 1. Get the email and password from body
    const { email, password } = req.body;

    // 2. Check that email is exist in database and verified
    let requester = await Requester.findOne({ email: email }, "+password");
    if (!requester) {
      throw new Error("This email is not exist");
    }

    // 3. Check the password is match
    const isMatch = await bcrypt.compare(password, requester.password);
    if (!isMatch) {
      throw new Error("Wrong Password");
    }

    // 4. Generate token
    const accessToken = await requester.generateToken();

    // 5. Response
    res.status(200).json({
      success: true,
      data: { requester, accessToken },
      message: "Login successful",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

module.exports = authController;
