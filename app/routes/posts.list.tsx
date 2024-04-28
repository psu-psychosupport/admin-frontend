import { json } from "@remix-run/node";
import React from "react";

import { apiService } from "../../api/apiService";
import { useLoaderData } from "@remix-run/react";
import ModelTable from "../../components/ModelTable";
import {Stack} from "@mui/material";

export async function loader() {
  const posts: string[] = await apiService.getPosts(); // TODO: change type

  return json(posts);
}

export default function CategoriesAddRoute() {
  const posts = useLoaderData<typeof loader>();

  return (
    <Stack spacing={2}>

    </Stack>
  );
}
