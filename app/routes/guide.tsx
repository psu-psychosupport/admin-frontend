import React, {useEffect} from "react";
import { Typography, Box } from "@mui/material";

import Page from "components/Page";
import {useFetcher} from "@remix-run/react";

const GuideRoute = () => {
  const fetcher = useFetcher();

  useEffect(() => {
    fetcher.load("/tests/list");
  }, []);

  useEffect(() => {
    console.log("TEST LIST", fetcher.data);
  }, [fetcher.data]);

  return (
    <Page>
      <Box>
        <Typography variant="h3">Как добавить схему?</Typography>
        <Typography variant="body1">
          Добавление схемы возможно при помощи вставки изображения самой схемы
        </Typography>
      </Box>
    </Page>
  );
};

export default GuideRoute;
