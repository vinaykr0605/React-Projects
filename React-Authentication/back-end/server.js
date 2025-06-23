const express = require('express');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid')
const { db, saveDb } = require('./db')
const jwt = require('jsonwebtoken')

const app = express();
app.use(express.json());

// Endpoints go here
app.post('/api/sign-up', async (req, res) => {
    const { email, password } = req.body;

    const matching_user = db.users.find(user => user.email === email);

    // Make sure there is no user with the email already in the db
    if (matching_user) {
        return res.sendStatus(409);
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const id = uuidv4();

    const startingInfo = {
        hairColor: '',
        faviouriteFood: '',
        bio: ''
    }

    db.users.push({
        email,
        passwordHash,
        info: startingInfo,
        isVerified: false
    })
    saveDb();

    jwt.sign({
        id,
        email,
        info: startingInfo,
        isVerified: false
    }, process.env.JWT_SECRET, {
        expiresIn: '2d',
    },
        (err, token) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.json({ token })
        })
})

app.listen(3000, () => console.log('Server running on port 3000'));