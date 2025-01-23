const express = require('express');
const path = require("path")
const { sequelize } = require('./memoNotesModels');
const authRoutes = require('./memoNotesRoutes/auth');
const todoRoutes = require('./memoNotesRoutes/TODOs');
const noteRoutes = require('./memoNotesRoutes/Notes');

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, "public")));

app.use('/auth', authRoutes);
app.use('/todos', todoRoutes);
app.use('/notes', noteRoutes);

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "memoNotes_landingpage.html"));
});

app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'memoNotes_register.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'memoNotes_login.html'));
});

app.get('/yourNotes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'memoNotes_yourNotes.html'));
});

sequelize.sync()
    .then(() => {
        console.log('Database synced');
        app.listen(4000, () => {
            console.log('Server is running on port 4000');
        });
    })
    .catch(err => console.error('Unable to sync database:', err));
