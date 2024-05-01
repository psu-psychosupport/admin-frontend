import { useFormik } from "formik";
import * as yup from "yup";
import {
  Box,
  Button,
  Container,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { apiService } from "../../api/apiService";
import { useNavigate } from "@remix-run/react";

const validationSchema = yup.object({
  email: yup
    .string()
    .email("Введите корректную почту")
    .required("Почта обязательна к заполнению"),
  password: yup
    .string()
    .min(8, "Длина пароля должна быть как минимум из 8 символов")
    .required("Пароль обязателен к заполнению"),
});

export default function SignInRoute() {
  const navigate = useNavigate();
  const onSubmit = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    const error = await apiService.signIn(email, password);
    console.log(error);
    if (error) {
      await formik.setTouched({ email: true }, false);
      formik.setErrors({ email: error });
    } else {
      console.log("[AUTH] Authorized");
      navigate("/categories/list");
    }
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit,
  });

  return (
    <Container
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <Box sx={{ width: "30vw" }}>
        <Typography variant={"h4"} fontWeight={"800"} sx={{ marginBottom: 2 }}>
          Вход в админ панель
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <Stack spacing={2}>
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
              autoComplete={"current-password"}
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />

            <Button
              sx={{ marginTop: 4 }}
              color={"primary"}
              variant={"contained"}
              type="submit"
            >
              Войти
            </Button>
          </Stack>
        </form>
      </Box>
    </Container>
  );
}
