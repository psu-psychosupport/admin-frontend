import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import React from "react";

export const ConfirmDocumentInsertModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>Предупреждение</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Вставка документа удалит всю написанную ранее информацию. Если уже
          после вставки текста, решили передумать, то обновите страницу.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Понял</Button>
      </DialogActions>
    </Dialog>
  );
};
