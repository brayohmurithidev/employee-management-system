import sequelize from "../config/db.config.js";
import { DataTypes } from "sequelize";
import Employee from "./employee.model.js";

const EmployeeEducation = sequelize.define(
  "EmployeeEducation",
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
    level: {
      type: DataTypes.STRING,
    },
    institution: {
      type: DataTypes.STRING,
    },
    completionDate: {
      type: DataTypes.DATEONLY,
    },
    achievement: {
      type: DataTypes.STRING,
    },
    additionalInformation: {
      type: DataTypes.TEXT,
    },
    documentsUrl: {
      type: DataTypes.JSON,
    },
  },
  { tableName: "tblEmployeeEducations" }
);

EmployeeEducation.belongsTo(Employee, {
  foreignKey: "employeeId",
  as: "employee",
});

export default EmployeeEducation;
