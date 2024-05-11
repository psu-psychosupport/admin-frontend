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
import { Form, useNavigate } from "@remix-run/react";
import { ActionFunctionArgs, redirect } from "@remix-run/node";
import { sessionStorage } from "~/sessions";

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const email = String(formData.get("email"));
  const password = String(formData.get("password"));

  const session = await sessionStorage.getSession(request.headers.get("cookie"));

  const tokens = await apiService.signIn(email, password);
  session.set("access_token", tokens.data?.access_token);
  session.set("refresh_token", tokens.data?.refresh_token);

  return redirect("/posts/list", {
    headers: {
      "Set-Cookie": await sessionStorage.commitSession(session),
    },
  });
}

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
  // const onSubmit = async ({
  //   email,
  //   password,
  // }: {
  //   email: string;
  //   password: string;
  // }) => {
  //   const res = await apiService.signIn(email, password);
  //   if (res.error) {
  //     await formik.setTouched({ email: true }, false);
  //     formik.setErrors({ email: getErrorMessage(errorCode) });
  //   } else {
  //     navigate("/categories/list");
  //   }
  // };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: () => {
      console.log("SHOULD NEVER BE TRIGGERED");
    },
  });

  return (
    <Container
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <Box sx={{ width: "30vw" }}>
        <Typography variant={"h4"} fontWeight={"800"} sx={{ marginBottom: 2 }}>
          Вход в админ панель
        </Typography>
        <Form method={"POST"}>
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
        </Form>
      </Box>
    </Container>
  );
}
