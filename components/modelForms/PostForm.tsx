import React, { ChangeEvent, useRef, useState } from "react";

import { ClientOnly } from "remix-utils/client-only";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  Stack,
  Button,
  styled,
  colors,
} from "@mui/material";
import { CloudUpload as CloudUploadIcon } from "@mui/icons-material";
import { SelectChangeEvent } from "@mui/material/Select";
import Editor from "../../components/Editor";

import { ICategory, IPost } from "../../api/types/content";
import { IFormPost } from "./types";
import { apiService } from "../../api/apiService";
import { MDXEditorMethods } from "@mdxeditor/editor";
import { toast, ToastContainer } from "react-toastify";

interface INewPost {
  categoryId: number;
  subcategoryId?: number;
}

function SelectCategory({
  categories,
  onSelect,
}: {
  categories: ICategory[];
  onSelect: (data: INewPost) => void;
}) {
  const [category, setCategory] = useState<ICategory>();
  const [subcategory, setSubcategory] = useState<string>();

  const handleChange = (event: SelectChangeEvent) => {
    const $category = categories.find(
      (c) => c.id.toString() === event.target.value,
    );
    setCategory($category);
    if (!$category?.subcategories.length) {
      onSelect({
        categoryId: $category!.id,
      });
    }
  };

  const handleSubcategoryChange = (event: SelectChangeEvent) => {
    setSubcategory(event.target.value);
    onSelect({
      categoryId: category!.id,
      subcategoryId: Number.parseInt(event.target.value),
    });
  };

  return (
    <>
      <FormControl fullWidth>
        <InputLabel id="select-category-label">Категория</InputLabel>
        <Select
          labelId="select-category-label"
          id="select-category"
          value={category ? category.id.toString() : ""}
          label="Категория"
          onChange={handleChange}
        >
          {categories.map((category) => (
            <MenuItem value={category.id.toString()} key={category.id}>
              {category.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {!!category && !!category.subcategories.length && (
        <FormControl fullWidth>
          <InputLabel id="select-subcategory-label">Подкатегория</InputLabel>
          <Select
            labelId="select-subcategory-label"
            id="select-subcategory"
            value={subcategory || ""}
            label="Подкатегория"
            onChange={handleSubcategoryChange}
          >
            {category.subcategories.map((subc) => (
              <MenuItem value={subc.id.toString()} key={subc.id}>
                {subc.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
    </>
  );
}

export default function PostForm({
  categories,
  post,
  onSubmit,
}: {
  categories?: ICategory[];
  post?: IPost;
  onSubmit: (post: IFormPost) => void;
}) {
  const [newPost, setNewPost] = useState<INewPost>();
  const [content, setContent] = useState<string>(post?.content || "");

  const editorRef = useRef<MDXEditorMethods>();

  const submit = () => {
    onSubmit({
      category_id: newPost!.categoryId,
      subcategory_id: newPost!.subcategoryId
        ? newPost?.subcategoryId
        : undefined,
      content,
    });
  };

  const handleCategorySelect = (data: INewPost) => {
    setNewPost(data);
  };

  const transformDocumentToMarkdown = async (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    // TODO: Notify user he could overwrite text + check for existing content
    const file = event.target!.files!.item(0)!;
    const text = await apiService.transformDocument(file);
    setContent(text);
    editorRef.current?.setMarkdown(text);
    toast.success("Текст загружен", { position: "bottom-right" });
  };

  return (
    <Stack sx={{ gap: 4, marginBottom: "5vh" }}>
      {!post && (
        <SelectCategory
          categories={categories!}
          onSelect={handleCategorySelect}
        />
      )}
      {newPost && (
        <>
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              component={"label"}
              role={undefined}
              variant={"contained"}
              startIcon={<CloudUploadIcon />}
            >
              Загрузить текст с файла (.txt, .docx){" "}
              <VisuallyHiddenInput
                type="file"
                accept={".doc,.docx,.txt"}
                onChange={transformDocumentToMarkdown}
              />
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
          Опубликовать
        </Button>
      )}
    </Stack>
  );
}

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});
