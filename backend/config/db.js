const { connect } = require('mongoose');

const connectDB = async () => {
    if (!process.env.DB_URI) {
        throw new Error("There is no DB_URI in the env file.");
    };
    try {
        await connect(process.env.DB_URI);
        console.log("Database Connected...");
    } catch (err) {
        console.log(err.message);
    };
}

module.exports = connectDB;