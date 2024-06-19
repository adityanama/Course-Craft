const User = require("../models/User");
const OTP = require("../models/Otp");
const otpGenerator = require("otp-generator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Profile = require("../models/Profile");
require("dotenv").config();
const {passwordUpdated} = require("../mail/templates/passwordUpdate");
const mailSender = require("../utils/mailSender");


exports.sendOTP = async (req, res) => {
    try {
        const email = req.body.email;

        const checkUserPresent = await User.findOne({ email });

        if (checkUserPresent)
            return res.status(400).json({
                success: false,
                message: "User already Registered",
            })

        var otp = otpGenerator.generate(6, {
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false,
        })

        console.log(otp);

        const result = await OTP.findOne({ otp: otp });
        while (result) {
            otp = otpGenerator.generate(6, {
                upperCaseAlphabets: false,
                lowerCaseAlphabets: false,
                specialChars: false,
            });
            result = await otp.findOne({ otp })
        }

        const otpPayload = { email, otp };
        const otpBody = await OTP.create(otpPayload);
        console.log(otpBody);

        res.status(200).json({
            success: true,
            message: "OTP sent Successfully",
            otp,
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
};


exports.SignUp = async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            contactNumber,
            accountType,
            otp,
        } = req.body;

        if (!firstName || !lastName || !email || !password || !confirmPassword || !otp) {
            return res.status(403).json({
                success: false,
                message: "Please fill all the fields",
            })
        }

        if (password != confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "Password and Confirm Password do not match",
            })
        }

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "Email already exists",
            })
        }

        const response = await OTP.find({ email }).sort({ createdAt: -1 }).limit(1);

        console.log(response);
        console.log(otp);

        if (response.length == 0) {
            return res.status(400).json({
                success: false,
                message: "OTP Not Found",
            })
        }
        else if (otp !== response[0].otp) {
            return res.status(400).json({
                success: false,
                message: "Invalid OTP"
            })
        }

        const profileDetails = await Profile.create({
            gender: null,
            dateOfBirth: null,
            about: null,
            contactNumber: null,
        })

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            firstName,
            lastName,
            email,
            contactNumber,
            password: hashedPassword,
            accountType,
            additionalDetails: profileDetails._id,
            image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName[0]}${lastName[0]}`,

        })

        return res.status(200).json({
            success: true,
            message: "User created successfully",
            user,
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        })
    }
}


exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(403).json({
                success: false,
                message: "Please enter email and password",
            })
        }

        const user = await User.findOne({ email }).populate("additionalDetails");

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            })
        }

        if (await bcrypt.compare(password, user.password)) {
            const payload = {
                email: user.email,
                id: user._id,
                accountType: user.accountType,
            }
            const token = jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn: "2h",
            })

            user.token = token;
            user.password = undefined;

            const options = {
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly: true,
            }

            res.cookie("token", token, options).status(200).json({
                success: true,
                message: "User logged in successfully",
                user,
                token,
            })
        }
        else {
            return res.status(401).json({
                success: false,
                message: "Invalid password",
            })
        }


    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Server error",
        })
    }
}

exports.changePassword = async (req, res) => {
    try {

        const userDetails = await User.findById(req.user.id)
        const { oldPassword, newPassword } = req.body

        console.log(oldPassword, " ----- ", newPassword, " -- ", userDetails.password);

        const isPasswordMatch = await bcrypt.compare(
            oldPassword,
            userDetails.password
        )

        console.log(isPasswordMatch);
        if (!isPasswordMatch) {
            return res
                .status(401)
                .json({ success: false, message: "The password is incorrect" })
        }

        const encryptedPassword = await bcrypt.hash(newPassword, 10)
        const updatedUserDetails = await User.findByIdAndUpdate(
            req.user.id,
            { password: encryptedPassword },
            { new: true }
        )

        try {
            const emailResponse = await mailSender(
                updatedUserDetails.email,
                "Password for your account has been updated",
                passwordUpdated(
                    updatedUserDetails.email,
                    `Password updated successfully for ${updatedUserDetails.firstName} ${updatedUserDetails.lastName}`
                )
            )
            console.log("Email sent successfully:", emailResponse.response)
        } catch (error) {
            console.error("Error occurred while sending email:", error)
            return res.status(500).json({
                success: false,
                message: "Error occurred while sending email",
                error: error.message,
            })
        }

        return res
            .status(200)
            .json({ success: true, message: "Password updated successfully" })

    } catch (error) {

        console.error("Error occurred while updating password:", error)
        return res.status(500).json({
            success: false,
            message: "Error occurred while updating password",
            error: error.message,
        })
    }
}