const Category = require("../models/Category");


exports.createCategory = async (req, res) => {
    try {
        const { name, description } = req.body;

        if (!name || !description) {
            return res.status(400).json({ message: "Please fill all the fields" });
        }

        const categoryDetails = await Category.create({
            name,
            description,
        })

        console.log(categoryDetails);
        res.status(201).json({ 
            success: true, 
            message: "Category created successfully",
            categoryDetails
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

exports.showAllCategories = async (req, res) => {
    try {
        const allTags = await Category.find({}, { name: true, description: true });
        res.status(200).json({ success: true, message: 'All Categories fetched Successfully', allTags });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

exports.categoryPageDetails = async (req, res) => {
    try {
        const { categoryId } = req.body;
        const selectedCategory = await Category.findById(categoryId)
            .populate("courses").exec();

        if (!selectedCategory) {
            return res.status(404).json({
                success: false, message: "Category not found"
            })
        }
        const differentCategories = await Category.find({
            _id: { $ne: categoryId }
        })
            .populate("courses")
            .exec();

        return res.status(200).json({
            success: true,
            message: 'Category details returned Successfully',
            data: {
                selectedCategory,
                differentCategories,
            },
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}