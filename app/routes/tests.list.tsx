import { json } from "@remix-run/node";
import React from "react";

import { apiService } from "../../api/apiService";
import { useLoaderData } from "@remix-run/react";
import ModelTable from "../../components/ModelTable";
import {Stack, Typography, Box} from "@mui/material";

// export async function loader() {
//   const posts = await apiService.getPosts(); // TODO: change type
//   return json(posts);
// }

export default function TestsListRoute() {
  // const posts = useLoaderData<typeof loader>();

  return (
    <Stack spacing={2}>
      <Typography>Тестов нет</Typography>
    </Stack>
  );
}
