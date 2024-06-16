const { resetPassword } = require("../mail/templates/resetPasswordEmail");
const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const bcrypt = require("bcrypt");


exports.resetPasswordToken = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const token = crypto.randomUUID();
        const updatedDetails = await User.findOneAndUpdate({ email: email },
            {
                token: token,
                resetPasswordExpires: Date.now() + 5 * 60 * 1000,
            },
            { new: true }

        )

        const url = `http://localhost:3000/update-password/${token}`;
        await mailSender(email, "Password Reset Link", resetPassword(updatedDetails.firstName + " " + updatedDetails.lastName, url));

        return res.json({
            success: true,
            message: "Password reset link sent to your email",
            updatedDetails
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

exports.resetPassword = async (req, res) => {
    try {
        const { password, confirmPassword, token } = req.body;
        if (password != confirmPassword) {
            return res.json({
                success: false,
                message: "Password and Confirm Password do not match"
            })
        }

        const userDetails = await User.findOne({ token: token });
        if (!userDetails) {
            return res.json({success:false, message: "Invalid Token" });
        }

        if (userDetails.resetPasswordExpires < Date.now()) {
            return res.json({success:false, message: "Token Expired" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await User.findOneAndUpdate(
            { token: token },
            { password: hashedPassword },
            { new: true }
        );

        return res.status(200).json({
            success: true,
            message: "Password Reset Successfully"
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}