import { json, LoaderFunctionArgs } from "@remix-run/node";
import React from "react";

import { apiService } from "../../api/apiService";
import { IUserForm } from "../../components/modelForms/types";
import UserForm from "../../components/modelForms/UserForm";
import { useLoaderData } from "@remix-run/react";

export async function loader({ params }: LoaderFunctionArgs) {
  const user = await apiService.getUser(Number(params.userId as string));

  return json(user);
}

export default function EditUserRoute() {
  const user = useLoaderData<typeof loader>();

  const onFormSubmit = async (userForm: IUserForm) => {
    await apiService.updateUser(user.id, userForm);
  };

  return <UserForm user={user} onSubmit={onFormSubmit} />;
}
