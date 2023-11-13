import express from "express";

import {
  create_review_category,
  view_all_review_categories,
  view_review_category_by_id,
  delete_review_category_by_id,
  update_review_category_by,
  create_employee_review,
  view_all_employee_reviews,
  view_all_employee_review_by_id,
  delete_review_by_id,
} from "../controllers/review.controller.js";

const router = express.Router();

router
  .route("/categories")
  .post(create_review_category)
  .get(view_all_review_categories);
router
  .route("/categories/:id")
  .put(update_review_category_by)
  .get(view_review_category_by_id)
  .delete(delete_review_category_by_id);

// REVIEW ROUTES
router.route("/").post(create_employee_review).get(view_all_employee_reviews);
router
  .route("/:id")
  .get(view_all_employee_review_by_id)
  .delete(delete_review_by_id);

// REVIEW FOR SINGLE EMPLOYEE

export default router;
