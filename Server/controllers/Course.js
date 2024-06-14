const Course = require("../models/Course");
const User = require("../models/User");
const Category = require("../models/Category");
const { uploadImageToCloudinary } = require("../utils/imageUploader");
require("dotenv").config();


exports.createCourse = async (req, res) => {
    try {
        const { courseName, courseDescription, tag , whatYouWillLearn, price, category } = req.body;
        const instructor = req.user.id;
        const thumbnail = req.files.thumbnailImage;

        if (!courseName || !courseDescription || !instructor || !whatYouWillLearn || !price || !category) {
            return res.status(400).json({ message: "Please fill all the fields" });
        }

        const userId = req.user.id;
        const instructorDetails = await User.findById(userId);
        console.log(instructorDetails);

        if (!instructorDetails) {
            return res.status(404).json({ message: "Instructor not found" });
        }

        const categoryDetails = await Category.findById(category);
        if (!categoryDetails ) {
            return res.status(404).json({ message: "Category not found" });
        }

        const thumbnailImage = await uploadImageToCloudinary(thumbnail, process.env.FOLDER_NAME);

        const newCourse = await Course.create({
            courseName,
            courseDescription,
            instructor: instructorDetails._id,
            whatYouWillLearn,
            price,
            tag,
            category: categoryDetails._id,
            thumbnail: thumbnailImage.secure_url,
        })

        await User.findByIdAndUpdate(
            { _id: instructorDetails._id },
            {
                $push: {
                    courses: newCourse._id
                }
            },
            { new: true },
        )

        await Category.findByIdAndUpdate(
            { _id: instructorDetails._id },
            {
                $push: {
                    courses: newCourse._id
                }
            },
            { new: true },
        )

        return res.status(200).json({
            message: "Course created successfully",
            data: newCourse,
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}


exports.getAllCourses = async (req, res) => {
    try {
        const allCourses = await Course.find({}, {
            courseName: true,
            price: true,
            thumbnail: true,
            instructor: true,
            ratingAndReviews: true,
            studentsEnrolled: true,
        })
            .populate("instructor")
            .exec();

        return res.status(200).json({
            success: true,
            message: "All courses fetched successfully",
            data: allCourses,
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}


exports.getCourseDetails = async (req, res) => {
    try {
        const { courseId } = req.body;
        const courseDetails = await Course.findById(courseId)
            .populate(
                {
                    path: "instructor",
                    populate: {
                        path: "additionalDetails",
                    }
                }
            )
            .populate("category")
            // .populate("ratingAndReviews")
            .populate(
                {
                    path: "courseContent",
                    populate: {
                        path: "subSection",
                    }
                }
            )
            .exec();

        if (!courseDetails) {
            return res.status(400).json({ message: "Course not found" });
        }

        return res.status(200).json({
            success: true,
            message: 'Course details fetched successfully',
            data: courseDetails,
        })

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}