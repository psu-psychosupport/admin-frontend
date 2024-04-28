import { json, LoaderFunctionArgs } from "@remix-run/node";
import React from "react";

import CategoryForm from "../../components/modelForms/CategoryForm";
import { apiService } from "../../api/apiService";
import { ICategoryForm } from "../../components/modelForms/types";
import { useLoaderData } from "@remix-run/react";

export async function loader({ params }: LoaderFunctionArgs) {
  const category = await apiService.getCategory(
    Number(params.categoryId as string),
  );

  return json(category);
}

export default function CategoriesAddRoute() {
  const category = useLoaderData<typeof loader>();

  const onFormSubmit = async (categoryForm: ICategoryForm) => {
    await apiService.updateCategory(category.id, categoryForm );
  };

  return <CategoryForm category={category} onSubmit={onFormSubmit} />;
}
