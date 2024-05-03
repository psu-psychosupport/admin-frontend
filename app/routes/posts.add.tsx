import { json, MetaFunction } from "@remix-run/node";
import "@mdxeditor/editor/style.css";
import React from "react";

import PostForm from "../../components/modelForms/PostForm";
import { IFormPost } from "../../components/modelForms/types";
import { apiService } from "../../api/apiService";
import { useLoaderData } from "@remix-run/react";
import { Button, Container, Typography } from "@mui/material";

export const meta: MetaFunction = () => {
  return [{ title: "Посты" }];
};

export async function loader() {
  const categories = await apiService.getCategories();
  return json(categories);
}

export default function PanelCreatePostRoute() {
  const categories = useLoaderData<typeof loader>();

  const onFormSubmit = async (post: IFormPost) => {
    await apiService.createPost(post);
  };

  if (!categories || !categories.length) {
    return <Typography variant={"h2"}>Нет доступных категорий</Typography>;
  }

  return (
    <Container sx={{ width: "100%" }}>
      <Container sx={{ flexDirection: "row", marginBottom: '2vh' }}>
        <Typography variant={"h4"}>Добавление нового поста</Typography>
      </Container>
      <PostForm categories={categories} onSubmit={onFormSubmit} />
    </Container>
  );
}
