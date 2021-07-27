const { Sequelize, DataTypes, Model } = require("sequelize");
const path = require("path");

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: path.join(__dirname, "db.sqlite"),
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

sequelize.sync();

JournalEntry.belongsTo(User);
User.hasMany(JournalEntry);

module.exports = { User, JournalEntry };
