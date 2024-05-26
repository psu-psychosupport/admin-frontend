import React from "react";
import { Typography, Box, Stack, Button } from "@mui/material";
import { apiService } from "../../api/apiService";
import {
  json,
  LoaderFunctionArgs,
  MetaFunction,
  redirect,
} from "@remix-run/node";
import { useLoaderData, useNavigate } from "@remix-run/react";
import { MarkdownViewer } from "mdx-descriptors/src";
import { ClientOnly } from "remix-utils/client-only";

export const meta: MetaFunction = () => {
  return [{ title: "Инструкции" }];
};

export async function loader({ params }: LoaderFunctionArgs) {
  const raw_guideId = params.guideId;

  if (!raw_guideId) {
    throw redirect("/guide");
  }

  const guideId = Number.parseInt(raw_guideId);
  if (Number.isNaN(guideId)) {
    throw redirect("/guide");
  }

  const res = await apiService.getGuideById(guideId);

  return json(res.data);
}

const GuideRoute = () => {
  const guide = useLoaderData<typeof loader>();
  const navigate = useNavigate();

  const onButtonClick = () => {
    navigate(`/guide/edit/${guide.id}`);
  };

  return (
    <Stack gap={4}>
      <Stack justifyContent={"end"}>
        <Button
          variant={"contained"}
          onClick={onButtonClick}
          sx={{ alignSelf: "flex-end" }}
        >
          Редактировать
        </Button>
      </Stack>

      <ClientOnly
        fallback={
          <Box>
            <Typography>Загрузка...</Typography>
          </Box>
        }
      >
        {() => (
          <Box
            sx={{
              borderRadius: "4px",
              width: "100%",
              backgroundColor: "#FFFFFF",
            }}
          >
            <Typography variant={"h4"} fontWeight={"600"} mt={1} ml={1}>
              {guide.name}
            </Typography>

            <MarkdownViewer content={guide.content} />
          </Box>
        )}
      </ClientOnly>
    </Stack>
  );
};

export default GuideRoute;
