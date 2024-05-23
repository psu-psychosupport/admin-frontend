import React, { useEffect } from "react";
import {
  Typography,
  Box,
  List,
  ListItem,
  Stack,
  Link,
  Container,
} from "@mui/material";

import Page from "components/Page";

const GuideRoute = () => {
  return (
    <Page route={"guide"}>
      <Container sx={{ width: "70vw" }}>
        <Stack>
          <Box sx={{ backgroundColor: "#FFFFFF", borderRadius: "4px", p: 1 }}>
            <Typography variant="h4" fontWeight={"500"}>
              Как добавить схему (диаграмму)?
            </Typography>
            <Typography fontSize={18}>
              Добавление схемы возможно при помощи вставки изображения самой
              схемы из различных ресурсов, которые предоставляют возможность
              создавать их.
            </Typography>
            <Typography fontSize={18} fontWeight={"500"}>
              Список ресурсов:
            </Typography>

            <List>
              <ListItem>
                <Link href="https://diagrams.net">Сайт diagrams.net</Link>
              </ListItem>
            </List>
          </Box>
        </Stack>
      </Container>
    </Page>
  );
};

export default GuideRoute;
