const express = require("express");
const dotenv = require("dotenv");
const sequelize = require("./config/db");
const scheduleRoutes = require("./routes/scheduleRoutes");
const morgan = require("morgan");

dotenv.config();

const app = express();
app.use(express.json());
app.use(morgan("dev"));

// Routes
app.use("/schedules", scheduleRoutes);

const PORT = process.env.PORT || 3000;

// Sync with db and start the server
sequelize
  .sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to sync database:", err);
  });
