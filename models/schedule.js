const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Schedule = sequelize.define("Schedule", {
  name: {
    type: DataTypes.STRING,
    unique: true,
  },
  image_url: DataTypes.STRING,
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: "Users",
      key: "id",
    },
  },
});

module.exports = Schedule;
