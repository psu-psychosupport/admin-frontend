import {
  Box,
  Stack,
  Input,
  Text,
  Checkbox,
  FormControl,
  FormLabel,
  Heading,
  Button,
} from "@chakra-ui/react";
import { ICreateUser } from "./types";
import { Field, Form, Formik } from "formik";

const CreateUserForm = ({
  onSubmit,
}: {
  onSubmit: (payload: ICreateUser) => void;
}) => {
  return (
    <Box>
      <Heading>Создание пользователя</Heading>
      <Formik
        initialValues={{}}
        onSubmit={(data) => {
          console.log(data);
        }}
      >
        {(props) => (
          <Form>
            <Field name={"name"} >
              {(field, form) => (
                <FormControl>
                  <FormLabel>Имя</FormLabel>
                  <Input {...field} placeholder={"Иванов Иван"} />
                </FormControl>
              )}
            </Field>

            <Field name={"email"} >
              {(field, form) => (
                <FormControl>
                  <FormLabel>Электронная почта</FormLabel>
                  <Input
                    {...field}
                    placeholder={"ivanov@domain.com"}
                    type={"email"}
                  />
                </FormControl>
              )}
            </Field>

            <Field name={"password"} >
              {(field, form) => (
                <FormControl>
                  <FormLabel>Пароль</FormLabel>
                  <Input
                    {...field}
                    placeholder={"mysecretpassword"}
                    type={"password"}
                    autoComplete={"new-password"}
                  />
                </FormControl>
              )}
            </Field>
            <Button
              mt={4}
              colorScheme="messenger"
              isLoading={props.isSubmitting}
              type="submit"
            >
              Создать
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default CreateUserForm;
