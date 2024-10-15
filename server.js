const express = require("express");
const dotenv = require("dotenv");
const sequelize = require("./config/db");
const { User } = require("./config/relationships");
const scheduleRoutes = require("./routes/scheduleRoutes");
const loginRoute = require("./routes/loginRoute");
const morgan = require("morgan");

dotenv.config();

const app = express();
app.use(express.json());
app.use(morgan("dev"));

// Routes
app.use("/auth", loginRoute);
app.use("/schedules", scheduleRoutes);

const PORT = process.env.PORT || 3000;

// Sync with db and start the server
sequelize
  .sync()
  .then(async () => {
    // Verify if a user with id = 1 exists, if not, create it
    const existingUser = await User.findOne({ where: { id: 1 } });
    if (!existingUser) {
      await User.create({
        id: 1,
        name: "Test User",
        email: "test@example.com",
        password: "Abc123",
      });
      console.log("User with id 1 has been created.");
    } else {
      console.log("User with id 1 already exists.");
    }

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to sync database:", err);
  });
