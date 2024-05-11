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
      tooltipTitle="Диаграмма"
      submitButtonTitle="Добавить"
      buttonContent={<AccountTreeIcon />}
      dialogInputPlaceholder={"<iframe ..."}
      onSubmit={(data) => {
        const sanitizedHtml = sanitizeHtml(data);
        if (sanitizedHtml !== data) {
          // TODO: send a warning
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
