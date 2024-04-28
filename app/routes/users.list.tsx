import { json, redirect } from "@remix-run/node";
import React from "react";

import { apiService } from "../../api/apiService";
import { useLoaderData, useNavigate } from "@remix-run/react";
import ModelTable from "../../components/ModelTable";

export async function loader() {
  const users = await apiService.getUsers();

  return json(users);
}

export default function CategoriesAddRoute() {
  const users = useLoaderData<typeof loader>();
  const navigate = useNavigate();

  return (
    <ModelTable
      showHeader={true}
      headerRoute={"users"}
      headerTitle={"Пользователи"}
      columnTitles={columnTitles}
      columnKeys={columnKeys}
      data={users}
      onRequestEdit={(user) => {
        navigate(`/users/edit/${user.id}`);
      }}
    />
  );
}

const columnTitles = [
  "Id",
  "Имя",
  "Электронная почта",
  "Подтверждён",
  "Разрешения",
];
const columnKeys = ["id", "name", "email", "is_verified", "permissions"];
