import Sequelize from "sequelize";
import dotenv from "dotenv";
import logger from "../utils/logger.js";
dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    dialect: "mysql",
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    logging: false,
    define: {
      freezeTableName: true,
    },
    // query: { raw: true },
  }
);

// CHECK CONNECTION TO DB

sequelize
  .authenticate()
  .then(() =>
    logger.info("Connected to database", { method: "DB-CONNECTION", url: "/" })
  )
  .catch((error) => {
    return logger.error(error, { method: "DB-ERROR", url: "/" });
  });

export default sequelize;
