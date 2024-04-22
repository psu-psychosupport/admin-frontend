import type { MetaFunction } from "@remix-run/node";
import React from "react";
import { Box, Text } from "@chakra-ui/react";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <Box m={2}>
      <Text>hellow</Text>
    </Box>
  );
}
