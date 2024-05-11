import { IPost } from "../../api/types/content";
import { Stack, Typography } from "@mui/material";
import React from "react";

export const ShowPostInfo = ({ post }: { post: IPost }) => {
  return (
    <Stack gap={4}>
      <Typography variant={"h4"} fontWeight={"500"}>
        {post.category.name}
      </Typography>
      {post.subcategory && (
        <Typography variant={"h5"}>{post.subcategory.name}</Typography>
      )}
    </Stack>
  );
};
