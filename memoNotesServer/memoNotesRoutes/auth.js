const express = require("express");
const bcrypt = require("bcrypt");
const { User } = require("../memoNotesModels");
const router = express.Router();
const jwt = require('jsonwebtoken');
require("dotenv").config();

router.post("/register", async (req, res) => {
    const { email, password, password_confirmation } = req.body;
    console.log("Received data:", { email, password, password_confirmation });

    if (!email || !password || !password_confirmation) {
        return res.status(400).json({ error: "All fields are required" });
    }
    if (password !== password_confirmation) {
        return res.status(400).json({ error: "Passwords do not match" });
    }
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ email, password: hashedPassword });
        res.status(201).json(user);
    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({ error: "Error registering user", details: error.message });
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }
        const token = jwt.sign({ user_id: user.user_id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
