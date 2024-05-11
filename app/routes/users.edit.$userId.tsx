import {ActionFunctionArgs, json, LoaderFunctionArgs, redirect} from "@remix-run/node";
import React from "react";

import { apiService } from "../../api/apiService";
import { IUserForm } from "../../components/modelForms/types";
import UserForm from "../../components/modelForms/UserForm";
import { useLoaderData } from "@remix-run/react";
import { Typography } from "@mui/material";

export async function loader({ params }: LoaderFunctionArgs) {
  const res = await apiService.getUser(Number(params.userId as string));

  if (res.error) return null;
  return json(res.data);
}

export async function action({ request }: ActionFunctionArgs) {
  const data = await request.json();
  const { userId, user } = data;
  await apiService.updateUser(userId, user);
  return redirect("/users/list");
}

export default function EditUserRoute() {
  const user = useLoaderData<typeof loader>();

  if (user === null) {
    return <Typography variant={"h1"}>Пользователь не найден</Typography>;
  }

  return <UserForm user={user} />;
}
