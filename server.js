const { connect } = require('mongoose');
const app = require('./src/app.js');

async function connectDB () {
    await connect(process.env.DB_URI);
    console.log("Database Connected...")
};

app.listen(3000, (req, res) => {
    console.log('Server is running on port 3000');
    connectDB();
});