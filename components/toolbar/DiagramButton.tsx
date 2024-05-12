import { usePublisher } from "@mdxeditor/gurx";
import { DialogButton, insertDirective$ } from "@mdxeditor/editor";
import { LeafDirective } from "mdast-util-directive";
import React from "react";
import { AccountTree as AccountTreeIcon } from "@mui/icons-material";
import sanitizeHtml from "../../utils/htmlSanitize";

const DiagramButton = () => {
  const insertDirective = usePublisher(insertDirective$);

  return (
    <DialogButton
      tooltipTitle="Вставить схему"
      submitButtonTitle="Добавить"
      buttonContent={<AccountTreeIcon />}
      dialogInputPlaceholder={"<iframe ..."}
      onSubmit={(data) => {
        const sanitizedHtml = sanitizeHtml(data);
        if (sanitizedHtml !== data) {
          alert("Неверный формат кода")
          return;
        }

        insertDirective({
          name: "diagram",
          type: "leafDirective",

          attributes: { data },
          children: [],
        } as LeafDirective);
      }}
    />
  );
};

export default DiagramButton;
