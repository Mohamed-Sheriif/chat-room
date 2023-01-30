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
io.on("connection", (socket) => {
  console.log("New WS Connection...");

  // Appear to the single user who connect
  socket.emit("message", "Welcome to ChatCord");

  // Broadcast when a user connect (appear to all users except this user)
  socket.broadcast.emit("message", "A user has joined the chat");

  // Runs when client disconnects
  socket.on("disconnect", () => {
    // Appear to all the users including the disconnecting user
    io.emit("message", "A user has let the chat");
  });

  socket.on("chatMessage", (msg) => {
    io.emit("message", msg);
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
