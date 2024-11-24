const express = require("express");
const Auction = require("../models/Auction");
const Player = require("../models/Player");
const Team = require("../models/Team"); // Import Team model
const router = express.Router();

// Route to get all players for selection (optional, if you need it)
router.get("/players", async (req, res) => {
  try {
    const players = await Player.find();
    res.json(players);
  } catch (error) {
    res.status(500).json({ message: "Error fetching players", error });
  }
});

router.get("/auction/players", async (req, res) => {
  try {
    const players = await Auction.find();
    res.json(players);
  } catch (error) {
    res.status(500).json({ message: "Error fetching players", error });
  }
});

// Route to get all teams for selection (for auction form dropdown)
router.get("/teams", async (req, res) => {
  try {
    const teams = await Team.find();
    res.json(teams);
  } catch (error) {
    res.status(500).json({ message: "Error fetching teams", error });
  }
});

// Route to add auction details
router.post("/auctions", async (req, res) => {
  const { playerName, finalPrice, team, status, playerId } = req.body;

  try {
    // Fetch player details from the Player collection
    const player = await Player.findOne({ _id: playerId });

    if (!player) {
      return res.status(404).json({ message: "Player not found" });
    }

    // Use `findOneAndUpdate` to either update the existing auction or create a new one
    const updatedAuction = await Auction.findOneAndUpdate(
      { _id: playerId }, // Find auction by playerName
      {
        playerName,
        type: player.type,
        category: player.category,
        finalPrice,
        team,
        status,
        specialization: player.specialization,
        age: player.age,
        sno: player.sno,
      },
      { new: true, upsert: true } // `new: true` returns the updated document, `upsert: true` creates if not found
    );

    const io = req.app.get("socketio");
    io.emit("new-auction", updatedAuction);
    res.status(200).json(updatedAuction); // Respond with the updated or created auction
  } catch (error) {
    res.status(500).json({ message: "Error saving auction details", error });
  }
});

module.exports = router;
