import { Op } from "sequelize";
import {
  Education,
  Employee,
  Experience,
  Relative,
} from "../models/index.models.js";
import logger from "../utils/logger.js";
import { apiResponse } from "../utils/response.js";
import { employeeDataArray } from "../utils/dummy.data.js";
import { generate_first_time_password, hash_password } from "../utils/utils.js";

const add_employee = async (data) => {
  let employee, education, experience, relative;

  const { experiences, educations, relatives, ...others } = data;

  // Create the employee
  employee = await Employee.create(others);

  if (educations !== undefined && experiences !== undefined) {
    // Create educations and experiences in parallel
    [education, experience] = await Promise.all([
      Education.bulkCreate(educations),
      Experience.bulkCreate(experiences),
    ]);
    await employee.addEducations(education);
    await employee.addExperiences(experience);
  } else if (educations !== undefined) {
    education = await Education.bulkCreate(educations);
    await employee.addEducations(education);
  } else if (experiences !== undefined) {
    experience = await Experience.bulkCreate(experiences);
    await employee.addExperiences(experience);
  } else if (relatives !== undefined) {
    relative = await Relative.bulkCreate(relatives);
    await employee.addRelatives(relative);
  }
  let userEmail,
    userRoles = ["admin", "IT Supervisor"];
  if (!employee.workEmail) {
    userEmail = employee.personalEmail;
  } else {
    userEmail = employee.workEmail;
  }

  let password = generate_first_time_password();
  console.log(password);
  password = await hash_password(password);

  await employee.createUser({ userEmail, userRoles, password });

  return employee;
};

// FIND EMPLOYEE BY

const findEmployees_by = async (kwargs) => {
  const employees = await Employee.findAll({
    where: { [Op.and]: { ...kwargs } },
    include: ["experiences", "educations", "relatives"],
  });
  if (employees?.length < 1) {
    return "NOT_FOUND";
  }

  return employees.map((employee) => employee.toJSON());
};

// CREATE EMPLOYEES
export const createEmployee = async (req, res, next) => {
  try {
    const data = req.body;

    const employee = await add_employee(data);
    console.log(employee);
    return res.status(200).json({ msg: "Employee added successfully" });
  } catch (error) {
    console.log(error);
    logger.error(error, {
      method: req.method,
      url: req.originalUrl,
    });
    return next(error);
  }
};

// EMPLOYEES BULK CREATE
export const createEmployeeBulk = async (req, res, next) => {
  try {
    employeeDataArray.map(async (data) => {
      const employee = await add_employee(data);
      console.log(employee);
      return res.status(200).json({ msg: "Employee added successfully" });
    });
  } catch (error) {
    console.log(error);
    logger.error(error, {
      method: req.method,
      url: req.originalUrl,
    });
    return next(error);
  }
};

//GET ALL EMPLOYEES
export const get_employees = async (req, res, next) => {
  let { limit, order, sort_by, page } = req.query;

  limit = parseInt(limit) || 10;
  page = parseInt(page) || 1;
  order = order || "ASC";
  sort_by = sort_by || "id";
  const startIndex = (page - 1) * limit;
  try {
    const employees = await Employee.findAll({
      include: [{ all: true, nested: true, duplicating: false }],
      order: [[sort_by, order]],
      offset: startIndex,
      limit: limit,
    });
    if (employees === "NOT_FOUND") {
      return res.status(404).json({ msg: "Employees not found" });
    }
    const data = {
      employees,
      total: employees.length,
      page: page,
    };
    console.log(req.userId);
    return res.status(200).json(data);
  } catch (error) {
    logger.error(error, { method: req.method, url: req.url });
    return next(error);
  }
};
// GET EMPLOYEE BY Id
export const get_employee_by_id = async (req, res, next) => {
  try {
    const id = req.params.id;
    const employee = await findEmployees_by();
    if (employee === "NOT_FOUND") {
      return res.status(404).json({ msg: "Employee not found" });
    }
    return res.status(200).json(employee[0]);
  } catch (error) {
    logger.error(error, { method: req.method, url: req.url });
    return next(error);
  }
};
// update employee
export const update_employee_data = async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const employee = await Employee.findOne({ where: { id: id } });
    if (!employee) {
      return res
        .status(404)
        .json(apiResponse("NOT_FOUND", null, "Employee not found", 404, null));
    }
    employee.set(data);
    await employee.save();
    const response = apiResponse(
      "SUCCESS",
      null,
      "Employee data updated successfully",
      200,
      null
    );
    return res.status(200).json(response);
  } catch (error) {
    logger.error(error, { method: req.method, url: req.url });
    return next(error);
  }
};
// delete employee only be accessed by admin
export const delete_employee = async (req, res, next) => {
  try {
    const id = req.params.id;
    const employee = await Employee.findOne({ where: { id: id } });
    if (!employee) {
      return res
        .status(404)
        .json(apiResponse("NOT_FOUND", null, "Employee not found", 404, null));
    }
    await Employee.destroy({ where: { id: id } });
    return res
      .status(200)
      .json(apiResponse("SUCCESS", null, "Employee deleted successfully", 200));
  } catch (error) {
    return next(error);
  }
};

// Search employee by name, job title, employment type
export const search_by_name_or_title_or_emp_type = async (req, res, next) => {
  console.log("Searching...");

  try {
    let { name, title, employment_type, limit, order, sort_by, page } =
      req.query;

    limit = parseInt(limit) || 10;
    page = parseInt(page) || 1;
    order = order || "ASC";
    sort_by = sort_by || "id";
    const startIndex = (page - 1) * limit;

    const query = {};
    if (name) {
      query.name = {
        [Op.substring]: name,
      };
    }
    if (title) {
      query.jobTitle = {
        [Op.substring]: title,
      };
    }
    if (employment_type) {
      query.employmentType = {
        [Op.substring]: employment_type,
      };
    }

    const employees = await Employee.findAll({
      include: [{ all: true, nested: true, duplicating: false }],
      where: query,
      order: [[sort_by, order]],
      offset: startIndex,
      limit: limit,
    });
    if (employees.length < 1) {
      res
        .status(404)
        .json(apiResponse("NOT_FOUND", null, "No data found", 404));
    }
    const data = {
      employees,
      total: employees.length,
      page: page,
    };
    res.status(200).json(apiResponse("SUCCESS", data, null, 200));
  } catch (error) {
    next(error);
  }
};
