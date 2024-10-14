const express = require("express");
const {
  createSchedule,
  getScheduleWithActivities,
} = require("../controllers/scheduleController");
const authenticate = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/", authenticate, createSchedule);
router.get("/:id", authenticate, getScheduleWithActivities);

module.exports = router;
