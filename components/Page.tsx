import { Flex, Stack } from "@chakra-ui/react";
import React from "react";
import Menu from "./Menu";
import { LoaderFunctionArgs } from "@remix-run/node";
import { validateModelName } from "../utils/validators";
import { useLoaderData } from "@remix-run/react";

export async function loader({ params }: LoaderFunctionArgs) {
  if (!validateModelName(params.model as string)) {
    throw new Response(null, {
      status: 404,
      statusText: "Похоже на то, что вы не туда зашли.",
    });
  }
  return params.model as string;
}

const Page = ({ children }: { children: React.ReactNode }) => {
  const route = useLoaderData<typeof loader>();

  return (
    <Stack direction={"row"} padding={"2%"}>
      <Flex flex={1}>
        <Menu currentRoute={route} />
      </Flex>
      <Flex flex={3}>{children}</Flex>
    </Stack>
  );
};

export default Page;
