const express = require('express');
const morgan = require('morgan')

const app = express();

app.use(express.json());
app.use(morgan('dev'));

let notes = [];

app.post('/create', (req, res) => {
    notes.push(req.body);
    res.status(201).json({
        message : "Note Created"
    });
});

app.get('/read', (req, res) => {
    res.status(200).json({
        notes
    });
});

app.patch('/updateP/:index', (req, res) => {
    const { age } = req.body;
    notes[req.params.index].age = age;
    res.status(200).json({
        notes
    });
});

app.delete('/del/:index', (req, res) => {
    delete notes[req.params.index];
    res.status(204).json({
        message: "deleted successfully"
    });
});

module.exports = app;