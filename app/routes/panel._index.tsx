import type { MetaFunction } from "@remix-run/node";
import React from "react";
import Page from "../../components/Page";
import { Typography } from "@mui/material";
import { Outlet } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [{ title: "Панель управления" }];
};

export default function Index() {
  return (
    <Page>
      <Typography>abobus</Typography>
      <Outlet />
    </Page>
  );
}
