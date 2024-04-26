import { Box, Stack } from "@mui/material";
import React from "react";
import Menu from "./Menu";

const Page = ({
  route,
  children,
}: {
  route: string;
  children: React.ReactNode;
}) => {
  return (
    <Stack direction={"row"} padding={"2%"} spacing={'10%'}>
      <Box>
        <Menu currentRoute={route} />
      </Box>
      <Box>{children}</Box>
    </Stack>
  );
};

export default Page;
