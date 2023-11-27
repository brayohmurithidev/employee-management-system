import Sequelize from "sequelize";
import dotenv from "dotenv";
import logger from "../utils/logger.js";
dotenv.config();
// Import redis client
import client from "./redis.config.js";

const DB_NAME = await client.get("DB_NAME");
const DB_USER = await client.get("DB_USER");
const DB_PASSWORD = await client.get("DB_PASSWORD");
const DB_HOST = await client.get("DB_HOST");
const DB_PORT = await client.get("DB_PORT");

// console.log(DB_HOST, DB_PASSWORD, DB_USER);

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  dialect: "mysql",
  host: DB_HOST,
  port: DB_PORT,
  logging: false,
  define: {
    freezeTableName: true,
  },
  // query: { raw: true },
});

// CHECK CONNECTION TO DB

sequelize
  .authenticate()
  .then(() =>
    logger.info("Connected to database", { method: "DB-CONNECTION", url: "/" }),
  )
  .catch((error) => {
    return logger.error(error, { method: "DB-ERROR", url: "/" });
  });

export default sequelize;
