import { MetaFunction } from "@remix-run/node";
import React from "react";
import { Outlet } from "@remix-run/react";
import Page from "../../components/Page";

export const meta: MetaFunction = () => {
  return [{ title: "Посты" }];
};

export default function PostsLayout() {
  return (
    <Page>
      <Outlet />
    </Page>
  );
}
