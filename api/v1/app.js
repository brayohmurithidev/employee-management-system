import express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";
import findEmployees from "./controllers/employee.controller.js";

const app = express();
const server = createServer(app);
const io = new Server(server); //socket.io server instance

// Middleware and routes goes here

app.get("/", (req, res) => {
  res.json({ message: "Hello, world!" });
});

findEmployees({ employeeId: 10 });

// socket.io event handling

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

const PORT = process.env.PORT || 8000;
server.listen(PORT, () => console.log(`listening on ${PORT}`));
