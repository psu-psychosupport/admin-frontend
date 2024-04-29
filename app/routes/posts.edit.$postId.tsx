import { json, LoaderFunctionArgs } from "@remix-run/node";
import React from "react";

import CategoryForm from "../../components/modelForms/CategoryForm";
import { apiService } from "../../api/apiService";
import {IFormPost} from "../../components/modelForms/types";
import { useLoaderData } from "@remix-run/react";
import PostForm from "../../components/modelForms/PostForm";

export async function loader({ params }: LoaderFunctionArgs) {
  const post = await apiService.getPost(Number(params.postId as string));

  return json(post);
}

export default function EditPostRoute() {
  const post = useLoaderData<typeof loader>();

  const onFormSubmit = async ($post: IFormPost) => {
    await apiService.updatePost(post.id, $post);
  };

  return <PostForm post={post} onSubmit={onFormSubmit} />;
}
