const express = require('express');
const { TODO } = require('../memoNotesModels');
const router = express.Router();

router.post('/', async (req, res) => {
    const { user_id, todo_content } = req.body;
    try {
        const todo = await TODO.create({ user_id, todo_content });
        res.status(201).json(todo);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/:user_id', async (req, res) => {
    const { user_id } = req.params;
    try {
        const todos = await TODO.findAll({ where: { user_id } });
        res.json(todos);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
