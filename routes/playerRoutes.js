const express = require("express");
const Player = require("../models/Player");
const router = express.Router();

// Route to add a player
router.post("/players", async (req, res) => {
  const { name, type, price, category, specialization, age, sno } = req.body;

  try {
    const newPlayer = new Player({
      name,
      type,
      price,
      category,
      specialization,
      age,
      sno,
    });
    await newPlayer.save();
    res.status(201).json(newPlayer);
  } catch (error) {
    res.status(500).json({ message: "Error saving player", error });
  }
});

module.exports = router;
