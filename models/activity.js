const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Schedule = require("./schedule");

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
      model: Schedule,
      key: "id",
    },
  },
});

Schedule.hasMany(Activity);
Activity.belongsTo(Schedule);

module.exports = Activity;
