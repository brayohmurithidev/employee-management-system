import express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";
import sequelize from "./config/db.config.js";
import logger from "./utils/logger.js";

import bodyParser from "body-parser";
import ErrorHandler from "./middlewares/ErrorHandler.js";
import SequelizeErrorHandler from "./middlewares/SequelizeErrorHandler.js";
import employeeRoutes from "./routes/employee.route.js";
import authRoutes from "./routes/auth.route.js";
import cors from "cors";

const app = express();
const server = createServer(app);
const io = new Server(server); //socket.io server instance

const startServer = async () => {
  await sequelize.sync();

  // CORS
  app.use(
    cors({
      origin: "http://localhost:3000",
      credentials: true,
    }),
  );
  // parse application/x-www-form-urlencoded
  app.use(bodyParser.urlencoded({ extended: false }));

  // parse application/json
  app.use(bodyParser.json());

  // Middleware and routes goes here

  app.get("/", (req, res) => {
    res.json({ message: "Hello, world!" });
  });

  //  ROUTES
  app.use("/api/v1/employees", employeeRoutes);
  app.use("/api/v1/auth", authRoutes);

  // ERROR HANDLER MIDDLEWARE AS LAST
  app.use(SequelizeErrorHandler);
  app.use(ErrorHandler);

  // socket.io event handling

  io.on("connection", (socket) => {
    logger.info("a user connected");
    socket.on("disconnect", () => {
      logger.info("user disconnected");
    });
  });

  const PORT = process.env.PORT || 8000;
  server.listen(PORT, () =>
    logger.info(`listening on ${PORT}`, { method: "SERVER", url: "/" }),
  );
};

startServer().then((r) => console.log("Server started successfully ..."));
