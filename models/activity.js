const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Schedule = require("./schedule");

const Activity = sequelize.define("Activity", {
  name: DataTypes.STRING,
  start_date: DataTypes.DATE,
  end_date: DataTypes.DATE,
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
