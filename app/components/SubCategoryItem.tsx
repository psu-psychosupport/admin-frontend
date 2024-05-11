import { ISubCategory } from "../../api/types/content";
import React, { useState } from "react";
import { Box, TextField, Typography } from "@mui/material";
import { ItemMenu } from "~/components/ItemMenu";
import ConfirmDeleteDialog from "~/components/ConfirmDeleteDialog";
import { useFetcher } from "@remix-run/react";

const DELETE_SUBCATEGORY_TEXT =
  "Вы уверены, что хотите удалить эту подкатегорию? Удаление может привести к скрытию поста";

export function SubCategoryItem({
  subcategory,
}: {
  subcategory: ISubCategory;
}) {
  const fetcher = useFetcher();

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
    fetcher.submit(
      { goal: "delete-subcategory", subcategoryId: subcategory.id },
      { method: "POST", encType: "application/json" },
    );
  };

  const handleSubmit = async () => {
    if (name && subcategory.name !== name) {
      fetcher.submit(
        {
          goal: "edit-subcategory",
          subcategoryId: subcategory.id,
          subcategoryUpdate: { name, category_id: subcategory.category_id },
        },
        { method: "POST", encType: "application/json" },
      );
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
          label={"Название подкатегории"}
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
