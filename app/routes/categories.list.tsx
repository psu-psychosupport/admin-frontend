import { json } from "@remix-run/node";
import React from "react";

import { apiService } from "../../api/apiService";
import { useLoaderData } from "@remix-run/react";
import { Container, Stack } from "@mui/material";
import { TableHeader } from "../../components/ModelTable";
import { CategoryItem } from "~/components/CategoryItem";

export async function loader() {
  const categories = await apiService.getCategories();
  return json(categories);
}

export default function CategoriesAddRoute() {
  const categories = useLoaderData<typeof loader>();

  return (
    <Container sx={{ width: "50vw" }} maxWidth={"lg"}>
      <TableHeader route={"categories"} title={"Категории"} />
      <Stack>
        {categories.map((category) => (
          <CategoryItem category={category} key={category.id} />
        ))}
      </Stack>
    </Container>
  );
}
