import Sequelize from "sequelize";
import dotenv from "dotenv";
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
  }
);

// CHECK CONNECTION TO DB

sequelize
  .authenticate()
  .then(() => console.log("Connected to database"))
  .catch((err) => console.log("Error connecting: ", err));

// SYNC TO CREATE MODELS
sequelize
  .sync({ force: false })
  .then(() => console.log("Models created successfully"))
  .catch((err) => console.log("Error creating models: ", err));

export default sequelize;
