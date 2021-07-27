const express = require("express");
const bcrypt = require("bcrypt");
const { User, JournalEntry } = require("./db");
const { generateAccessToken } = require("./auth");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const app = express();
app.use(express.json());

app.post("/users", async (req, res) => {
  const { username, password } = req.body;
  const passwordHash = await bcrypt.hash(password, 10);
  User.create({ username, passwordHash });
  res.sendStatus(201);
});

//GET users

//delete users
app.delete("/users/:id", async (req, res) => {
  const user = await User.findByPk(req.params.id);
  await user.destroy();
  res.sendStatus(200);
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const userRecord = await User.findOne({
    where: {
      username,
    },
  });

  if (!userRecord) {
    return res.sendStatus(404);
  }
  const passwordIsCorrect = await bcrypt.compare(
    password,
    userRecord.passwordHash
  );

  if (passwordIsCorrect) {
    const token = await generateAccessToken(userRecord.id);
    res.send(token);
  } else {
    return res.sendStatus(403);
  }
});

function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, token) => {
      if (err) {
        return res.sendStatus(403);
      }
      req.userId = token.userId;
      next();
    });
  } else {
    res.sendStatus(401);
  }
}

app.post("/users/:userId/entries", verifyToken, async (req, res) => {
  const userId = req.userId;
  if (userId != req.params.userId) {
    return res.sendStatus(403);
  }
  const UserId = req.params.userId;
  await JournalEntry.create({
    content: req.body.content,
    UserId,
  });
  res.sendStatus(201);
});

//update - patch

// GET entries
app.get("users/:userId/entries", async (req, res) => {
  const UserId = req.params.userId;
  console.log(UserId);
  const entries = await JournalEntry.findAll({
    where: {
      UserId: UserId,
    },
  });
  console.log(entries);
  res.sendStatus(200);
  //   const entries = await JournalEntry.findByFk(req.params.userId);
  //get all entries with user id 3
});

module.exports = app;

// {
//     "content" : "tesing123"
// }

// {
//     "username" : "Charlie",
//     "password": "great-password"
// }
