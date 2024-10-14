const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Activity = sequelize.define("Activity", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  start_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  end_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  scheduleId: {
    type: DataTypes.INTEGER,
    references: {
      model: "Schedules",
      key: "id",
    },
  },
});

module.exports = Activity;
