const express = require("express");
const router = express.Router();

const { login, SignUp, sendOTP, changePassword } = require("../controllers/auth");
const { resetPasswordToken, resetPassword } = require("../controllers/ResetPassword");
const { auth } = require("../middlewares/auth");

router.post("/login", login);
router.post("/signup", SignUp);
router.post("/sendotp", sendOTP);
router.post("/changepassword", auth, changePassword);
router.post("/reset-password-token", resetPasswordToken);
router.post("/reset-password", resetPassword);

module.exports = router;