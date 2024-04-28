import React from "react";

import { apiService } from "../../api/apiService";
import { IUserForm } from "../../components/modelForms/types";
import UserForm from "../../components/modelForms/UserForm";

export default function CategoriesAddRoute() {
  const onFormSubmit = async (user: IUserForm) => {
    await apiService.createUser(user);
  };

  return <UserForm onSubmit={onFormSubmit} />;
}
