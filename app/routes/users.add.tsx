import React from "react";

import { apiService } from "../../api/apiService";
import UserForm from "../../components/modelForms/UserForm";
import { ActionFunctionArgs, redirect } from "@remix-run/node";

export async function action({ request }: ActionFunctionArgs) {
  const data = await request.json();
  const { user } = data;
  await apiService.createUser(user);
  return redirect("/users/list");
}

export default function CategoriesAddRoute() {
  return <UserForm />;
}
