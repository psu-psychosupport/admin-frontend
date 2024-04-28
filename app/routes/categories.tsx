import type { MetaFunction } from "@remix-run/node";
import React from "react";

import { Outlet } from "@remix-run/react";
import Page from "../../components/Page";

export const meta: MetaFunction = () => {
  return [{ title: "Категории" }];
};

export default function CategoriesLayout() {
  return (
    <Page>
      <Outlet />
    </Page>
  );
}
