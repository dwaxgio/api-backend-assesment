const express = require("express");
const jwt = require("jsonwebtoken");

const router = express.Router();

// Route to generate token JWT
router.post("/login", (req, res) => {
  const userId = 1; 
  const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  res.json({ token });
});

module.exports = router;
