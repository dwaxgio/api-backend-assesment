const Schedule = require("../models/schedule");
const Activity = require("../models/activity");

// Create a new Schedule
exports.createSchedule = async (req, res) => {
  try {
    const { name, image_url } = req.body;
    const newSchedule = await Schedule.create({
      name,
      image_url,
      userId: req.user.id,
    });
    res.status(201).json({ message: "Schedule created", data: newSchedule });
  } catch (error) {
    res.status(400).json({ error: "Failed to create schedule" });
  }
};

// Get a Schedule with its activities
exports.getScheduleWithActivities = async (req, res) => {
  try {
    const schedule = await Schedule.findOne({
      where: { id: req.params.id, userId: req.user.id },
      include: Activity,
    });
    if (!schedule) return res.status(404).json({ error: "Schedule not found" });
    res.status(200).json(schedule);
  } catch (error) {
    res.status(500).json({ error: "Error fetching schedule" });
  }
};
