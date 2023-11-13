import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import Axios from "../api/axiosCofig";
import { toast } from "react-toastify";

const NewAppraisal = () => {
  const [categories, setCategories] = useState(null);

  useEffect(() => {
    const fetch_data = async () => {
      const results = await Axios.get("/reviews/categories");

      if (results.status === 404) {
        return toast.error("No categories found");
      }
      if (results.status === 200) {
        return results.data;
      }
      return toast.error("An error occured");
    };
    fetch_data().then((data) => setCategories(data));
  }, []);

  let expectedValues = {};
  if (categories) {
    categories.forEach((obj) => {
      expectedValues[obj.category_name] = "";
    });
    console.log(expectedValues);
  }

  return (
    <Formik initialValues={expectedValues} onSubmit={{}}>
      {({ values, errors, touched }) => console.log(values)}
    </Formik>
  );
};

export default NewAppraisal;
