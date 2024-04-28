import React, { useState } from "react";

import { ClientOnly } from "remix-utils/client-only";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";

import { SelectChangeEvent } from "@mui/material/Select";
import Editor from "../../components/Editor";

import { IPost } from "../../api/types/content";
import { apiService } from "../../api/apiService";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

export async function loader() {
  console.log("loader");
  const categories = await apiService.getCategories();
  return json(categories);
}

export default function PostForm({ post }: { post?: IPost }) {
  const categories = useLoaderData<typeof loader>();

  const [category, setCategory] = useState("");
  const [content, setContent] = useState<string>(post?.content || "");

  const handleChange = (event: SelectChangeEvent) => {
    setCategory(event.target.value as string);
  };

  return (
    <Box>
      <FormControl fullWidth>
        <InputLabel id="select-category-label">Категория</InputLabel>
        <Select
          labelId="select-category-label"
          id="select-category"
          value={category?.toString()}
          label="Категоия"
          onChange={handleChange}
        >
          {categories.map((category) => (
            <MenuItem value={category.id} key={category.id}>
              {category.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <ClientOnly
        fallback={
          <Box>
            <Typography>Загрузка редактора...</Typography>
          </Box>
        }
      >
        {() => (
          <Box sx={{ borderWidth: 2, width: "800px" }}>
            <Editor content={content} onContentChange={setContent} />
          </Box>
        )}
      </ClientOnly>
      );
    </Box>
  );
}
