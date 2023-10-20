import { Op } from "sequelize";
import { Employee, Education, Experience } from "../models/index.models.js";
import logger from "../utils/logger.js";

const add_employee = async (data, educations, experiences) => {
  try {
    let employee, education, experience;

    // Create the employee
    employee = await Employee.create(data);

    // Create educations and experiences in parallel
    [education, experience] = await Promise.all([
      Education.bulkCreate(educations),
      Experience.bulkCreate(experiences),
    ]);

    // Associate educations and experiences with the employee
    await employee.addEducations(education);
    await employee.addExperiences(experience);
  } catch (error) {
    logger.error(error, { method: req.method, url: req.url });
  }
};

export const createEmployee = async (req, res) => {
  try {
    const data = {
      name: "Eunice Muthoni",
      gender: "F",
      employeeId: 21,
      personalEmail: "bm@mail.com",
    };
    const educations = [{ level: "secondary" }, { level: "college" }];
    const experiences = [{ employer: "Ngeru Elite" }];
    await add_employee(data, educations, experiences);
  } catch (error) {
    logger.error(error, { method: req.method, url: req.url });
  }
};

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
    logger.error(error, { method: req.method, url: req.url });
  }
};

export default findEmployees;
