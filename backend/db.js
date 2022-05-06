const { Sequelize, DataTypes, Model } = require("sequelize");
const path = require("path");

const location =
  process.env.NODE_ENV === "test"
    ? ":memory:"
    : path.join(__dirname, "db.sqlite");

let settings = {
  dialect: "sqlite",
  storage: location,
  logging: process.env.NODE_ENV !== "test",
};

let sequelize;

if (process.env.NODE_ENV === "production") {
  settings.dialect = "postgres";
  settings.ssl = true;
  settings.dialectOptions = {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  };
  sequelize = new Sequelize(process.env.DATABASE_URL, settings);
} else {
  sequelize = new Sequelize(settings);
}

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
