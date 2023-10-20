import express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";
import { createEmployee } from "./controllers/employee.controller.js";
import sequelize from "./config/db.config.js";
import logger from "./utils/logger.js";

const app = express();
const server = createServer(app);
const io = new Server(server); //socket.io server instance

const startServer = async () => {
  await sequelize.sync({ force: true });

  // Middleware and routes goes here

  app.get("/", (req, res) => {
    res.json({ message: "Hello, world!" });
  });

  // findEmployees({ employeeId: 10 });
  createEmployee();

  // socket.io event handling

  io.on("connection", (socket) => {
    logger.info("a user connected");
    socket.on("disconnect", () => {
      logger.info("user disconnected");
    });
  });

  const PORT = process.env.PORT || 8000;
  server.listen(PORT, () =>
    logger.info(`listening on ${PORT}`, { method: "SERVER", url: "/" })
  );
};

startServer();
