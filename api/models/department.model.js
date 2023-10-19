import sequelize from "../config/db.config.js";
import { DataTypes } from "sequelize";
import Employee from "./employee.model.js";

const Department = sequelize.define(
  "Department",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    initials: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.TEXT,
    },
  },
  { tableName: "tblDepartments" }
);

Department.hasMany(Employee);

export default Department;
