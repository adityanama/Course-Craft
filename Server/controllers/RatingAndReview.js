const { default: mongoose } = require("mongoose");
const Course = require("../models/Course");
const RatingAndReview = require("../models/RatingAndReview");


exports.createRating = async (req, res) => {
    try {
        const userId = req.user.id;
        const { rating, review, courseId } = req.body;


        console.log(rating,review,courseId)
        const courseDetails = await Course.findOne({
            _id: courseId,
            studentsEnrolled: { $elemMatch: { $eq: userId } }
        });

        if (!courseDetails) {
            return res.status(404).json({success:false, message: "You are not enrolled in this course" })
        }

        const alreadyReviewed = await RatingAndReview.findOne({
            user: userId,
            course: courseId
        })

        if (alreadyReviewed) {
            return res.status(403).json({success:false, message: "You have already reviewed this course" })
        }

        const ratingReview = await RatingAndReview.create({
            user: userId,
            course: courseId,
            rating,
            review
        })

        const updatedCourseDetails = await Course.findByIdAndUpdate(courseId, {
            $push: {
                ratingAndReviews: ratingReview._id
            }
        },
            { new: true }
        )
        console.log(updatedCourseDetails);

        return res.status(200).json({
            success:true,
            message: "Rating and review added successfully",
            ratingReview
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ success:false, message: "Internal Server Error" });
    }
}


exports.getAverageRating = (req, res) => {
    try {
        const { courseId } = req.body;

        const result = RatingAndReview.aggregate([
            {
                $match: {
                    course: new mongoose.Types.ObjectId(courseId),
                }
            },
            {
                $group: {
                    _id: null,
                    averageRating: { $avg: "$rating" },
                }
            }
        ])

        if (result.length) {
            return res.status(200).json({
                message: "Average rating fetched successfully",
                averageRating: result[0].averageRating,
            })
        }

        return res.status(200).json({
            message: "No ratings found for this course",
            averageRating: 0
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}


exports.getAllRating = async (req, res) => {
    try {
        const allReviews = await RatingAndReview.find({}).sort({ rating: "desc" })
            .populate({
                path: "user",
                select: "firstName lastName email image",
            })
            .populate({
                path: "course",
                select: "courseName",
            })
            .exec();

        return res.status(200).json({
            success: true,
            message: "All ratings fetched successfully",
            data: allReviews
        })

    } catch (error) {
        console.error(error);
        return res.status(500).json({success:false, message: "Internal Server Error" });
    }
}