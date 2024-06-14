const { instance } = require("../config/razorpay");
const Course = require("../models/Course");
const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const { courseEnrollmentEmail } = require("../mail/templates/courseEnrollmentEmail");
const { default: mongoose } = require("mongoose");


exports.capturePayment = async (req, res) => {
    const { courseId } = req.body;
    const userId = req.user.id;

    if (!courseId) {
        return res.status(400).json({ message: "Course ID is required" });
    }

    let course;
    try {
        course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }

        const uid = new mongoose.Types.ObjectId(userId);
        if (course.studentsEnrolled.includes(uid)) {
            return res.status(200).json({
                message: "You are already enrolled in this course"
            })
        }
    }
    catch (error) {
        return res.status(500).json({ message: "Internal Server Error" });
    }

    const amount = course.price;
    const currency = "INR";

    const options = {
        amount: amount * 100,
        currency,
        receipt: `course-enrollment-${courseId}-${userId}`,
        notes: {
            courseId,
            userId,
        }
    }

    try {
        const paymentResponse = await instance.orders.create(options);
        console.log(paymentResponse);
        return res.status(200).json({
            paymentLink: paymentResponse.paymentLink,
            courseName: course.courseName,
            courseDescription: course.courseDescription,
            thumbnail: course.thumbnail,
            orderId: paymentResponse.id,
            currency: paymentResponse.currency,
            amount: paymentResponse.amount,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Payment failed" });
    }

}

exports.verifySignature = async (req, res) => {
    const webhookSecret = "12345678";
    const signature = req.headers("x-razorpay-signature");

    const shaSum = crypto.createHmac("sha256", webhookSecret);
    shaSum.update(JSON.stringify(req.body));
    const digest = shaSum.digest("hex");

    if (signature == digest) {
        console.log("Payment is Authorised");

        const { CourseId, userId } = req.body.payload.payment.entity.notes;

        try {
            const enrolledCourse = await Course.findOneAndUpdate({ _id: CourseId },
                { $push: { studentsEnrolled: userId } },
                { new: true }
            )
            if (!enrolledCourse) {
                return res.status(500).json({ message: "Course not found" });
            }

            console.log(enrolledCourse);

            const enrolledStudent = await User.findOneAndUpdate({ _id: userId },
                { $push: { courses: CourseId } },
                { new: true }
            );
            if (!enrolledStudent) {
                return res.status(500).json({ message: "User not found" });
            }

            console.log(enrolledStudent);

            const emailResponse = await mailSender(enrolledStudent.email, 
                                                    "congo from coursecrafter", "you are enrolled in course")
            console.log(emailResponse);
            return res.status(200).json({
                message: "Course Added",
            })

        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Course not added" });
        }
    }

    else{
        console.log("Payment is not Authorised");
        return res.status(400).json({ message: "Payment is not Authorised" });
    }
}
