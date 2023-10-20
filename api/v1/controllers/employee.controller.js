import { Op } from "sequelize";
import Employee from "../models/employee.model.js";
import Education from "../models/employeeEducation.model.js";
import Experience from "../models/employeeExperience.model.js";

const findEmployees = async (kwargs) => {
  console.log({ ...kwargs });
  try {
    const employees = await Employee.findOne({
      where: { [Op.and]: { ...kwargs } },
      include: ["experience", "education"],
      // raw: true,
    });
    if (employees?.length < 1) {
      console.log("No employee/ employees found");
      return;
    }
    const data = employees.toJSON();
    return data;
  } catch (error) {
    console.error(error);
  }
};

export default findEmployees;
