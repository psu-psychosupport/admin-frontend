import React from "react";

import CategoryForm from "../../components/modelForms/CategoryForm";
import { apiService } from "../../api/apiService";
import { ICategoryForm } from "../../components/modelForms/types";

export default function CategoriesAddRoute() {
  const onFormSubmit = async (category: ICategoryForm) => {
    await apiService.createCategory(category);
  };

  return <CategoryForm onSubmit={onFormSubmit} />;
}
