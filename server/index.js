const express = require("express");
const app = express();
const port = 8000;

//setup the chat server
const chatServer = require("http").Server(app);
const io = require("socket.io")(chatServer);

io.on("connection", (socket) => {
  socket.on("send", function (data) {
    io.emit("receive", data);
  });
});

chatServer.listen(port, function () {
  console.log("Chat server is listening on port:", port);
});
