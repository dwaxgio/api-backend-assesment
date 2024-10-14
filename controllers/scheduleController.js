const Schedule = require("../models/schedule");
const Activity = require("../models/activity");

// Create a new Schedule
exports.createSchedule = async (req, res) => {
  try {
    console.log("Request body:", req.body);
    console.log("User ID from token:", req.user.id);
    const { name, image_url } = req.body;
    const newSchedule = await Schedule.create({
      name,
      image_url,
      userId: req.user.id,
    });
    res.status(201).json({ message: "Schedule created", data: newSchedule });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "Failed to create schedule" });
  }
};

// Get a Schedule with its activities
exports.getScheduleWithActivities = async (req, res) => {
  try {
    const schedule = await Schedule.findOne({
      where: { id: req.params.id, userId: req.user.id },
      include: {
        model: Activity,
        as: 'activities',  
      },
    });
    if (!schedule) return res.status(404).json({ error: "Schedule not found" });
    res.status(200).json(schedule);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching schedule" });
  }
};

// Add an activity to a schedule
exports.addActivityToSchedule = async (req, res) => {
  try {
    // Get Schedule
    const schedule = await Schedule.findOne({
      where: { id: req.params.id, userId: req.user.id },
    });

    if (!schedule) {
      return res.status(404).json({ error: "Schedule not found" });
    }

    const { name, start_date, end_date } = req.body;

    // Create a new activity and asociate it with the Schedule
    const newActivity = await Activity.create({
      name,
      start_date,
      end_date,
      scheduleId: schedule.id, // Asociate activity with Schedule
    });

    res.status(201).json({ message: "Activity added", data: newActivity });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "Failed to add activity" });
  }
};
