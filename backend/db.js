const { Sequelize, DataTypes, Model } = require("sequelize");
const path = require("path");

const location =
  process.env.NODE_ENV === "test"
    ? ":memory:"
    : path.join(__dirname, "db.sqlite");

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: location,
  logging: process.env.NODE_ENV !== "test",
});

class User extends Model {}

User.init(
  {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    passwordHash: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "User",
  }
);

class JournalEntry extends Model {}

JournalEntry.init(
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "JournalEntry",
  }
);

JournalEntry.belongsTo(User);
User.hasMany(JournalEntry, {
  as: "entries",
  foreignKey: "UserId",
  onDelete: "cascade",
});

sequelize.sync();

module.exports = { sequelize, User, JournalEntry };
