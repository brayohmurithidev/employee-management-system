import { ReviewCategory, EmployeeReview } from "../models/index.models.js";
import { Op } from "sequelize";

const find_review_category = async (data) => {
  const results = await ReviewCategory.findAll({ where: { ...data } });
  if (results.length === 0) {
    return null;
  }
  return results;
};

const find_review = async (data) => {
  const results = await EmployeeReview.findAll({
    where: { ...data },
    include: ["employee", "category"],
  });
  if (results.length === 0) {
    return null;
  }
  return results;
};
//CREATE REVIEW CATEGORIES
export const create_review_category = async (req, res, next) => {
  try {
    const data = req.body;
    if (!data.category_name || data.category_name === "") {
      return res.sendStatus(400);
    }
    await ReviewCategory.create({ ...data });
    return res.sendStatus(200);
  } catch (error) {
    next(error);
  }
};

// VIEW ALL
export const view_all_review_categories = async (req, res, next) => {
  try {
    const categories = await ReviewCategory.findAll({
      WHERE: { status: "active" },
    });
    if (categories.length === 0) {
      return res.sendStatus(404);
    }
    res.status(200).json(categories);
  } catch (error) {
    next(error);
  }
};

// VIEW BY ID
export const view_review_category_by_id = async (req, res, next) => {
  try {
    const id = req.params.id;
    const category = await ReviewCategory.findOne({ where: { id: id } });
    if (!category) {
      return res.sendStatus(404);
    }
    res.status(200).json(category);
  } catch (error) {
    next(error);
  }
};

//EDIT REVIEW CATEGORIES
export const update_review_category_by = async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const category_to_update = await find_review_category({ id });
    console.log(data);
    if (!category_to_update) {
      return res.sendStatus(404);
    }
    await ReviewCategory.update({ ...data }, { where: { id: id } }); //update
    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
};

//DELETE REVIEW CATEGORY
export const delete_review_category_by_id = async (req, res, next) => {
  try {
    const id = req.params.id;
    const category_to_delete = await find_review_category({ id });
    if (!category_to_delete) {
      return res.sendStatus(404);
    }
    await ReviewCategory.destroy({ where: id });
    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
};

// CREATE A REVIEW BY EMPLOYEE
export const create_employee_review = async (req, res, next) => {
  try {
    const data = req.body;
    if (
      data.categoryId === "" ||
      !data.categoryId ||
      !data.employeeId ||
      data.employeeId === ""
    ) {
      return res.sendStatus(400);
    }
    await EmployeeReview.create({ ...data });
    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
};
// UPDATE A REVIEW BY HOD

// VIEW ALL REVIEWS
export const view_all_employee_reviews = async (req, res, next) => {
  try {
    const results = await find_review();
    if (!results) {
      return res.sendStatus(404);
    }
    return res.status(200).json(results);
  } catch (error) {
    next(error);
  }
};

// VIEW A REVIEW BY ID
export const view_all_employee_review_by_id = async (req, res, next) => {
  try {
    const id = req.params.id;
    const results = await find_review({ id });
    if (!results) {
      return res.sendStatus(404);
    }
    return res.status(200).json(results);
  } catch (error) {
    next(error);
  }
};

// GET REVIEW BY EMPLOYEE ID
export const view_all_employee_review_by_employee_id = async (
  req,
  res,
  next,
) => {
  try {
    const id = req.params.employeeId;
    const results = await find_review({ employeeId: id });
    if (!results) {
      return res.sendStatus(404);
    }
    return res.status(200).json(results);
  } catch (error) {
    next(error);
  }
};
// GET SINGLE REVIEW FOR AN EMPLOYEE
export const view_employee_review_by_employee_id_and_review_id = async (
  req,
  res,
  next,
) => {
  try {
    const id = req.params.employeeId;
    const reveiwId = req.params.id;
    const results = await EmployeeReview.findOne({
      where: {
        [Op.and]: [{ id: reveiwId }, { employeeId: id }],
      },
      include: ["employee", "category"],
    });
    if (!results || results.length === 0) {
      return res.sendStatus(404);
    }
    return res.status(200).json(results);
  } catch (error) {
    next(error);
  }
};

// GET EMPLOYEE REVIEWS BY DATE AND TYPE
export const get_reviews_by_date_and_type = async (req, res, next) => {
  try {
    const id = req.params.employeeId;
    const date = req.query.date;
    const type = req.query.type;
    const results = await EmployeeReview.findAll({
      where: {
        [Op.and]: [
          { employeeId: id },
          { review_date: date },
          { appraisal_type: type },
        ],
      },
    });
    if (!results || results.length === 0) {
      return res.sendStatus(404);
    }
    return res.status(200).json(results);
  } catch (error) {
    next(error);
  }
};

// UPDATE A REVIEW

// DELETE A REVIEW

export const delete_review_by_id = async (req, res, next) => {
  try {
    const id = req.params.id;
    const results = await find_review({ id });
    if (!results) {
      return res.sendStatus(404);
    }
    await EmployeeReview.destroy({ where: { id: id } });
    return res.sendStatus(200);
  } catch (error) {
    next(error);
  }
};
