import { json } from "@remix-run/node";
import React from "react";

import { apiService } from "../../api/apiService";
import { useLoaderData } from "@remix-run/react";
import { TableHeader } from "../../components/ModelTable";
import { Stack, Typography, Box, Container, IconButton } from "@mui/material";
import { Edit as EditIcon } from "@mui/icons-material";

export async function loader() {
  const posts = await apiService.getPosts(); // TODO: change type
  return json(posts);
}

export default function PostsListRoute() {
  const posts = useLoaderData<typeof loader>();

  return (
    <Container sx={{ width: "50vw" }} maxWidth={"lg"}>
      <TableHeader route={"posts"} title={"Посты"} />

      <Stack spacing={2}>
        {posts.map((post) => (
          <Container key={post.id}>
            <Stack sx={{ border: 1, padding: "2%", width: "50vw" }}>
              <Typography variant={"h5"}>{post.category.name}</Typography>
              <Typography variant={"h6"}>{post.subcategory.name}</Typography>
            </Stack>
            <Stack>
              <IconButton>
                <EditIcon />
              </IconButton>
            </Stack>
          </Container>
        ))}
      </Stack>
    </Container>
  );
}
