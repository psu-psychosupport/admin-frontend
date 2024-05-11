import { apiService } from "../../api/apiService";
import { TestForm } from "~/components/testForm/TestForm";
import { toast } from "react-toastify";
import {useLoaderData, useNavigate} from "@remix-run/react";
import { Box, Typography } from "@mui/material";
import { ITestForm } from "~/routes/tests.add";
import { ActionFunctionArgs, json, LoaderFunctionArgs, redirect } from "@remix-run/node";

export async function loader({ params }: LoaderFunctionArgs) {
  const mediaId = params.mediaId;
  if (!mediaId) return null;
  const res = await apiService.getMedia<ITestForm>(Number.parseInt(mediaId));

  if (res.error) return null;
  return json(res.data);
}

export async function action({request}: ActionFunctionArgs) {
  const payload = await request.json();

  const res = await apiService.updateMedia<ITestForm>(payload.mediaId, payload.data);

  return redirect("/tests/list");
}

export default function EditTestRoute() {
  const media = useLoaderData<typeof loader>();
  const navigate = useNavigate();

  if (!media) return (
    <Box>
      <Typography>Тест не найден</Typography>
    </Box>
  );

  return (
    <Box>
      <Typography variant={"h4"} fontWeight={"800"}>
        Редактирование теста
      </Typography>
      <TestForm mediaId={media.id} test={media.data} />
    </Box>
  );
}
