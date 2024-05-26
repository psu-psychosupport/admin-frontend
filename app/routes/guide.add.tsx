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
import { ActionFunctionArgs, MetaFunction } from "@remix-run/node";
import useFetcherAsync from "~/hooks/useFetcherAsync";
import { IApiResponse } from "../../api/httpClient";
import { toast } from "react-toastify";
import { useNavigate } from "@remix-run/react";
import guideAction from "~/actions/guide";

export const meta: MetaFunction = () => {
  return [{ title: "Добавление инструкции" }];
};

export async function action({ request }: ActionFunctionArgs) {
  return await guideAction(request);
}

const GuideAddRoute = () => {
  const fetcher = useFetcherAsync();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [content, setContent] = useState("");

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

  const addGuide = async () => {
    const res: IApiResponse<null> = await fetcher.submit(
      {
        goal: "add-guide",
        guide: { name, content },
      },
      { method: "POST", encType: "application/json" },
    );

    if (!res.error) {
      toast.success("Сохранено!");
      navigate("/guide");
    }
  };

  return (
    <Stack gap={4} mb={2}>
      <Typography variant={"h4"} fontWeight={"800"}>
        Добавление инструкции
      </Typography>

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
        <Button variant={"contained"} onClick={addGuide}>
          Сохранить
        </Button>
      )}
    </Stack>
  );
};

export default GuideAddRoute;
