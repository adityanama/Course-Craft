const Profile = require("../models/Profile");
const User = require("../models/User");
const { uploadImageToCloudinary } = require("../utils/imageUploader");

exports.updateProfile = async (req, res) => {
    try {
        const { dateOfBirth = "", about = "", contactNumber, gender, firstName, lastName } = req.body;
        const id = req.user.id;

        if (!contactNumber || !gender || !id || !firstName || !lastName) {
            return res.status(400).json({ message: "Please fill all the fields" });
        }

        const userDetails = await User.findById(id);
        const profileId = userDetails.additionalDetails;

        const profileDetails = await Profile.findById(profileId);

        profileDetails.dateOfBirth = dateOfBirth;
        profileDetails.about = about;
        profileDetails.gender = gender;
        profileDetails.contactNumber = contactNumber;
        await profileDetails.save();

        userDetails.firstName = firstName;
        userDetails.lastName = lastName;
        await userDetails.save();

        const updatedUserDetails = await User.findById(id).populate("additionalDetails");
        console.log(updatedUserDetails);

        return res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            updatedUserDetails,
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}


exports.deleteAccount = async (req, res) => {
    try {
        const id = req.user.id;

        const userDetails = await User.findByIdAndDelete(id);

        if (!userDetails) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json({
            message: "Account deleted successfully",
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}


exports.getAllUserDetails = async (req, res) => {
    try {
        const id = req.user.id;

        const userDetails = await User.findById(id).populate("additionalDetails").exec();

        return res.status(200).json({
            message: "User Data fetched Successfully",
            userDetails,
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

exports.getEnrolledCourses = async (req, res) => {
    try {
        const userId = req.user.id;
        const userDetails = await User.findById(userId).populate("courses").exec(); 4

        if (!userDetails) {
            return res.status(400).json({
                success: false,
                message: `Could not find user with id: ${userDetails}`,
            })
        }

        return res.status(200).json({
            message: "Enrolled Courses fetched Successfully",
            data: userDetails.courses,
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

exports.updateDisplayPicture = async (req, res) => {
    try {
        const displayPicture = req.files.displayPicture;
        const userId = req.user.id;

        const image = await uploadImageToCloudinary(
            displayPicture,
            process.env.FOLDER_NAME,
            1000,
            1000,
        )

        console.log(image);

        const updatedProfile = await User.findByIdAndUpdate(userId, { image: image.secure_url }, { new: true });

        return res.status(200).json({
            success: true,
            message: "Profile Picture updated Successfully",
            data: updatedProfile,
        })

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}