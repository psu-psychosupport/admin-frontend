import { Box, Stack, Typography, Container } from "@mui/material";
import { Link } from "@remix-run/react";
import React from "react";

interface IRoute {
  name: string;
  href: string;
  locale: string;
}

const routes: IRoute[] = [
  {
    name: "posts",
    href: "/panel/posts",
    locale: "Посты",
  },
  {
    name: "categories",
    href: "/panel/categories",
    locale: "Категории",
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
  {
    name: "users",
    href: "/panel/users",
    locale: "Пользователи",
  },
];

const Menu = ({ currentRoute }: { currentRoute?: string }) => {
  console.log(currentRoute);
  return (
    <Container fixed>
      <Stack>
        {routes.map((route) => (
          <Box
            sx={{
              backgroundColor:
                currentRoute && currentRoute === route.name
                  ? "#9c9c9c"
                  : undefined,
              borderRadius:
                currentRoute && currentRoute === route.name ? "6px" : undefined,
            }}
            key={route.name}
          >
            <Link
              to={route.href}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <Typography
                sx={{ margin: "6px" }}
                fontWeight={500}
                fontSize={"large"}
              >
                {route.locale}
              </Typography>
            </Link>
          </Box>
        ))}
      </Stack>
    </Container>
  );
};

export default Menu;
