import { apiService } from "../../api/apiService";
import { TestForm } from "~/components/testForm/TestForm";
import { toast } from "react-toastify";
import { useNavigate } from "@remix-run/react";
import { Box, Typography } from "@mui/material";
import { MediaTypes } from "../../api/types/enums";
import {ActionFunctionArgs, redirect} from "@remix-run/node";

export enum ETestTypes {
  OPTIONS,
  INPUT,
}

export interface ITestForm {
  title: string;
  type: ETestTypes.OPTIONS;
  options?: string[];
  validOptionIndex?: number;
  validTextInput?: string;
}

export async function action({ request }: ActionFunctionArgs) {
  const payload = await request.json();

  const res = await apiService.uploadMedia({
    data: payload,
  });

  return redirect("/tests/list");
}

export default function AddTestRoute() {

  return (
    <Box>
      <Typography variant={"h4"} fontWeight={"800"}>
        Добавление теста
      </Typography>
      <TestForm />
    </Box>
  );
}
