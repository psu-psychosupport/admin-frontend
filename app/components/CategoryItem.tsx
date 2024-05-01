import { ICategory, ISubCategory } from "../../api/types/content";
import React, { useState } from "react";
import { apiService } from "../../api/apiService";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { ItemMenu } from "~/components/ItemMenu";
import ConfirmDeleteDialog from "~/components/ConfirmDeleteDialog";
import { Add as AddIcon } from "@mui/icons-material";

const DELETE_SUBCATEGORY_TEXT =
  "Вы уверены, что хотите удалить эту подкатегорию? Удаление может привести к скрытию поста";
const DELETE_CATEGORY_TEXT =
  "Вы уверены, что хотите удалить эту категорию? Удаление может привести к удалению подкатегорий и скрытию постов";

export function SubCategoryItem({ subcategory }: { subcategory: ISubCategory }) {
  const [isEditing, setEditing] = useState(false);
  const [isModalOpened, setModalOpened] = useState(false);
  const [name, setName] = useState(subcategory.name);

  const openModal = () => setModalOpened(true);
  const closeModal = () => setModalOpened(false);

  const handleEdit = () => {
    setEditing(true);
  };

  const handleRequestDelete = () => {
    openModal();
  };

  const handleDelete = async () => {
    await apiService.deleteSubcategory(subcategory.id);
  };

  const handleSubmit = async () => {
    if (name && subcategory.name !== name) {
      await apiService.updateSubcategory(subcategory.id, { name });
    }
    handleClose();
  };

  const handleClose = () => {
    setEditing(false);
  };

  return (
    <Box
      key={subcategory.id}
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      {isEditing ? (
        <TextField
          fullWidth
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
      ) : (
        <Typography variant={"body1"}>· {subcategory.name}</Typography>
      )}

      <ItemMenu
        isEditing={isEditing}
        onRequestEdit={handleEdit}
        onRequestDelete={handleRequestDelete}
        onSubmit={handleSubmit}
        onCancel={handleClose}
      />
      <ConfirmDeleteDialog
        isOpen={isModalOpened}
        onClose={closeModal}
        onDelete={handleDelete}
        text={DELETE_SUBCATEGORY_TEXT}
      />
    </Box>
  );
}

export function CategoryItem({ category }: { category: ICategory }) {
  const [isEditing, setEditing] = useState(false);
  const [isModalOpened, setModalOpened] = useState(false);
  const [name, setName] = useState(category.name);

  const openModal = () => setModalOpened(true);
  const closeModal = () => setModalOpened(false);

  const handleEdit = () => {
    setEditing(true);
  };

  const handleRequestDelete = () => {
    openModal();
  };

  const handleDelete = async () => {
    await apiService.deleteCategory(category.id);
  };

  const handleSubmit = async () => {
    if (name && category.name !== name) {
      await apiService.updateCategory(category.id, { name });
    }
    handleClose();
  };

  const handleClose = () => {
    setEditing(false);
  };

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        {isEditing ? (
          <TextField
            fullWidth
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        ) : (
          <Typography variant={"body1"} fontSize={24}>
            {category.name}
          </Typography>
        )}
        <ItemMenu
          isEditing={isEditing}
          onRequestEdit={handleEdit}
          onRequestDelete={handleRequestDelete}
          onSubmit={handleSubmit}
          onCancel={handleClose}
        />
        <ConfirmDeleteDialog
          isOpen={isModalOpened}
          onClose={closeModal}
          text={DELETE_CATEGORY_TEXT}
          onDelete={handleDelete}
        />
      </Box>
      <Stack ml={2}>
        {category.subcategories.map((subcategory) => (
          <SubCategoryItem subcategory={subcategory} key={subcategory.id} />
        ))}
        <Button startIcon={<AddIcon />} variant={"outlined"}>
          Добавить подкатегорию
        </Button>
      </Stack>
    </Box>
  );
}
