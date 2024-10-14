const express = require("express");
const {
  createSchedule,
  getScheduleWithActivities,
  addActivityToSchedule,
} = require("../controllers/scheduleController");
const authenticate = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/", authenticate, createSchedule);
router.get("/:id", authenticate, getScheduleWithActivities);
router.post("/:id/activities", authenticate, addActivityToSchedule);

module.exports = router;
