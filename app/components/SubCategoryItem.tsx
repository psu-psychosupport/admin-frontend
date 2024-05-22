import { ISubCategory } from "../../api/types/content";
import React, { useState } from "react";
import { Box, colors, Stack, TextField, Typography } from "@mui/material";
import { ItemMenu } from "~/components/ItemMenu";
import ConfirmDeleteDialog from "~/components/ConfirmDeleteDialog";
import { useFetcher } from "@remix-run/react";
import { LinkWrapper } from "~/components/LinkWrapper";
import Indicator from "~/components/Indicator";

const DELETE_SUBCATEGORY_TEXT =
  "Вы уверены, что хотите удалить эту тему раздела? Удаление может привести к удалению контента!";

export function SubCategoryItem({
  subcategory,
  isEditingMode,
}: {
  subcategory: ISubCategory;
  isEditingMode: boolean;
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
          label={"Название темы раздела"}
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
      ) : (
        <Stack direction={"row"} alignItems={"center"} gap={1}>
          <Indicator
            color={subcategory.post ? colors.green[800] : colors.red[900]}
          />
          <Typography variant={"h6"} fontWeight={"400"}>
            <LinkWrapper subcategory={subcategory}>
              {subcategory.name}
            </LinkWrapper>
          </Typography>
        </Stack>
      )}

      {isEditingMode && (
        <ItemMenu
          isEditing={isEditing}
          onRequestEdit={handleEdit}
          onRequestDelete={handleRequestDelete}
          onSubmit={handleSubmit}
          onCancel={handleClose}
        />
      )}
      <ConfirmDeleteDialog
        isOpen={isModalOpened}
        onClose={closeModal}
        onDelete={handleDelete}
        text={DELETE_SUBCATEGORY_TEXT}
      />
    </Box>
  );
}
