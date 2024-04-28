import type { MetaFunction } from "@remix-run/node";
import "@mdxeditor/editor/style.css";
import React from "react";

import PostForm from "../../components/modelForms/PostForm";

export const meta: MetaFunction = () => {
  return [{ title: "Посты" }];
};

export default function PanelCreatePostRoute() {
  return <PostForm />;
}
