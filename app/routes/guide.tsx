import React from "react";
import Page from "components/Page";
import { Outlet } from "@remix-run/react";
import { Container } from "@mui/material";
import {MetaFunction} from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [{ title: "Инструкции" }];
};


const GuideRoute = () => {
  return (
    <Page route={"guide"}>
      <Container sx={{ width: "50vw" }}>
        <Outlet />
      </Container>
    </Page>
  );
};

export default GuideRoute;
