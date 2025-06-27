const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");
const { db, saveDb } = require("./db");
const { sendEmail } = require("./sendEmail");

const app = express();
app.use(express.json());

app.post("/api/sign-up", async (req, res) => {
  const { email, password } = req.body;

  // Make sure there is no user with the email already in the database
  const matching_user = db.users.find((user) => user.email === email);
  if (matching_user) {
    return res.sendStatus(409);
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const id = uuidv4();
  const verificationString = uuidv4();

  const startingInfo = {
    hairColor: "",
    favoriteFood: "",
    bio: "",
  };

  db.users.push({
    id,
    email,
    passwordHash,
    info: startingInfo,
    isVerified: false,
    verificationString
  });
  saveDb();
try {
  await sendEmail({
    to: email,
    from: "vinay.1si19cs135@gmail.com",
    subject: "Please verify your email",
    text: `Thanks for signing in. To verify your email, click here: https://congenial-invention-97wp97rw69vjfxvv-5173.app.github.dev/verify-email/${verificationString}`,
  });
} catch (e) {
  console.error("SendGrid error:", e.response?.body || e.message || e);
  return res.sendStatus(500);
}


  jwt.sign(
    {
      id,
      email,
      info: startingInfo,
      isVerified: false,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "2d",
    },
    (err, token) => {
      if (err) {
        return res.status(500).send(err);
      }

      res.json({ token });
    }
  );
});

app.post("/api/log-in", async (req, res) => {
  const { email, password } = req.body;

  const user = db.users.find((user) => user.email === email);
  if (!user) return res.sendStatus(401);

  const passwordIsCorrect = await bcrypt.compare(password, user.passwordHash);

  if (passwordIsCorrect) {
    const { id, email, info, isVerified } = user;
    jwt.sign(
      {
        id,
        email,
        info,
        isVerified,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "2d",
      },
      (err, token) => {
        if (err) {
          return res.status(500).send(err);
        }

        res.json({ token });
      }
    );
  } else {
    res.sendStatus(401);
  }
});

app.put("/api/users/:userId", async (req, res) => {
  const { authorization } = req.headers;
  const userId = req.params.userId;

  if (!authorization) {
    return res
      .sendStatus(401)
      .json({ message: "No authorization header sent" });
  }

  const user = db.users.find((user) => user.id === userId);
  if (!user) {
    return res.sendStatus(404);
  }

  const token = authorization.split(" ")[1];

  jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid token" });
    }
    const { id } = decoded;

    if (id === userId) {
      const { hairColor, favoriteFood, bio } = req.body;
      const updates = { hairColor, favoriteFood, bio };
      const user = db.users.find((user) => user.id === userId);
      user.info.hairColor = updates.hairColor || user.info.hairColor;
      user.info.favoriteFood = updates.favoriteFood || user.info.favoriteFood;
      user.info.bio = updates.bio || user.info.bio;
      saveDb();
      jwt.sign(
        {
          ...user,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "2d",
        },
        (err, token) => {
          if (err) {
            return res.status(500).send(err);
          }

          res.json({ token });
        }
      );
    } else {
      return res.sendStatus(403);
    }
  });
});

app.put('/api/verify-email', async (req, res) => {
  const { verificationString } = req.body;
  const user = db.users.find(user => user.verificationString === verificationString);

  if (!user) {
    return res.status(401).json({ message: 'The email verification code is incorrect' });
  }

  user.isVerified = true;

  const { id, email, info, isVerified } = user;
  jwt.sign({ id, email, isVerified, info }, process.env.JWT_SECRET, { expiresIn: '2d' }, (err, token) => {
    if (err) {
      return res.status(500).send(err);
    }

    res.json({ token });
  })
})


app.listen(3000, () => console.log("Server running on port 3000"));
