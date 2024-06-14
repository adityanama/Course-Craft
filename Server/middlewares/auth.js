const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.auth = async (req, res, next) => {
    try {
        const token = req.cookies.token || req.body.token || req.header("Authorisation").replace("Bearer", "");

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Token is Missing",
            })
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            console.log(decoded);
            req.user = decoded;
        }
        catch (error) {
            return res.status(401).json({
                success: false,
                message: "Invalid Token",
            })
        }

        next();

    } catch (error) {
        return res.status(401).json({
            success: false,
            message: error.message,
        })
    }
}

exports.isStudent = async (req, res, next) => {
    try {
        if (req.user.accountType != "Student") {
            return res.status(403).json({
                success: false,
                message: "You are not authorized to access this route",
            })
        }
        next();

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

exports.isInstructor = async (req, res, next) => {
    try {
        if (req.user.accountType != "Instructor") {
            return res.status(403).json({
                success: false,
                message: "You are not authorized to access this route",
            })
        }
        next();

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

exports.isAdmin = async (req, res, next) => {
    try {
        if (req.user.accountType != "Admin") {
            return res.status(403).json({
                success: false,
                message: "You are not authorized to access this route",
            })
        }
        next();

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

