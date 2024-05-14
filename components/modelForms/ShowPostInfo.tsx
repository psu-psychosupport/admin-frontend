import { ICategory, IPost, ISubCategory } from "../../api/types/content";
import { Stack, Typography } from "@mui/material";
import React from "react";

const getCategoryName = ({
  post,
  category,
  subcategory,
}: {
  post?: IPost;
  category?: ICategory;
  subcategory?: ISubCategory;
}) => {
  let name;
  if (post) {
    name = post.category.name;
  } else if (category) {
    name = category.name;
  } else if (subcategory) {
    name = subcategory.category.name;
  }

  return name;
};

export const getSubcategoryName = ({
  post,
  subcategory,
}: {
  post?: IPost;
  subcategory?: ISubCategory;
}) => {
  let name;
  if (post) {
    name = post.subcategory.name;
  } else if (subcategory) {
    name = subcategory.name;
  }
  return name;
};

export const ShowPostInfo = ({
  post,
  category,
  subcategory,
}: {
  post?: IPost;
  category?: ICategory;
  subcategory?: ISubCategory;
}) => {
  const categoryName = getCategoryName({ post, category, subcategory })
  const subcategoryName = getSubcategoryName({ post, subcategory });
  return (
    <Stack gap={2}>
      <Typography variant={"h5"} fontWeight={"600"}>
        {categoryName}
      </Typography>
      {subcategoryName && (
        <Typography variant={"h6"}>{subcategoryName}</Typography>
      )}
    </Stack>
  );
};
