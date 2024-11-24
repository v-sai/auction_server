// backend/models/Team.js

const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
  team: { type: String, required: true },
  fullName: { type: String, required: true },
  year: { type: Number, required: true }
});

module.exports = mongoose.model('Team', teamSchema);
