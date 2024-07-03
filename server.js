const express = require("express");
const app = express();

const http = require("http");
const server = http.createServer(app);

const PORT = process.env.PORT || 5000;
const io = require("socket.io")(server,{
  cors:{
    origin:"*"
  }
});

io.on("connection", (socket) => {
//   console.log("what is socket..", socket);
  console.log("Socket is active to be connected");

  socket.on("chat", (payload) => {
    console.log("what is payload >", payload);
    io.emit("chat", payload);
  });
});

// server.listen(PORT, () => {
//   console.log(`Server is running at PORT number ${PORT}`);
// });

if (!process.env.VERCEL) {
  // Start the server in a local environment
  server.listen(PORT, () => {
    console.log(`Server is running at PORT number ${PORT}`);
  });
} else {
  // Export the server for serverless environment
  module.exports = (req, res) => {
    server.emit("request", req, res);
  };
}