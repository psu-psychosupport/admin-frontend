import React, { ChangeEvent, useRef, useState } from "react";

import { ClientOnly } from "remix-utils/client-only";
import { Box, Button, colors, Stack, Typography } from "@mui/material";
import { CloudUpload as CloudUploadIcon } from "@mui/icons-material";
import Editor from "../../components/Editor";

import { ICategory, IPost, ISubCategory } from "../../api/types/content";
import { MDXEditorMethods } from "@mdxeditor/editor";
import { toast } from "react-toastify";
import { ShowPostInfo } from "./ShowPostInfo";
import { ConfirmDocumentInsertModal } from "./ConfirmDocumentInsertModal";
import { InputDocumentFile } from "./InputDocumentFile";
import useFetcherAsync from "~/hooks/useFetcherAsync";
import { IApiResponse } from "../../api/httpClient";

interface IActionResponse {
  goal: "category-select" | "convert-document";
  postFound?: IPost;
  text?: string;
}

export default function PostForm({
  category,
  subcategory,
  post,
}: {
  category?: ICategory;
  subcategory?: ISubCategory;
  post?: IPost;
}) {
  const fetcher = useFetcherAsync<IApiResponse<any>>();

  const [content, setContent] = useState<string>(post?.content || "");
  const [modalIsOpened, setModalOpened] = useState(false);
  const [modalIsShowed, setModalIsShowed] = useState(false);
  const editorRef = useRef<MDXEditorMethods>();

  const submit = async () => {
    let payload;

    if (post) {
      payload = {
        goal: "edit-post",
        postId: post.id,
        post: {
          content,
        },
      };
    } else {
      payload = {
        goal: "add-post",
        post: {
          category_id: category!.id,
          subcategory_id: subcategory?.id,
          content,
        },
      };
    }

    const res = await fetcher.submit(payload, {
      method: "POST",
      encType: "application/json",
    });
    if (res?.error) {
      toast.error(res.error.message);
    } else {
      toast.success("Сохранено!");
    }
  };

  const selectDocumentFile = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target!.files!.item(0)!;
    const formData = new FormData();
    formData.append("file", file);
    formData.append("goal", "convert-document");
    const res: IApiResponse<string> = await fetcher.submit(formData, {
      method: "POST",
      encType: "multipart/form-data",
    });
    if (res.error) {
      toast.error(res.error.message);
      return;
    }
    const text = res.data!;
    setContent(text);
    editorRef.current?.setMarkdown(text);
    toast.success("Текст загружен");
  };

  const closeModal = () => {
    setModalIsShowed(true);
    setModalOpened(false);
  };

  return (
    <Stack sx={{ gap: 2, marginY: "5vh" }}>
      {(post || category || subcategory) && (
        <>
          <ShowPostInfo
            post={post}
            category={category}
            subcategory={subcategory}
          />
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              component={"label"}
              role={undefined}
              variant={"contained"}
              startIcon={<CloudUploadIcon />}
              onClick={
                !!content && !modalIsShowed
                  ? () => setModalOpened(true)
                  : undefined
              }
            >
              Загрузить текст с файла (.txt, .docx)
              {(!content || modalIsShowed) && (
                <InputDocumentFile onChange={selectDocumentFile} />
              )}
            </Button>
          </Box>

          <ClientOnly
            fallback={
              <Box>
                <Typography>Загрузка редактора...</Typography>
              </Box>
            }
          >
            {() => (
              <Box
                sx={{
                  borderWidth: 2,
                  borderColor: colors.grey[200],
                  borderStyle: "solid",
                  borderRadius: 4,
                  width: "100%",
                }}
              >
                <Editor
                  ref={editorRef}
                  content={content}
                  onContentChange={setContent}
                />
              </Box>
            )}
          </ClientOnly>
        </>
      )}

      {!!content.length && (
        <Button onClick={submit} variant={"contained"}>
          {post ? "Сохранить" : "Опубликовать"}
        </Button>
      )}
      <ConfirmDocumentInsertModal isOpen={modalIsOpened} onClose={closeModal} />
    </Stack>
  );
}
