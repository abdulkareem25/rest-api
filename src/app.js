const express = require('express');
const morgan = require('morgan')
const Notes = require('../models/note.model');

const app = express();

app.use(express.json());
app.use(morgan('dev'));

app.post('/create', async (req, res) => {
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

app.get('/read', async (req, res) => {
    const notes = await Notes.find();
    res.status(200).json({
        notes
    });
});

app.patch('/updateP/:index', async (req, res) => {
    const { desc } = req.body;
    let note = await Notes.findByIdAndUpdate(
        req.params.index,
        { desc },
        { new: true }
    );
    res.status(200).json({
        note
    });
});

app.delete('/del/:index', async (req, res) => {
    await Notes.findByIdAndDelete(req.params.index);
    res.status(204).json({
        message: "deleted successfully"
    });
});

module.exports = app;