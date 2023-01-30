const http = require("http");
const path = require("path");
const express = require("express");
const socketio = require("socket.io");
const PORT = process.env.PORT || 3000;

const app = express();
const server = http.createServer(app);
const io = socketio(server);

// Set static folder
app.use(express.static(path.join(__dirname, "public")));

// Run when client connects
io.on("connection", (socet) => {
  console.log("New WS Connection...");
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
