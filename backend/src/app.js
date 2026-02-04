const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const Notes = require('../models/note.model');

const app = express();

app.use(express.json());
app.use(morgan('dev'));
app.use(cors());
app.use(express.static("./public"));

app.post('/api/notes', async (req, res) => {
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

app.get('/api/notes', async (req, res) => {
    const notes = await Notes.find();
    res.status(200).json({
        notes
    });
});

app.patch('/api/notes/:index', async (req, res) => {
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

app.delete('/api/notes/:index', async (req, res) => {
    await Notes.findByIdAndDelete(req.params.index);

    res.status(204).json({
        message: "deleted successfully"
    });
});

module.exports = app;