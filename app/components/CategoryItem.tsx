import { ICategory } from "../../api/types/content";
import React, { useState } from "react";
import {
  Box,
  Button,
  colors,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { ItemMenu } from "~/components/ItemMenu";
import ConfirmDeleteDialog from "~/components/ConfirmDeleteDialog";
import {
  Add as AddIcon,
  Check as CheckIcon,
  Close as CloseIcon,
} from "@mui/icons-material";
import { SubCategoryItem } from "~/components/SubCategoryItem";
import { useFetcher } from "@remix-run/react";
import { LinkWrapper } from "~/components/LinkWrapper";
import Indicator from "~/components/Indicator";

const CreateSubcategory = ({ category }: { category: ICategory }) => {
  const fetcher = useFetcher();

  const [name, setName] = useState("");
  const [isEditing, setEditing] = useState(false);

  const submit = () => {
    if (!name.length) return;

    const payload = {
      goal: "add-subcategory",
      subcategory: {
        name,
        category_id: category.id,
      },
    };
    fetcher.submit(payload, { method: "POST", encType: "application/json" });
    cancel();
  };

  const cancel = () => {
    setName("");
    setEditing(false);
  };

  if (isEditing) {
    return (
      <Stack direction={"row"}>
        <TextField
          fullWidth
          label={"Название темы"}
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        <IconButton onClick={submit}>
          <CheckIcon />
        </IconButton>
        <IconButton onClick={cancel}>
          <CloseIcon />
        </IconButton>
      </Stack>
    );
  }
  return (
    <Button
      startIcon={<AddIcon />}
      variant={"outlined"}
      onClick={() => setEditing(true)}
    >
      Добавить тему
    </Button>
  );
};

const DELETE_CATEGORY_TEXT =
  "Вы уверены, что хотите удалить этот раздел? Удаление может привести к удалению всех тем и контента";

export function CategoryItem({
  category,
  isEditingMode,
}: {
  category: ICategory;
  isEditingMode: boolean;
}) {
  const fetcher = useFetcher();

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
    fetcher.submit(
      { goal: "delete-category", categoryId: category.id },
      { method: "POST", encType: "application/json" }
    );
  };

  const handleSubmit = async () => {
    if (name && category.name !== name) {
      fetcher.submit(
        {
          goal: "edit-category",
          categoryId: category.id,
          categoryUpdate: { name },
        },
        { method: "POST", encType: "application/json" }
      );
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
          backgroundColor: "#FFFFFF",
          borderRadius: "4px",
          p: 2,
        }}
      >
        {isEditing ? (
          <TextField
            fullWidth
            label={"Название раздела"}
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        ) : (
          <Stack direction={"row"} alignItems={"center"} gap={1}>
            {!category.subcategories?.length && (
              <Indicator
                color={category.post ? colors.green[800] : colors.red[900]}
              />
            )}
            <LinkWrapper category={category}>
              <Typography variant={"h5"} fontWeight={"500"}>
                {category.name}
              </Typography>
            </LinkWrapper>
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
          text={DELETE_CATEGORY_TEXT}
          onDelete={handleDelete}
        />
      </Box>
      <Stack ml={2}>
        {category.subcategories &&
          category.subcategories.map((subcategory) => (
            <SubCategoryItem
              subcategory={subcategory}
              isEditingMode={isEditingMode}
              key={subcategory.id}
            />
          ))}

        {isEditingMode && <CreateSubcategory category={category} />}
      </Stack>
    </Box>
  );
}
