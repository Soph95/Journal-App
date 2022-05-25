const app = require("./app");
const { sequelize, User } = require("./db");

const { Pool } = require("pg");
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

app.listen(process.env.PORT || 4000, () =>
  console.log("Server started successfully")
);
