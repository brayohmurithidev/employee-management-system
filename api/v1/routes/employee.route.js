import express from "express";
import {
  createEmployee,
  createEmployeeBulk,
  delete_employee,
  get_employee_by_id,
  get_employees,
  search_by_name_or_title_or_emp_type,
  update_employee_data,
} from "../controllers/employee.controller.js";

const router = express.Router();

// CREATE ROUTES
router.route("/").get(get_employees).post(createEmployee);
router.get("/addbulk", createEmployeeBulk);

router.route("/search").get(search_by_name_or_title_or_emp_type);

router
  .route("/:id")
  .get(get_employee_by_id)
  .put(update_employee_data)
  .delete(delete_employee);

export default router;
