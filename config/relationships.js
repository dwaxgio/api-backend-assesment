const User = require("../models/user");
const Schedule = require("../models/schedule");
const Activity = require("../models/activity");

// Relations between models
Schedule.hasMany(Activity, { foreignKey: "scheduleId", as: "activities" });
Activity.belongsTo(Schedule, { foreignKey: "scheduleId", as: "schedule" });

User.hasMany(Schedule);
Schedule.belongsTo(User);

module.exports = { User, Schedule, Activity };
