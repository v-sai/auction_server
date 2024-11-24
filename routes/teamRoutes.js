// backend/routes/teamRoutes.js

const express = require('express');
const Team = require('../models/Team');
const router = express.Router();

// POST: Add a new team
router.post('/', async (req, res) => {
  const { team, fullName, year } = req.body;

  try {
    const newTeam = new Team({
      team,
      fullName,
      year,
    });

    const savedTeam = await newTeam.save();
    res.json(savedTeam);  // Send back the saved team data
  } catch (error) {
    res.status(400).json({ message: 'Error saving team: ' + error.message });
  }
});

module.exports = router;
