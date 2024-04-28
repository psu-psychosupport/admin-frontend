import { Box, Button, Typography, Stack, TextField } from "@mui/material";
import { useFormik } from "formik";
import React from "react";
import * as yup from "yup";
import { ICategory } from "../../api/types/content";
import ModelTable from "../ModelTable";
import { ICategoryForm } from "./types";

const validationSchema = yup.object({
  name: yup.string().required("Это поле обязательно к заполнению"),
});

const CategoryForm = ({
  category,
  onSubmit,
}: {
  category?: ICategory;
  onSubmit: (payload: ICategoryForm) => void;
}) => {
  const formik = useFormik({
    initialValues: {
      name: category?.name || "",
      subcategories: [],
    },
    validationSchema,
    onSubmit,
  });

  return (
    <Box sx={{ width: "30vw" }}>
      <Typography variant={"h4"} fontWeight={"800"} sx={{ marginBottom: 2 }}>
        {category ? "Редактирование" : "Создание"} категории
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <Stack spacing={2}>
          <TextField
            name={"name"}
            id={"name"}
            label={"Название категории"}
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />

          <Typography variant={"h5"} fontWeight={"600"}>
            Подкатегории
          </Typography>

          <ModelTable
            showHeader={false}
            columnTitles={["Id", "Название"]}
            columnKeys={["id", "name"]}
            data={formik.values.subcategories}
            onRequestEdit={() => {}}
          />

          <Button
            sx={{ marginTop: 4 }}
            color={"primary"}
            variant={"contained"}
            type="submit"
          >
            {category ? "Обновить" : "Добавить"}
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default CategoryForm;
