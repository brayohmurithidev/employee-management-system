import sequelize from "../config/db.config.js";
import Sequelize, { DataTypes, ENUM } from "sequelize";

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
  { tableName: "tblDepartments" },
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
      type: DataTypes.STRING,
    },
    phone: {
      type: DataTypes.STRING,
    },
    personalEmail: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    workEmail: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    employeeId: {
      type: DataTypes.INTEGER,
      unique: true,
    },
    departmentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
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
  },
  { tableName: "tblEmployees" },
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
  { tableName: "tblEmployeeEducations" },
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
  { tableName: "tblEmployeeExperiences" },
);

// EMPLOYEE RELATIVES -> EMERGENCY AND NEXT OF KIN
const Relative = sequelize.define(
  "Relative",
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
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    relationship: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    type: {
      type: DataTypes.ENUM("next_of_kin", "emergency_contact"),
      allowNull: false,
    },
  },
  {
    tableName: "tblEmployeeRelatives",
  },
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
    firstLogin: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
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
      defaultValue: ["employee"],
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

  { tableName: "tblUsers" },
);

const DepartmentHead = sequelize.define(
  "DepartmentHead",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    departmentId: {
      type: DataTypes.INTEGER,
      references: {
        model: "tblDepartments",
        key: "id",
      },
    },
    employeeId: {
      type: DataTypes.INTEGER,
      references: {
        model: "tblEmployees",
        key: "id",
      },
    },
  },
  { tableName: "tblDepartmentHeads" },
);

const ReviewCategory = sequelize.define(
  "ReviewCategory",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    category_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    data_type: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.TEXT,
    },
    status: {
      type: ENUM("active", "inactive"),
      defaultValue: "active",
    },
  },
  { tableName: "tblReviewCategory" },
);

const EmployeeReview = sequelize.define(
  "EmployeeReview",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    categoryId: {
      type: DataTypes.INTEGER,
      references: {
        model: "tblReviewCategory",
        key: "id",
      },
    },
    employeeId: {
      type: DataTypes.INTEGER,
      references: {
        model: "tblEmployees",
        key: "id",
      },
    },
    employee_appraisal: { type: DataTypes.JSON },
    hodId: {
      type: DataTypes.INTEGER,
      references: {
        model: "tblEmployees",
        key: "id",
      },
    },
    hod_appraisal: {
      type: DataTypes.JSON,
    },
    other: {
      type: DataTypes.JSON,
    },
    appraisal_type: {
      type: DataTypes.STRING,
    },
    review_date: {
      type: DataTypes.DATEONLY,
    },
    status: {
      type: DataTypes.STRING,
    },
  },
  { tableName: "tblEmployeeReview" },
);

// ASSOCIATIONS
Employee.belongsTo(Department, {
  foreignKey: "departmentId",
  as: "department",
  onUpdate: "CASCADE",
  onDelete: "CASCADE",
});
Employee.hasMany(Education, {
  foreignKey: "employeeId",
  as: "educations",
  onUpdate: "CASCADE",
  onDelete: "CASCADE",
});
Employee.hasMany(Experience, {
  foreignKey: "employeeId",
  as: "experiences",
  onUpdate: "CASCADE",
  onDelete: "CASCADE",
});
Employee.hasMany(Relative, {
  foreignKey: "employeeId",
  as: "relatives",
  onUpdate: "CASCADE",
  onDelete: "CASCADE",
});
Relative.belongsTo(Employee, {
  foreignKey: "employeeId",
  as: "employee",
  onUpdate: "CASCADE",
  onDelete: "CASCADE",
});
Employee.hasOne(User, {
  foreignKey: "employeeId",
  as: "user",
  onUpdate: "CASCADE",
  onDelete: "CASCADE",
});
Education.belongsTo(Employee, {
  foreignKey: "employeeId",
  as: "employee",
  onUpdate: "CASCADE",
  onDelete: "CASCADE",
});

Experience.belongsTo(Employee, {
  foreignKey: "employeeId",
  as: "employee",
  onUpdate: "CASCADE",
  onDelete: "CASCADE",
});
Department.hasMany(Employee, { foreignKey: "departmentId", as: "employees" });

User.belongsTo(Employee, {
  foreignKey: "employeeId",
  as: "employee",
  onUpdate: "CASCADE",
  onDelete: "CASCADE",
});

DepartmentHead.belongsTo(Department, {
  foreignKey: "departmentId",
  as: "department",
  onUpdate: "CASCADE",
  onDelete: "CASCADE",
});
Department.hasOne(DepartmentHead, {
  foreignKey: "departmentId",
  as: "department",
  onUpdate: "CASCADE",
  onDelete: "CASCADE",
});

EmployeeReview.belongsTo(ReviewCategory, {
  foreignKey: "categoryId",
  as: "category",
});
EmployeeReview.belongsTo(Employee, {
  foreignKey: "employeeId",
  as: "employee",
});
Employee.hasMany(EmployeeReview, { foreignKey: "employeeId", as: "employee" });
EmployeeReview.belongsTo(Employee, {
  foreignKey: "hodId",
  as: "hod",
});
Employee.hasMany(EmployeeReview, { foreignKey: "hodId", as: "hod" });
ReviewCategory.hasMany(EmployeeReview, {
  foreignKey: "categoryId",
  as: "category",
});
//

// // SYNC TO CREATE MODELS
// try {
//   sequelize.sync({ force: true });
//   console.log("Model User created successfully");
// } catch (error) {
//   console.error(`Table failed to create`, error);
// }

export {
  Employee,
  Education,
  Experience,
  User,
  Department,
  Relative,
  DepartmentHead,
  ReviewCategory,
  EmployeeReview,
};
