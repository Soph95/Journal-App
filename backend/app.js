const express = require("express");
const bcrypt = require("bcrypt");
const { User, JournalEntry } = require("./db");
const { generateAccessToken } = require("./auth");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const app = express();
app.use(express.json());

//Create user - signup
app.post("/users", async (req, res) => {
  const { username, password } = req.body;
  const checkDuplicateUser = await User.findOne({
    where: {
      username,
    },
  });
  if (checkDuplicateUser) {
    return res.sendStatus(403);
  }
  const passwordHash = await bcrypt.hash(password, 10);
  const user = await User.create({ username, passwordHash });
  const jwt = await generateAccessToken(user.id);
  res.status(201).json({ jwt, userId: user.id });
});

//GET specific user
app.get("/users/:userId", async (req, res) => {
  const userId = req.params.userId;
  const user = await User.findOne({
    where: {
      id: userId,
    },
  });
  res.send(user);
});

//GET all users
app.get("/users", async (req, res) => {
  const users = await User.findAll();
  res.send(users);
});

//login
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
    const jwt = await generateAccessToken(userRecord.id);
    res.status(200).json({ jwt, userId: userRecord.id });
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

//Create an entry
app.post("/users/:userId/entries", verifyToken, async (req, res) => {
  const userId = req.userId;
  if (userId != req.params.userId) {
    return res.sendStatus(403);
  }
  const UserId = req.params.userId;
  const newEntry = await JournalEntry.create({
    title: req.body.title,
    content: req.body.content,
    UserId,
  });
  res.sendStatus(201);
});

//update user
app.patch("/users/:userId", async (req, res) => {
  const userId = req.params.userId;
  const [updated] = await User.update(
    {
      username: req.body.username,
    },
    {
      where: {
        id: userId,
      },
    }
  );
  updated ? res.sendStatus(200) : res.sendStatus(404);
});

// GET entries for specific user
app.get("/users/:userId/entries", async (req, res) => {
  const UserId = req.params.userId;
  const entries = await JournalEntry.findAll({
    where: {
      UserId,
    },
  });
  res.send(entries);
});

// GET specific entry
app.get("/users/:userId/entries/:entryId", async (req, res) => {
  const UserId = req.params.userId;
  const entryId = req.params.entryId;
  const entry = await JournalEntry.findAll({
    where: {
      UserId,
      id: entryId,
    },
  });
  res.send(entry);
});

//Delete Entries for specific user
app.delete("/users/:userId/entries", async (req, res) => {
  const UserId = req.params.userId;
  const entries = await JournalEntry.findAll({
    where: {
      UserId,
    },
  });
  await Promise.all(entries.map((entry) => entry.destroy()));
  res.sendStatus(200);
});

//Delete user and their entries
app.delete("/users/:userId", async (req, res) => {
  const user = await User.findByPk(req.params.userId);
  const UserId = req.params.userId;
  await JournalEntry.destroy({
    where: {
      UserId,
    },
  });
  await user.destroy();
  res.sendStatus(200);
});

//Delete specific entry
app.delete("/users/:userId/entries/:entryId", async (req, res) => {
  const UserId = req.params.userId;
  const entryId = req.params.entryId;
  await JournalEntry.destroy({
    where: {
      UserId,
      id: entryId,
    },
  });
  res.sendStatus(200);
});

//Update specific entry
app.patch("/users/:userId/entries/:entryId", async (req, res) => {
  const entryId = req.params.entryId;
  const [updated] = await JournalEntry.update(
    {
      title: req.body.title,
      content: req.body.content,
    },
    {
      where: {
        id: entryId,
      },
    }
  );
  updated ? res.sendStatus(200) : res.sendStatus(404);
});

module.exports = app;
