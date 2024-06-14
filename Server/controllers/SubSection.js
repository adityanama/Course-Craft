const { uploadImageToCloudinary } = require("../utils/imageUploader");
require("dotenv").config();
const SubSection = require("../models/SubSection");
const Section = require("../models/Section");


exports.createSubSection = async (req, res) => {
    try {
        const { sectionId, title, description, timeDuration } = req.body;

        const video = req.files.videoFile;

        if (!sectionId || !title || !description || !timeDuration || !video) {
            return res.status(400).json({ message: "Please fill all the fields" });
        }

        const uploadDetails = await uploadImageToCloudinary(video, process.env.FOLDER_NAME);

        const subSectionDetails = await SubSection.create({
            title,
            timeDuration,
            description,
            videoUrl: uploadDetails.secure_url,
        })

        const updatedSection = await Section.findByIdAndUpdate(sectionId, {
            $push: {
                subSection: subSectionDetails._id,
            }
        }
            , { new: true });

        return res.status(200).json({
            message: "SubSection created successfully",
            updatedSection,
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

exports.updateSubSection = async (req, res) => {
    try {
        const { subSectionId, title, description } = req.body;
        const subSection = await SubSection.findById(subSectionId);

        if (!subSection) {
            return res.status(404).json({ message: "SubSection not found" });
        }

        if (title)
            subSection.title = title;
        if (description)
            subSection.description = description;

        if (req.files && req.files.video) {
            const video = req.files.video;
            const uploadDetails = await uploadImageToCloudinary(video, process.env.FOLDER_NAME);
            subSection.videoUrl = uploadDetails.secure_url
            subSection.timeDuration = `${uploadDetails.duration}`
        }

        await subSection.save();
        return res.status(200).json({
            message: "SubSection updated successfully",
        })

    } catch (error) {
        console.error(error)
        return res.status(500).json({
            success: false,
            message: "An error occurred while updating the section",
        })
    }
}

exports.deleteSubSection = async (req, res) => {
    try {
        const { subSectionId, sectionId } = req.body;

        await Section.findByIdAndUpdate(sectionId, {
            $pull: { subSection: subSectionId }
        })

        const subSection = await SubSection.findByIdAndDelete(subSectionId);

        if (!subSection) {
            return res.status(404).json({ message: "SubSection not found" });
        }

        return res.status(200).json({
            message: "SubSection deleted successfully",
        })

    } catch (error) {
        console.error(error)
        return res.status(500).json({
            success: false,
            message: "An error occurred while deleting the section",
        })
    }
}