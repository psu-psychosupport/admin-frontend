import React, { ChangeEvent, useEffect, useRef, useState } from "react";

import { ClientOnly } from "remix-utils/client-only";
import { Box, Button, colors, Stack, Typography } from "@mui/material";
import { CloudUpload as CloudUploadIcon } from "@mui/icons-material";
import Editor from "../../components/Editor";

import { ICategory, IPost } from "../../api/types/content";
import { MDXEditorMethods } from "@mdxeditor/editor";
import { toast } from "react-toastify";
import { useFetcher } from "@remix-run/react";
import { ISelectPost, SelectCategory } from "./SelectCategory";
import { ShowPostInfo } from "./ShowPostInfo";
import { ConfirmDocumentInsertModal } from "./ConfirmDocumentInsertModal";
import { InputDocumentFile } from "./InputDocumentFile";

interface IActionResponse {
  goal: "category-select" | "convert-document";
  postFound?: IPost;
  text?: string;
}

export default function PostForm({
  categories,
  post,
}: {
  categories?: ICategory[];
  post?: IPost;
}) {
  const fetcher = useFetcher();

  const [newPostPayload, setNewPostPayload] = useState<ISelectPost>();
  const [content, setContent] = useState<string>(post?.content || "");
  const [modalIsOpened, setModalOpened] = useState(false);
  const [modalIsShowed, setModalIsShowed] = useState(false);
  const editorRef = useRef<MDXEditorMethods>();

  useEffect(() => {
    if (!fetcher.data) {
      return;
    }
    const data = fetcher.data as IActionResponse;
    const { goal } = data;

    if (goal === "convert-document") {
      const text = data.text!;
      setContent(text);
      editorRef.current?.setMarkdown(text);
      toast.success("Текст загружен", { position: "bottom-right" });
    } else if (goal === "category-select" && data.postFound) {
      const $post = data.postFound!;
      setContent($post.content);
      editorRef.current!.setMarkdown($post.content);
    }
  }, [fetcher.data]);

  const submit = () => {
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
          category_id: newPostPayload!.categoryId,
          subcategory_id: newPostPayload!.subcategoryId
            ? newPostPayload?.subcategoryId
            : undefined,
          content,
        },
      };
    }

    fetcher.submit(payload, { method: "POST", encType: "application/json" });
  };

  const handleCategorySelect = async (data: ISelectPost) => {
    fetcher.submit(
      // @ts-ignore
      {
        goal: "category-select",
        post: data,
      },
      { method: "POST", encType: "application/json" },
    );
    setNewPostPayload(data);
  };

  const selectDocumentFile = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target!.files!.item(0)!;
    const formData = new FormData();
    formData.append("file", file);
    formData.append("goal", "convert-document");
    fetcher.submit(formData, {
      method: "POST",
      encType: "multipart/form-data",
    });
  };

  const closeModal = () => {
    setModalIsShowed(true);
    setModalOpened(false);
  };

  return (
    <Stack sx={{ gap: 2, marginY: "5vh" }}>
      {!post && (
        <SelectCategory
          categories={categories!}
          onSelect={handleCategorySelect}
        />
      )}
      {post && <ShowPostInfo post={post} />}
      {(post || newPostPayload) && (
        <>
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
