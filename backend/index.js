const app = require("./app");
const { sequelize, User } = require("./db");

const port = process.env.PORT || 4000;
app.listen(port, () => console.log("listening on", port));
