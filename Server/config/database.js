const mongoose = require("mongoose");
require("dotenv").config();

exports.dbConnect = () => {
    mongoose.connect(process.env.MONGODB_URL)
    .then(() => console.log("Database Connected Successfully"))
    .catch((error) => {
        console.log("Database Connection failed");
        console.error(error);
        process.exit(1);
    })
};