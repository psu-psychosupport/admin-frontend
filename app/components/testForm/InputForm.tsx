import { FormikProps } from "formik";
import { TextField } from "@mui/material";
import React from "react";
import { ITestForm } from "~/routes/tests.add";

export const InputForm = ({ formik }: { formik: FormikProps<ITestForm> }) => {
  return (
    <TextField
      label={"Ответ на тест"}
      value={formik.values.validTextInput}
      error={
        formik.touched.validTextInput && Boolean(formik.errors.validTextInput)
      }
      helperText={formik.touched.validTextInput && formik.errors.validTextInput}
      onChange={(event) => {
        const value = event.target.value;
        formik.setValues({ ...formik.values, validTextInput: value });
      }}
    />
  );
};
