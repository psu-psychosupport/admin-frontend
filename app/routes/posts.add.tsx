import {json, MetaFunction} from "@remix-run/node";
import "@mdxeditor/editor/style.css";
import React from "react";

import PostForm from "../../components/modelForms/PostForm";
import {IFormPost} from "../../components/modelForms/types";
import {apiService} from "../../api/apiService";
import {useLoaderData} from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [{ title: "Посты" }];
};

export async function loader() {
  console.log("loader");
  const categories = await apiService.getCategories();
  return json(categories);
}

export default function PanelCreatePostRoute() {
  const categories = useLoaderData<typeof loader>();

  const onFormSubmit = async (post: IFormPost) => {
    await apiService.createPost(post);
  };

  return <PostForm categories={categories} onSubmit={onFormSubmit} />;
}
