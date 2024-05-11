import React from "react";

import CategoryForm from "../../components/modelForms/CategoryForm";
import { apiService } from "../../api/apiService";
import { ICategoryForm } from "../../components/modelForms/types";
import { ActionFunctionArgs, redirect } from "@remix-run/node";

export async function action({ request }: ActionFunctionArgs) {
  const data = await request.json();
  const category = data.category as ICategoryForm;
  const res = await apiService.createCategory(category);

  return redirect("/categories/list");
}

export default function CategoriesAddRoute() {
  return <CategoryForm />;
}
