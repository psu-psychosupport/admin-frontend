import { usePublisher } from "@mdxeditor/gurx";
import { DialogButton, insertDirective$ } from "@mdxeditor/editor";
import { LeafDirective } from "mdast-util-directive";
import React from "react";
import { AccountTree as AccountTreeIcon } from "@mui/icons-material";
import sanitizeHtml from "../../utils/htmlSanitize";

const DiagramButton = () => {
  const insertDirective = usePublisher(insertDirective$);
  `<iframe frameborder="0" style="width:100%;height:453px;" src="https://viewer.diagrams.net/?tags=%7B%7D&highlight=0000ff&edit=_blank&layers=1&nav=1#RrVTBbtswDP0aHzfYcpO217lZd1iBAinQ9ahFrK1CNg1FjuV%2B%2FeSIjqo6yRZgF8N8IqWn90gleVHbe83b6gEFqISlwib5XcLY7eLKfUdg8MAyu%2FFAqaXwUBaAtXwHAlNCOylgGyUaRGVkG4MbbBrYmAjjWmMfp72iik9teQkzYL3hao4%2BS2Eqj96w64D%2FAFlW08nZ8tav1HxKpptsKy6w%2FwDlqyQvNKLxf7UtQI3aTbr4uu8nVg%2FENDTmXwoe2ZNNZSde2veuUKvCPPPfXxhxM8N0YRDu%2FhSiNhWW2HC1Cug3jV0jYNw1dVHI%2BYnYOjBz4BsYM5CZvDPooMrUilYdYT38Guu%2FLqbwhbbbB3c2igaKPNeR4EkJCNpipzdw5t5TK3FdgjmTlx%2BMcg0OWIPj4%2Bo0KG7kLubBqdXKQ96h9BGlY8hSmoortvAlNBT5dRpv4XlRVfDU%2FXygEaC90xe4ToR3XHV0hSewZtYKfSUNrFu%2BV7J34x3byLetn7hXacd2IH92oA3Y8w7NFbWflCBlsml6%2BjB82fQ2VNHgpaddiPS7VKx8JtYDahib55hmYThGif6i4P8QbBm30iI7Ihg7Itjycr1cGJ4r34vhzc9XfwA%3D"></iframe>`;
  return (
    <DialogButton
      tooltipTitle="Диаграмма"
      submitButtonTitle="Добавить"
      buttonContent={<AccountTreeIcon />}
      dialogInputPlaceholder={"https://viewer.diagrams.net/..."}
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
