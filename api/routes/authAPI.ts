const express = require("express");
const router = express.Router();

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  if (username === "testuser" && password === "password") {
    res.status(200).json({ message: "Login successful", user: { username } });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
});

module.exports = router;
