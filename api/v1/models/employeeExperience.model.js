import sequelize from "../config/db.config.js";
import { DataTypes } from "sequelize";

const EmployeeExperience = sequelize.define(
  "EmployeeExperience",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    employeeId: {
      type: DataTypes.INTEGER,
      references: {
        model: "tblEmployees",
        key: "id",
      },
    },
    employerName: {
      type: DataTypes.STRING,
    },
    jobPosition: {
      type: DataTypes.STRING,
    },
    dateFrom: {
      type: DataTypes.DATEONLY,
    },
    dateTo: {
      type: DataTypes.DATEONLY,
    },
    description: {
      type: DataTypes.TEXT,
    },
    documentsUrl: {
      type: DataTypes.JSON,
    },
  },
  { tableName: "tblemployeeExperiences" }
);

export default EmployeeExperience;
