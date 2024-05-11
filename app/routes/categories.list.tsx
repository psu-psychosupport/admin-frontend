import { ActionFunctionArgs, json } from "@remix-run/node";
import React from "react";

import { apiService } from "../../api/apiService";
import { useLoaderData } from "@remix-run/react";
import { Container, Stack } from "@mui/material";
import { TableHeader } from "../../components/ModelTable";
import { CategoryItem } from "~/components/CategoryItem";
import {
  IUpdateCategory,
  IUpdateSubCategory,
} from "../../components/modelForms/types";

export async function loader() {
  const res = await apiService.getCategories();
  if (res.error) return json([]);
  return json(res.data);
}

export async function action({ request }: ActionFunctionArgs) {
  const data = await request.json();
  const goal = data.goal;

  let response;

  if (goal === "delete-category") {
    const categoryId = Number(data.categoryId);
    response = await apiService.deleteCategory(categoryId);
  } else if (goal === "edit-category") {
    const categoryId = Number(data.categoryId);
    const categoryUpdate: IUpdateCategory = data.categoryUpdate;
    response = await apiService.updateCategory(categoryId, categoryUpdate);
  } else if (goal === "delete-subcategory") {
    const subcategoryId = Number(data.subcategoryId);
    response = await apiService.deleteSubcategory(subcategoryId);
  } else if (goal === "edit-subcategory") {
    const subcategoryId = Number(data.subcategoryId);
    const subcategoryUpdate: IUpdateSubCategory = data.subcategoryUpdate;
    response = await apiService.updateSubcategory(
      subcategoryId,
      subcategoryUpdate,
    );
  } else if (goal === "add-subcategory") {
    const subcategory = data.subcategory;
    await apiService.createSubcategory(subcategory);
  }

  if (response?.error) {
  }

  return null;
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
