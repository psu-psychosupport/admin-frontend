import { FormikProps } from "formik";
import { Box, Button, IconButton, TextField } from "@mui/material";
import {
  Add as AddIcon,
  Check as CheckIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";
import React from "react";
import { ITestForm } from "~/routes/tests.add";

export const OptionsForm = ({ formik }: { formik: FormikProps<ITestForm> }) => {
  return (
    <>
      {formik.values.options &&
        formik.values.options.map((_, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              justifyContent: "row",
              alignItems: "center",
            }}
          >
            <TextField
              label={"Опция"}
              value={formik.values.options![index]}
              onChange={(event) => {
                const optionText = event.target.value;
                const options = formik.values.options
                  ? [...formik.values.options]
                  : [];
                options[index] = optionText;
                formik.setValues({ ...formik.values, options });
              }}
              color={
                index === formik.values.validOptionIndex ? "success" : undefined
              }
              focused={index === formik.values.validOptionIndex}
            />
            <IconButton
              onClick={() => {
                const options = formik.values.options!.filter(
                  (__, ind) => ind !== index
                );
                formik.setValues({ ...formik.values, options });
              }}
            >
              <DeleteIcon />
            </IconButton>
            {index !== formik.values.validOptionIndex && (
              <IconButton
                onClick={() => {
                  formik.setValues({
                    ...formik.values,
                    validOptionIndex: index,
                  });
                }}
              >
                <CheckIcon />
              </IconButton>
            )}
          </Box>
        ))}
      <Button
        startIcon={<AddIcon />}
        variant={"outlined"}
        onClick={() => {
          formik.setValues({
            ...formik.values,
            options: formik.values.options
              ? [...formik.values.options, ""]
              : [""],
          });
        }}
      >
        Добавить опцию
      </Button>
    </>
  );
};
