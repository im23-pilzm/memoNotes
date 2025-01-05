const express = require('express');
const { Note } = require('../memoNotesModels');
const router = express.Router();

router.get('/:user_id', async (req, res) => {
    const { user_id } = req.params;
    try {
        const notes = await Note.findAll({ where: { user_id } });
        res.json(notes);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/', async (req, res) => {
    const { user_id, note_title, note_content } = req.body;
    try {
        const note = await Note.create({ user_id, note_title, note_content });
        res.status(201).json(note);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
