const app = require("./app");
const request = require("supertest");
const bcrypt = require("bcrypt");
const { sequelize, User, JournalEntry } = require("./db");
const { generateAccessToken } = require("./auth");
const jwt = require("jsonwebtoken");

const seedData = {
  username: "John",
  password: "password123",
};

const passwordHash = bcrypt.hashSync(seedData.password, 10);

describe("journal tests", () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
    await User.create({
      username: seedData.username,
      passwordHash: passwordHash,
    });
    await JournalEntry.create({
      title: "Test title",
      content: "Test content",
      UserId: 1,
    });
  });
  test("should create user", async () => {
    const username = "Charlie";
    const password = "password1234";
    const response = await request(app)
      .post("/users")
      .send({ username, password });
    expect(response.status).toBe(201);
    const userRecord = await User.findOne({
      where: {
        username,
      },
    });
    expect(userRecord).toBeTruthy();
    const passwordIsCorrect = await bcrypt.compare(
      password,
      userRecord.passwordHash
    );
    expect(passwordIsCorrect).toBe(true);
  });
  test("should not be able to create user if user already exists", async () => {
    const username = "John";
    const password = "password123";
    const response = await request(app)
      .post("/users")
      .send({ username, password });
    expect(response.status).toBe(403);
  });

  test("should get user", async () => {
    const response = await request(app).get("/users/1");
    expect(response.status).toBe(200);
    expect(response.body.username).toEqual("John");
    expect(response.body.id).toEqual(1);
    expect(response.body.passwordHash).toEqual(passwordHash);
  });
  test("should be able to login given correct credentials", async () => {
    const username = "John";
    const password = "password123";
    const response = await request(app)
      .post("/login")
      .send({ username, password });
    expect(response.status).toBe(200);
  });
  test("should not be able to login with incorrect username", async () => {
    const username = "Joh";
    const password = "password123";
    const response = await request(app)
      .post("/login")
      .send({ username, password });
    expect(response.status).toBe(404);
  });
  test("should not be able to login with incorrect password", async () => {
    const username = "John";
    const password = "password";
    const response = await request(app)
      .post("/login")
      .send({ username, password });
    expect(response.status).toBe(403);
  });
  test("should be able to get entry", async () => {
    const response = await request(app).get("/users/1/entries");
    expect(response.status).toBe(200);
    expect(response.body[0].content).toEqual("Test content");
  });
  test("should be able to create an entry", async () => {
    const jwt = await generateAccessToken(1);
    const response = await request(app)
      .post("/users/1/entries")
      .send({ title: "Test", content: "blah" })
      .set("Authorization", "Bearer " + jwt);
    expect(response.status).toBe(201);
    const newEntry = await JournalEntry.findOne({
      where: {
        content: "blah",
      },
    });
    expect(newEntry).toBeTruthy();
  });
  test("should not be able to create an entry with incorrect auth code", async () => {
    const jwt = await generateAccessToken(3);
    const response = await request(app)
      .post("/users/1/entries")
      .send({ content: "blah" })
      .set("Authorization", "Bearer " + jwt);
    expect(response.status).toBe(403);
    const newEntry = await JournalEntry.findOne({
      where: {
        content: "blah",
      },
    });
    expect(newEntry).toBe(null);
  });
  test("should not be able to create an entry without auth code", async () => {
    const response = await request(app)
      .post("/users/1/entries")
      .send({ content: "blah" });
    expect(response.status).toBe(401);
    const newEntry = await JournalEntry.findOne({
      where: {
        content: "blah",
      },
    });
    expect(newEntry).toBe(null);
  });
  test("should be able to delete entries", async () => {
    const response = await request(app).delete("/users/1/entries");
    expect(response.status).toBe(200);
    const deletedEntry = await JournalEntry.findOne({
      where: {
        content: "Test content",
      },
    });
    expect(deletedEntry).toBe(null);
  });
  test("should be able to delete user and their entries", async () => {
    const response = await request(app).delete("/users/1");
    expect(response.status).toBe(200);
    const deletedEntry = await JournalEntry.findOne({
      where: {
        content: "Test content",
      },
    });
    expect(deletedEntry).toBe(null);
    const deletedUser = await User.findOne({
      where: {
        username: "John",
      },
    });
    expect(deletedUser).toBe(null);
  });
  test("should be able to update entry", async () => {
    const update = { content: "This is updated content" };
    const response = await request(app)
      .patch("/users/1/entries/1")
      .send(update);
    expect(response.status).toBe(200);
    const updatedContent = await JournalEntry.findOne({
      where: {
        content: update.content,
      },
    });
    expect(updatedContent).toBeTruthy();
  });
  test("should be able to update user", async () => {
    const update = { username: "Jonathan" };
    const response = await request(app).patch("/users/1").send(update);
    expect(response.status).toBe(200);
    const updatedUsername = await User.findOne({
      where: {
        username: update.username,
      },
    });
    expect(updatedUsername).toBeTruthy();
  });
});
