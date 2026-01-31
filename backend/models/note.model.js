const { Schema, model } = require("mongoose");

const noteSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Notes = model('notes', noteSchema);

module.exports = Notes;