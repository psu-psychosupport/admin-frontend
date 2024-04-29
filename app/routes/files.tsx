import { MetaFunction } from "@remix-run/node";
import React from "react";
import { Outlet } from "@remix-run/react";
import Page from "../../components/Page";

export const meta: MetaFunction = () => {
  return [{ title: "Медиа файлы" }];
};

export default function MediaFilesLayout() {
  return (
    <Page>
      <Outlet />
    </Page>
  );
}
