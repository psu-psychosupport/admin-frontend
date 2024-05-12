import { useFormik } from "formik";
import {
  Box,
  Button,
  colors,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { ETestTypes, ITestForm } from "~/routes/tests.add";
import * as yup from "yup";
import { SelectTestType } from "~/components/testForm/SelectTestType";
import { OptionsForm } from "~/components/testForm/OptionsForm";
import { InputForm } from "~/components/testForm/InputForm";

const validationSchema = yup.object({
  title: yup.string().trim().required("Это поле обязательно к заполнению"),
  validOptionIndex: yup
    .number()
    .optional()
    .min(0, "Необходимо выбрать правильный ответ"),
  validTextInput: yup.string().trim().optional(),
  options: yup
    .array()
    .optional()
    .min(2, "Должно присутствовать как минимум 2 варианта ответа")
    .of(yup.string().trim().required("Вариант ответа не может быть пустым")),
});

const normalizeOptions = (options: string) => {
  return options.split(",");
};

export function TestFormSecond({
  onSubmit,
  test,
}: {
  onSubmit: (payload: ITestForm) => void;
  test?: ITestForm;
}) {
  const formik = useFormik<ITestForm>({
    initialValues: {
      title: test?.title ?? "",
      type: test?.type ?? ETestTypes.OPTIONS,
      options: !test?.options
        ? undefined
        : normalizeOptions(test.options as unknown as string), // mdast конвертирует массив в строку, поэтому конвертируем обратно
      validOptionIndex:
        Number.parseInt(test?.validOptionIndex as unknown as string) ??
        undefined, // То же для числа
      validTextInput: test?.validTextInput ?? undefined,
    },
    onSubmit,
    validationSchema,
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Box
        sx={{
          bgcolor: `primary.card`,
          boxShadow: "0px 0px 7px #638EFF",
          borderRadius: "4px",
          padding: 2,
          marginY: 1,
        }}
      >
        <Stack gap={2}>
          <SelectTestType
            value={formik.values.type}
            onChange={formik.handleChange}
          />
          <TextField
            name={"title"}
            id={"title"}
            label={"Заголовок теста"}
            value={formik.values.title}
            onChange={formik.handleChange}
            error={formik.touched.title && Boolean(formik.errors.title)}
            helperText={formik.touched.title && formik.errors.title}
          />
          {/* formik really can't auto convert number to string wtf? */}
          {Number.parseInt(formik.values.type as unknown as string) ===
          ETestTypes.OPTIONS ? (
            <OptionsForm formik={formik} />
          ) : (
            <InputForm formik={formik} />
          )}

          <Typography color={colors.red["A700"]}>
            {(formik.touched.options && formik.errors.options) ||
              (formik.touched.validOptionIndex &&
                formik.errors.validOptionIndex)}
          </Typography>

          <Stack>
            <Button
              sx={{ marginTop: 4 }}
              color={"primary"}
              variant={"contained"}
              type="submit"
            >
              Сохранить
            </Button>
          </Stack>
        </Stack>
      </Box>
    </form>
  );
}
