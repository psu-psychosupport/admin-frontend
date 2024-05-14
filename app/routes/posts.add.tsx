import {
  ActionFunctionArgs,
  json,
  LoaderFunctionArgs,
  MetaFunction,
} from "@remix-run/node";
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

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const category_id = url.searchParams.get("category_id");
  const subcategory_id = url.searchParams.get("subcategory_id");

  if (subcategory_id) {
    const res = await apiService.getSubcategory(
      Number.parseInt(subcategory_id),
    );
    if (res.data)
      return json({
        category: res.data.category,
        subcategory: res.data,
      });
  } else if (category_id) {
    const res = await apiService.getCategory(Number.parseInt(category_id));
    if (res.data) {
      return json({
        category: res.data,
      });
    }
  }

  return {};
}

export async function action({ request }: ActionFunctionArgs) {
  return await postAction(request);
}

export default function PanelCreatePostRoute() {
  const { category, subcategory } = useLoaderData<typeof loader>();

  return (
    <Container sx={{ width: "100%" }}>
      <Typography variant={"h4"} fontWeight={"800"}>
        Добавление нового поста
      </Typography>
      <PostForm category={category} subcategory={subcategory} />
    </Container>
  );
}
