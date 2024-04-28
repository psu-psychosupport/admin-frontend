import { json, redirect } from "@remix-run/node";
import React from "react";

import { apiService } from "../../api/apiService";
import { useLoaderData } from "@remix-run/react";
import ModelTable from "../../components/ModelTable";

export async function loader() {
  const categories = await apiService.getCategories();
  return json(categories);
}

export default function CategoriesAddRoute() {
  const categories = useLoaderData<typeof loader>();

  return (
    <ModelTable
      showHeader
      headerRoute={"categories"}
      headerTitle={"Категории"}
      columnTitles={columnTitles}
      columnKeys={columnKeys}
      data={categories}
      onRequestEdit={(category) => {
        redirect(`/categories/${category.id}`);
      }}
    />
  );
}

const columnTitles = ["Id", "Название"];
const columnKeys = ["id", "name"];
