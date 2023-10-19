import sequelize from "../config/db.config.js";
import { DataTypes } from "sequelize";
import Employee from "./employee.model.js";

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userEmail: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    employeeId: {
      type: DataTypes.INTEGER,
      references: {
        model: "tblEmployees",
        key: "id",
      },
    },
    userRoles: {
      type: DataTypes.JSON,
      defaultValue: "[employee]",
    },
    is2FAEnabled: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    fASecretKey: {
      type: DataTypes.STRING,
    },
    passwordResetOTP: {
      type: DataTypes.STRING,
    },
    lastPasswordResetDate: {
      type: DataTypes.DATE,
    },
    lastLogin: {
      type: DataTypes.DATE,
    },
    failedLoginAttempts: {
      type: DataTypes.INTEGER,
    },
    isLocked: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    accountLockExpiration: {
      type: DataTypes.DATE,
    },
  },

  { tableName: "tblUsers" }
);

User.belongsTo(Employee, {
  foreignKey: "employeeId",
  as: "employee",
});

export default User;
