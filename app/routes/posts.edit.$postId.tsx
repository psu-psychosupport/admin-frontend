import {
  ActionFunctionArgs,
  json,
  LoaderFunctionArgs,
} from "@remix-run/node";
import React from "react";

import { apiService } from "../../api/apiService";
import { useLoaderData } from "@remix-run/react";
import PostForm from "../../components/modelForms/PostForm";
import { Container, Typography } from "@mui/material";
import postAction from "~/actions/post";

export async function loader({ params }: LoaderFunctionArgs) {
  const res = (await apiService.getPost({
    postId: Number(params.postId as string),
  }))!;
  if (res.error) return null;
  return json(res.data);
}

export async function action({ request }: ActionFunctionArgs) {
  return await postAction(request);
}

export default function EditPostRoute() {
  const post = useLoaderData<typeof loader>();

  if (post === null)
    return (
      <Container sx={{ width: "100%" }}>
        <Typography variant={"h4"} fontWeight={"800"}>
          Пост не найден
        </Typography>
      </Container>
    );

  return (
    <Container sx={{ width: "100%" }}>
      <Typography variant={"h4"} fontWeight={"800"}>
        Редактирование поста
      </Typography>
      <PostForm post={post} />
    </Container>
  );
}
