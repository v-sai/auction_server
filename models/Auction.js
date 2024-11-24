const mongoose = require("mongoose");

const auctionSchema = new mongoose.Schema({
  playerName: { type: String, required: true },
  type: { type: String, required: true },
  category: { type: String, required: true },
  finalPrice: { type: Number, required: true },
  team: { type: String, required: true },
  status: { type: String, required: true },
  age: { type: String, required: true },
  sno: { type: Number, required: true, unique: true },
  specialization: { type: String, required: true },
});

const Auction = mongoose.model("Auction", auctionSchema);

module.exports = Auction;
