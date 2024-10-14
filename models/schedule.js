const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./user');

const Schedule = sequelize.define('Schedule', {
  name: {
    type: DataTypes.STRING,
    unique: true,
  },
  image_url: DataTypes.STRING,
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id',
    },
  },
});

User.hasMany(Schedule);
Schedule.belongsTo(User);

module.exports = Schedule;
