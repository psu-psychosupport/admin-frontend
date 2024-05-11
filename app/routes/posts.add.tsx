import { ActionFunctionArgs, json, MetaFunction } from "@remix-run/node";
import "@mdxeditor/editor/style.css";
import React from "react";

import PostForm from "../../components/modelForms/PostForm";
import { apiService } from "../../api/apiService";
import { useLoaderData } from "@remix-run/react";
import { Container, Typography } from "@mui/material";
import postAction from "~/actions/post";

export const meta: MetaFunction = () => {
  return [{ title: "Посты" }];
};

export async function loader() {
  const res = await apiService.getCategories();
  if (res.error) return json([]);
  return json(res.data);
}

export async function action({ request }: ActionFunctionArgs) {
  return await postAction(request);
}

export default function PanelCreatePostRoute() {
  const categories = useLoaderData<typeof loader>();

  if (!categories || !categories.length) {
    return <Typography variant={"h2"}>Нет доступных категорий</Typography>;
  }
  return (
    <Container sx={{ width: "100%" }}>
      <Typography variant={"h4"} fontWeight={"800"}>
        Добавление нового поста
      </Typography>
      <PostForm categories={categories} />
    </Container>
  );
}
