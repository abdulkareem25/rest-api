const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const Notes = require('../models/note.model');
const path = require('path');

const app = express();
const publicPath = path.join(__dirname, "..", "public");

app.use(express.json());
app.use(morgan('dev'));
app.use(cors());
app.use(express.static(publicPath));

app.get('/', (req, res) => {
    res.sendFile(path.join(publicPath, "index.html"));
});

app.post('/notes', async (req, res) => {
    const { title, desc } = req.body;

    let note = await Notes.create({
        title,
        desc
    });

    res.status(201).json({
        message: "Note Created",
        note
    });
});

app.get('/notes', async (req, res) => {
    const notes = await Notes.find();
    res.status(200).json({
        notes
    });
});

app.patch('/notes/:index', async (req, res) => {
    const { desc } = req.body;

    let note = await Notes.findByIdAndUpdate(
        req.params.index,
        { desc },
        { new: true }
    );

    res.status(200).json({
        message: "Note Updated",
        note
    });
});

app.delete('/notes/:index', async (req, res) => {
    await Notes.findByIdAndDelete(req.params.index);

    res.status(204).json({
        message: "deleted successfully"
    });
});

module.exports = app;