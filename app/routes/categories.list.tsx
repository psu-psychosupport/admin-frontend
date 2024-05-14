import { ActionFunctionArgs, json } from "@remix-run/node";
import React, { useState } from "react";

import { apiService } from "../../api/apiService";
import { useLoaderData, useNavigate } from "@remix-run/react";
import { Button, Container, Stack, Typography } from "@mui/material";
import { CategoryItem } from "~/components/CategoryItem";
import {
  IUpdateCategory,
  IUpdateSubCategory,
} from "../../components/modelForms/types";
import { Add as AddIcon, Edit as EditIcon } from "@mui/icons-material";

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

export const Header = ({
  isEditingMode,
  onToggle,
}: {
  isEditingMode: boolean;
  onToggle: () => void;
}) => {
  const navigate = useNavigate();

  return (
    <Stack
      justifyContent={"space-between"}
      sx={{ marginBottom: "2%" }}
      direction={"row"}
    >
      <Typography variant={"h4"} fontWeight={"800"}>
        Все категории
      </Typography>
      <Stack alignSelf={"flex-end"} direction={"row"} gap={1}>
        <Button
          variant={"contained"}
          color={"primary"}
          onClick={() => navigate(`/categories/add`)}
          startIcon={<AddIcon />}
        >
          Добавить
        </Button>
        <Button
          variant={"outlined"}
          color={"primary"}
          onClick={onToggle}
          startIcon={<EditIcon />}
        >
          {!isEditingMode ? "Изменить" : "Выйти"}
        </Button>
      </Stack>
    </Stack>
  );
};

export default function CategoriesAddRoute() {
  const categories = useLoaderData<typeof loader>();
  const [isEditingMode, setEditingMode] = useState(false);

  return (
    <Container sx={{ width: "50vw" }} maxWidth={"lg"}>
      <Header
        isEditingMode={isEditingMode}
        onToggle={() => setEditingMode((prev) => !prev)}
      />
      <Stack>
        {categories.map((category) => (
          <CategoryItem
            category={category}
            key={category.id}
            isEditingMode={isEditingMode}
          />
        ))}
      </Stack>
    </Container>
  );
}
