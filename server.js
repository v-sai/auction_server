const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const playerRoutes = require("./routes/playerRoutes");
//const auctionedPlayerRoutes = require('./routes/auctionedPlayerRoutes');
const auctionRoutes = require("./routes/auctionRoutes");
const teamRoutes = require("./routes/teamRoutes");

require("dotenv").config();

const app = express();

const server = http.createServer(app);
// const io = new Server(server);
const io = new Server(server, {
  cors: {
    origin: "*", // Your frontend URL
    methods: ["GET"],
    allowedHeaders: ["Content-Type"],
  },
});

app.set("socketio", io);

app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.error("MongoDB connection error:", err));

// Use player routes
app.use("/api", playerRoutes);
//app.use('/api', auctionedPlayerRoutes);
app.use("/api", auctionRoutes);
app.use("/api/teams", teamRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("Auction2025 API is running!");
});

const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
