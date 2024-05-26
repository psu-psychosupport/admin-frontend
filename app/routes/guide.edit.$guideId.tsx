import { MarkdownEditor } from "mdx-descriptors/src";
import { ClientOnly } from "remix-utils/client-only";
import React, { useState } from "react";
import {
  Typography,
  Box,
  Stack,
  Button,
  colors,
  TextField,
} from "@mui/material";
import {
  ActionFunctionArgs,
  json,
  LoaderFunctionArgs,
  MetaFunction,
  redirect,
} from "@remix-run/node";
import useFetcherAsync from "~/hooks/useFetcherAsync";
import { IApiResponse } from "../../api/httpClient";
import { toast } from "react-toastify";
import { useLoaderData, useNavigate } from "@remix-run/react";
import guideAction from "~/actions/guide";
import { apiService } from "../../api/apiService";

export const meta: MetaFunction = () => {
  return [{ title: "Добавление инструкции" }];
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

  if (!res.data) {
    throw redirect("/guide");
  }

  return json(res.data);
}

export async function action({ request }: ActionFunctionArgs) {
  return await guideAction(request);
}

const GuideEditRoute = () => {
  const guide = useLoaderData<typeof loader>();
  const fetcher = useFetcherAsync();
  const navigate = useNavigate();

  const [name, setName] = useState(guide.name);
  const [content, setContent] = useState(guide.content);

  const uploadImage = async (image: File) => {
    const formData = new FormData();
    formData.append("goal", "insert-image");
    formData.append("file", image);

    const data = await fetcher.submit(formData, {
      method: "POST",
      encType: "multipart/form-data",
    });

    return data!.url;
  };

  const updateGuide = async () => {
    const res: IApiResponse<null> = await fetcher.submit(
      {
        goal: "update-guide",
        guideId: guide.id,
        guide: { name, content },
      },
      { method: "POST", encType: "application/json" },
    );

    if (!res.error) {
      toast.success("Сохранено!");
      navigate("/guide");
    }
  };

  const deleteGuide = async () => {
    const res = await fetcher.submit(
      { goal: "delete-guide", guideId: guide.id },
      { method: "POST", encType: "application/json" },
    );
    if (!res.error) {
      toast.success("Инструкция удалена!");
      navigate("/guide");
    }
  };

  return (
    <Stack gap={4} mb={2}>
      <Stack direction={"row"} justifyContent={"space-between"}>
        <Typography variant={"h4"} fontWeight={"800"}>
          Редактирование инструкции
        </Typography>
        <Button color={"error"} variant={"contained"} onClick={deleteGuide}>
          Удалить
        </Button>
      </Stack>

      <Box p={1} bgcolor={"white"} borderRadius={"4px"}>
        <TextField
          label={"Название инструкции"}
          fullWidth
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
      </Box>

      <ClientOnly
        fallback={
          <Box>
            <Typography>Загрузка редактора...</Typography>
          </Box>
        }
      >
        {() => (
          <>
            <Typography variant={"h5"} fontWeight={"600"}>
              Содержимое инструкции
            </Typography>
            <Box
              sx={{
                borderWidth: 2,
                borderColor: colors.grey[200],
                borderStyle: "solid",
                borderRadius: "4px",
                width: "100%",
                backgroundColor: "#FFFFFF",
              }}
            >
              <MarkdownEditor
                content={content}
                onContentChange={setContent}
                onImageUpload={uploadImage}
              />
            </Box>
          </>
        )}
      </ClientOnly>
      {name && content && (
        <Button variant={"contained"} onClick={updateGuide}>
          Сохранить
        </Button>
      )}
    </Stack>
  );
};

export default GuideEditRoute;
