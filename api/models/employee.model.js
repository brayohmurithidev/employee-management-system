import sequelize from "../config/db.config.js";
import { DataTypes } from "sequelize";
import User from "./users.model.js";
import EmployeeExperience from "./employeeExperience.model.js";
import EmployeeEducation from "./employeeEducation.model.js";
import Department from "./department.model.js";

const Employee = sequelize.define(
  "Employee",
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
    gender: {
      type: DataTypes.ENUM("M", "F", "O"),
      allowNull: false,
    },
    dob: {
      type: DataTypes.DATEONLY,
    },
    nationality: {
      type: DataTypes.STRING,
    },
    address: {
      type: DataTypes.STRING,
    },
    city: {
      type: DataTypes.STRING,
    },
    state: {
      type: DataTypes.STRING,
    },
    postalCode: {
      type: DataTypes.INTEGER,
    },
    phones: {
      type: DataTypes.JSON,
    },
    personalEmail: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    workEmail: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true,
      },
    },
    employeeId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    department: {
      type: DataTypes.INTEGER,
      references: { model: "tblDepartments", key: "id" },
    },
    jobTitle: {
      type: DataTypes.STRING,
    },
    hireDate: {
      type: DataTypes.DATEONLY,
    },
    employmentType: {
      type: DataTypes.STRING,
    },
    employeeStatus: {
      type: DataTypes.STRING,
    },
    nextOfKin: {
      type: DataTypes.JSON,
    },
    emergencyContact: {
      type: DataTypes.JSON,
    },
  },
  { tableName: "tblEmployees" }
);

Employee.belongsTo(Department, { foreignKey: "departmentId" });
Employee.hasMany(EmployeeEducation, { as: "employeeEducation" });
Employee.hasMany(EmployeeExperience);
Employee.hasOne(User);

export default Employee;
