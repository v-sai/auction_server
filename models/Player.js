const mongoose = require("mongoose");

const playerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  age: { type: String, required: true },
  sno: { type: Number, required: true, unique: true },
  specialization: { type: String, required: true },
});

const Player = mongoose.model("Player", playerSchema);

module.exports = Player;
