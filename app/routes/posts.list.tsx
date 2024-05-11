import { json } from "@remix-run/node";
import React from "react";

import { apiService } from "../../api/apiService";
import { useLoaderData, useNavigate } from "@remix-run/react";
import { TableHeader } from "../../components/ModelTable";
import {
  Stack,
  Typography,
  Container,
  IconButton,
  colors,
} from "@mui/material";
import { Edit as EditIcon } from "@mui/icons-material";
import { IPost } from "../../api/types/content";

export async function loader() {
  const res = await apiService.getPosts();
  if (res.error) return json([]);
  return json(res.data);
}

const PostItem = ({ post }: { post: IPost }) => {
  const navigate = useNavigate();

  const onEdit = () => {
    navigate(`/posts/edit/${post.id}`);
  };

  return (
    <Stack
      direction={"row"}
      bgcolor={colors.grey[100]}
      sx={{ justifyContent: "space-between", borderRadius: 4 }}
    >
      <Stack sx={{ padding: "2%" }}>
        <Typography variant={"h5"} fontWeight={"500"}>
          {post.category.name}
        </Typography>
        {post.subcategory && (
          <Typography variant={"h6"} fontWeight={"400"}>
            {post.subcategory.name}
          </Typography>
        )}
      </Stack>
      <Stack alignSelf={"center"}>
        <IconButton onClick={onEdit}>
          <EditIcon />
        </IconButton>
      </Stack>
    </Stack>
  );
};

export default function PostsListRoute() {
  const posts = useLoaderData<typeof loader>();

  return (
    <Container sx={{ width: "50vw" }} maxWidth={"lg"}>
      <TableHeader route={"posts"} title={"Посты"} />

      <Stack spacing={2}>
        {posts.map((post) => (
          <PostItem post={post} key={post.id} />
        ))}
      </Stack>
    </Container>
  );
}
