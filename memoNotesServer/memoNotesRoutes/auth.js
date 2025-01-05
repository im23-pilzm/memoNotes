const express = require("express");
const bcrypt = require("bcrypt");
const { User } = require("../memoNotesModels");
const router = express.Router();
const jwt = require('jsonwebtoken');
require("dotenv").config();

router.post("/register", async (req, res) => {
    const { email, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ email, password: hashedPassword });
        res.status(201).json(user);
    } catch (err) {
        res.status(500).json({ error: "Error registerring user" });
    }
});

router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ where: {email} })
        if (user && await bcrypt.compare(password, user.password)) {
            const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" });
            res.json({token})
        } else {
            res.status(401).json({ error: 'Invalid credentials' });
        }
    } catch (err) {
        res.status(500).json({ error: "Error logging in" });
    }
});

module.exports = router;
