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
import { role_auth, verify_token } from "../middlewares/auth.middleware.js";
import {
  get_reviews_by_date_and_type,
  view_all_employee_review_by_employee_id,
  view_employee_review_by_employee_id_and_review_id,
} from "../controllers/review.controller.js";

const router = express.Router();

// CREATE ROUTES
router
  .route("/")
  .get(verify_token, role_auth(["admin", "hr"]), get_employees)
  .post(createEmployee);
router.get("/addbulk", createEmployeeBulk);

router.route("/search").get(search_by_name_or_title_or_emp_type);

router
  .route("/:id")
  .get(get_employee_by_id)
  .put(update_employee_data)
  .delete(delete_employee);

// EMPLOYEE REVIEWS
router
  .route("/:employeeId/reviews")
  .get(view_all_employee_review_by_employee_id);
router.route("/:employeeId/review").get(get_reviews_by_date_and_type);
router
  .route("/:employeeId/reviews/:id")
  .get(view_employee_review_by_employee_id_and_review_id);

export default router;
