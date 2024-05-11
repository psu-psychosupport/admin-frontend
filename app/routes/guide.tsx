import React from "react";
import { Typography, Box } from "@mui/material";

import Page from "components/Page";

const GuideRoute = () => {
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
