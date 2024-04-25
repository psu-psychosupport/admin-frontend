import { Box, Flex, Text } from "@chakra-ui/react";
import { Link } from "@remix-run/react";
import React from "react";

const Header = () => {
  return (
    <Flex
      // as={"nav"}
      h={"72px"}
      align={"center"}
      justify={"end"}
    >
      {/* Heading component has incorrect styles, so we can't use them lmao */}
      <Link to={""} style={{ padding: "2%" }}>
        <Text fontSize={"20px"} fontWeight={"500"}>
          Основной сайт
        </Text>
      </Link>
    </Flex>
  );
};

export default Header;
