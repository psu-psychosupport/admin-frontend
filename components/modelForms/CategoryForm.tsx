import {
  Box,
  Button,
  Typography,
  Stack,
  TextField,
  IconButton,
} from "@mui/material";
import { useFormik } from "formik";
import React from "react";
import * as yup from "yup";
import { ICategoryForm } from "./types";
import { Add as AddIcon, Delete as DeleteIcon } from "@mui/icons-material";
import { useFetcher } from "@remix-run/react";

const validationSchema = yup.object({
  name: yup.string().required("Это поле обязательно к заполнению"),
});

const Subcategory = ({
  name,
  onChange,
  onDelete,
}: {
  name: string;
  onChange: (name: string) => void;
  onDelete: () => void;
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <TextField
        label={"Название подкатегории"}
        fullWidth
        value={name}
        onChange={(event) => onChange(event.target.value)}
      />
      <IconButton onClick={onDelete}>
        <DeleteIcon />
      </IconButton>
    </Box>
  );
};

const CategoryForm = () => {
  const fetcher = useFetcher();

  const formik = useFormik<ICategoryForm>({
    initialValues: {
      name: "",
      subcategories: [],
    },
    validationSchema,
    onSubmit: (data) => {
      fetcher.submit(
        { category: data },
        { method: "POST", encType: "application/json" },
      );
    },
  });

  return (
    <Box sx={{ width: "50vw" }}>
      <Typography variant={"h4"} fontWeight={"800"} sx={{ marginBottom: 2 }}>
        Создание категории
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

          {formik.values.subcategories.map((subcategory, index) => (
            <Subcategory
              key={index}
              name={subcategory}
              onChange={(name) => {
                const subcategories = [...formik.values.subcategories];
                subcategories[index] = name;
                formik.setValues({ ...formik.values, subcategories });
              }}
              onDelete={() => {
                const subcategories = formik.values.subcategories.filter(
                  ($, $index) => $index !== index,
                );
                formik.setValues({ ...formik.values, subcategories });
              }}
            />
          ))}
          <Button
            startIcon={<AddIcon />}
            variant={"outlined"}
            onClick={() =>
              formik.setValues({
                ...formik.values,
                subcategories: [...formik.values.subcategories, ""],
              })
            }
          >
            Добавить подкатегорию
          </Button>

          <Button
            sx={{ marginTop: 4 }}
            color={"primary"}
            variant={"contained"}
            type="submit"
          >
            Сохранить
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default CategoryForm;
