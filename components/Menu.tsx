import { Box, Stack, Text } from "@chakra-ui/react";
import { Link } from "@remix-run/react";
import React from "react";

interface IRoute {
  name: string;
  href: string;
  locale: string;
}

const routes: IRoute[] = [
  {
    name: "users",
    href: "/panel/users",
    locale: "Пользователи",
  },
  {
    name: "categories",
    href: "/panel/categories",
    locale: "Категории",
  },
  {
    name: "posts",
    href: "/panel/posts",
    locale: "Посты",
  },
  {
    name: "diagrams",
    href: "/panel/diagrams",
    locale: "Схемы",
  },
  {
    name: "tests",
    href: "/panel/tests",
    locale: "Тесты",
  },
  {
    name: "files",
    href: "/panel/files",
    locale: "Загруженные файлы",
  },
];

const Menu = ({ currentRoute }: { currentRoute?: string }) => {
  return (
    <Box position={"fixed"}>
      <Stack fontWeight={500} fontSize={"large"}>
        {routes.map((route) => (
          <Box
            bgColor={
              currentRoute && currentRoute === route.name
                ? "gray.100"
                : undefined
            }
            borderRadius={
              currentRoute && currentRoute === route.name ? "6px" : undefined
            }
            key={route.name}
          >
            <Link to={route.href}>
              <Text style={{ margin: "6px" }}>{route.locale}</Text>
            </Link>
          </Box>
        ))}
      </Stack>
    </Box>
  );
};

export default Menu;
