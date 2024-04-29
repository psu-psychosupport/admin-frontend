import { json } from "@remix-run/node";
import React from "react";

import { apiService } from "../../api/apiService";
import { useLoaderData } from "@remix-run/react";
import ModelTable from "../../components/ModelTable";
import {Stack, Typography, Box} from "@mui/material";

export async function loader() {
  const posts = await apiService.getPosts(); // TODO: change type
  return json(posts);
}

export default function PostsListRoute() {
  const posts = useLoaderData<typeof loader>();

  return (
    <Stack spacing={2}>
      {posts.map(post => (
        <Box sx={{border: 1, padding: '2%'}} key={post.id}>
          <Typography>
            {post.content}
          </Typography>
        </Box>
      ))}
    </Stack>
  );
}
