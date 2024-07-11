const Profile = require("../models/Profile");
const Course = require("../models/Course")
const CourseProgress = require("../models/CourseProgress")
const User = require("../models/User");
const { uploadImageToCloudinary } = require("../utils/imageUploader");
const { convertSecondsToDuration } = require("../utils/secToDuration")

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
        if (userDetails.image.includes('dicebear'))
            userDetails.image = `https://api.dicebear.com/5.x/initials/svg?seed=${firstName[0]}${lastName[0]}`

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
        const id = req.user.id

        const user = await User.findById({ _id: id })
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            })
        }

        await Profile.findByIdAndDelete({
            _id: new mongoose.Types.ObjectId(user.additionalDetails),
        })

        for (const courseId of user.courses) {
            await Course.findByIdAndUpdate(
                courseId,
                { $pull: { studentsEnrolled: id } },
                { new: true }
            )
        }

        await User.findByIdAndDelete({ _id: id })
        res.status(200).json({
            success: true,
            message: "User deleted successfully",
        })
        await CourseProgress.deleteMany({ userId: id })

    } catch (error) {
        console.log(error)
        res
            .status(500)
            .json({ success: false, message: "User Cannot be deleted successfully" })
    }
}

exports.getAllUserDetails = async (req, res) => {
    try {
        const id = req.user.id;

        const userDetails = await User.findById(id).populate("additionalDetails").exec();

        return res.status(200).json({
            success: true,
            message: "User Data fetched Successfully",
            userDetails,
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

exports.getEnrolledCourses = async (req, res) => {
    try {
        const userId = req.user.id
        let userDetails = await User.findOne({
            _id: userId,
        })
            .populate({
                path: "courses",
                populate: {
                    path: "courseContent",
                    populate: {
                        path: "subSection",
                    },
                },
            })
            .exec()
        userDetails = userDetails.toObject()
        var SubsectionLength = 0
        for (var i = 0; i < userDetails.courses.length; i++) {
            let totalDurationInSeconds = 0
            SubsectionLength = 0
            for (var j = 0; j < userDetails.courses[i].courseContent.length; j++) {
                totalDurationInSeconds += userDetails.courses[i].courseContent[
                    j
                ].subSection.reduce((acc, curr) => acc + parseInt(curr.timeDuration), 0)
                userDetails.courses[i].totalDuration = convertSecondsToDuration(
                    totalDurationInSeconds
                )
                SubsectionLength +=
                    userDetails.courses[i].courseContent[j].subSection.length
            }
            let courseProgressCount = await CourseProgress.findOne({
                courseID: userDetails.courses[i]._id,
                userId: userId,
            })
            courseProgressCount = courseProgressCount?.completedVideos.length
            if (SubsectionLength === 0) {
                userDetails.courses[i].progressPercentage = 100
            } else {
                // To make it up to 2 decimal point
                const multiplier = Math.pow(10, 2)
                userDetails.courses[i].progressPercentage =
                    Math.round(
                        (courseProgressCount / SubsectionLength) * 100 * multiplier
                    ) / multiplier
            }
        }

        if (!userDetails) {
            return res.status(400).json({
                success: false,
                message: `Could not find user with id: ${userDetails}`,
            })
        }
        return res.status(200).json({
            success: true,
            data: userDetails.courses,
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        })
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

        const updatedProfile = await User.findByIdAndUpdate(userId, { image: image.secure_url }, { new: true }).populate("additionalDetails");

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

exports.instructorDashboard = async (req, res) => {
    try {
        const courseDetails = await Course.find({ instructor: req.user.id })

        const courseData = courseDetails.map((course) => {
            const totalStudentsEnrolled = course.studentsEnrolled.length
            const totalAmountGenerated = totalStudentsEnrolled * course.price

            const courseDataWithStats = {
                _id: course._id,
                courseName: course.courseName,
                courseDescription: course.courseDescription,
                totalStudentsEnrolled,
                totalAmountGenerated,
            }

            return courseDataWithStats
        })

        res.status(200).json({ success: true, courses: courseData })
    } catch (error) {
        console.error(error)
        res.status(500).json({ success: false, message: "Server Error" })
    }
}
