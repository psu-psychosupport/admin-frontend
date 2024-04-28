import {
  Box,
  Checkbox,
  FormLabel,
  Button,
  Typography,
  Stack,
  FormControlLabel,
  TextField,
} from "@mui/material";
import { IUserForm } from "./types";
import { useFormik } from "formik";
import React from "react";
import * as yup from "yup";
import { IUser } from "../../api/types/users";
import { userHasPermission, UserPermissions } from "../../api/types/enums";

const validationSchema = yup.object({
  email: yup
    .string()
    .email("Введите корректную почту")
    .required("Почта обязательна к заполнению"),
  password: yup
    .string()
    .min(8, "Длина пароля должна быть как минимум из 8 символов")
    .required("Пароль обязателен к заполнению"),
  name: yup.string().required("Имя обязательно к заполнению"),
});

const UserForm = ({
  user,
  onSubmit,
}: {
  user?: IUser;
  onSubmit: (payload: IUserForm) => void;
}) => {
  const formik = useFormik({
    initialValues: {
      name: user?.name || "",
      email: user?.email || "",
      password: "",
      permissions: [],
    },
    validationSchema,
    onSubmit: ({ name, email, password, permissions }) => {
      onSubmit({
        name,
        email,
        password,
        permissions: permissions.reduce((acc, sum) => sum + acc, 0),
      });
    },
  });

  return (
    <Box sx={{ width: "30vw" }}>
      <Typography variant={"h4"} fontWeight={"800"} sx={{ marginBottom: 2 }}>
        {user ? "Редактирование" : "Создание"} пользователя
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <Stack spacing={2}>
          <TextField
            name={"name"}
            id={"name"}
            label={"Имя"}
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />

          <TextField
            name={"email"}
            id={"email"}
            label={"Электронная почта"}
            type={"email"}
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <TextField
            name={"password"}
            id={"password"}
            label={"Пароль"}
            type={"password"}
            autoComplete={"new-password"}
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />

          <FormLabel>Разрешения</FormLabel>
          <FormControlLabel
            name={"permissions"}
            id={"permissions"}
            onChange={formik.handleChange}
            control={
              <Checkbox
                value={1}
                defaultChecked={
                  user?.permissions
                    ? userHasPermission(
                        user?.permissions,
                        UserPermissions.ADMINISTRATOR,
                      )
                    : false
                }
              />
            }
            label="Администратор"
          />

          <Button
            sx={{ marginTop: 4 }}
            color={"primary"}
            variant={"contained"}
            type="submit"
          >
            Создать
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default UserForm;
