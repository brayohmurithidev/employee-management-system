import sequelize from "../config/db.config.js";
import { DataTypes } from "sequelize";

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

// EMPLOYEE MODEL
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
      unique: true,
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

// EDUCATION MODEL
const Education = sequelize.define(
  "Education",
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

// EXPERIENCE MODEL
const Experience = sequelize.define(
  "Experience",
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
  { tableName: "tblEmployeeExperiences" }
);
// USER MODEL
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

// ASSOCIATIONS
Employee.belongsTo(Department, { foreignKey: "department" });
Employee.hasMany(Education, {
  foreignKey: "employeeId",
  as: "educations",
});
Employee.hasMany(Experience, {
  foreignKey: "employeeId",
  as: "experiences",
});
Employee.hasOne(User, { foreignKey: "employeeId", as: "user" });
Education.belongsTo(Employee, {
  foreignKey: "employeeId",
  as: "employee",
});

Experience.belongsTo(Employee, {
  foreignKey: "employeeId",
  as: "employee",
});
Department.hasMany(Employee, { foreignKey: "department" });

User.belongsTo(Employee, {
  foreignKey: "employeeId",
  as: "employee",
});

// // SYNC TO CREATE MODELS
// try {
//   sequelize.sync({ force: true });
//   console.log("Model User created successfully");
// } catch (error) {
//   console.error(`Table failed to create`, error);
// }

export { Employee, Education, Experience, User, Department };
