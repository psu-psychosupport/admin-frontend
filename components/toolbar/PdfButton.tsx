import { usePublisher } from "@mdxeditor/gurx";
import { insertDirective$ } from "@mdxeditor/editor";
import { FileOrUrlDialog } from "../../mdx/FileOrUrlDialog";
import { LeafDirective } from "mdast-util-directive";
import React, { useEffect } from "react";
import {
  PlayCircle as PlayCircleIcon,
  PictureAsPdf as PictureAsPdfIcon,
} from "@mui/icons-material";

import { useFetcher } from "@remix-run/react";

const VideoButton = () => {
  const fetcher = useFetcher<{
    goal: "insert-pdf";
    url: string;
  }>();
  const insertDirective = usePublisher(insertDirective$);

  const insert = (url: string) => {
    insertDirective({
      name: "pdf",
      type: "leafDirective",

      attributes: { url },
      children: [],
    } as LeafDirective);
  };

  useEffect(() => {
    if (!fetcher.data || fetcher.data.goal !== "insert-pdf") return;

    insert(fetcher.data.url as string);
  }, [fetcher.data]);

  return (
    <FileOrUrlDialog
      uploadFileTitle={"Загрузите файл PDF с вашего устройства"}
      tooltipTitle="Вставить PDF"
      submitButtonTitle="Загрузить"
      dialogInputLabel="Или вставьте ссылку на прямой файл"
      buttonContent={<PictureAsPdfIcon />}
      acceptFileTypes={"pdf"}
      onSubmit={async ({ url, file: fileList }) => {
        if (fileList.length) {
          const formData = new FormData();
          formData.append("goal", "insert-pdf");
          formData.append("file", fileList.item(0)!);
          fetcher.submit(formData, {
            method: "POST",
            encType: "multipart/form-data",
          });
          return;
        }
        // TODO: fuck site base. WHy it CaNt iGnORE IT?
        insert(`https://stoboi.damego.ru/${url}`);
      }}
    />
  );
};

export default VideoButton;
