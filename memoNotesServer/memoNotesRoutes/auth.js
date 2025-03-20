const express = require("express");
const bcrypt = require("bcrypt");
const {User} = require("../memoNotesModels");
const router = express.Router();
const jwt = require('jsonwebtoken');
const authMiddleware = require("../memoNotesMiddleware/authMiddleware")
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//Neuen User registrieren

router.post("/register", async (req, res) => {
    const {email, password, password_confirmation} = req.body;
    console.log("Received data:", {email, password, password_confirmation});

    if (!email || !password || !password_confirmation) {
        return res.status(400).json({error: "All fields are required"});
    }
    if (password !== password_confirmation) {
        return res.status(400).json({error: "Passwords do not match"});
    }
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({email, password: hashedPassword});
        res.status(201).json(user);
    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({error: "Error registering user", details: error.message});
    }
});

//Login eines bestehenden Users und erstellen von Tokens

router.post('/login', async (req, res) => {
    const {email, password} = req.body;
    console.log(email, password)
    try {
        const user = await User.findOne({where: {email}});
        if (!user) {
            return res.status(400).json({error: 'Invalid email or password'});
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({error: 'Invalid email or password'});
        }
        const accessToken = jwt.sign(
            {userID: user.user_id},
            process.env.JWT_SECRET,
            {expiresIn: "20m"}
        );
        const refreshToken = jwt.sign(
            {userID: user.user_id},
            process.env.JWT_REFRESH,
            {expiresIn: "7d"}
        );

        res.cookie('authorization', `${accessToken}`, { httpOnly: true, secure: true });
        res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: true });

        res.status(200).json({
            message: 'Login successful',
            user_id: user.user_id,
            accessToken: accessToken,
            refreshToken: refreshToken
        });
    } catch (err) {
        res.status(500).json({error: err.message});
    }
});

//Router-Handling für den Refresh-Token

router.post("/refresh_token", (req, res) => {
    const {refreshToken} = req.body;

    if (!refreshToken) {
        return res.status(401).json({error: 'Unauthorized'});
    }

    try {
        const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH);

        const newAccessToken = jwt.sign(
            {user_id: decoded.user_id},
            process.env.JWT_SECRET,
            {expiresIn: '15m'}
        );

        res.json({accessToken: newAccessToken});
    } catch (err) {
        res.status(401).json({error: 'Invalid refresh token'});
    }
})

router.get('/user/:user_id/yourNotes', authMiddleware, (req, res) => {
    // Handle the request and respond with the notes
    res.json({message: 'Here are your notes'});
});


module.exports = router;
