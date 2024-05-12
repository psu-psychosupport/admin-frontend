import { usePublisher } from "@mdxeditor/gurx";
import { insertDirective$ } from "@mdxeditor/editor";
import { LeafDirective } from "mdast-util-directive";
import React from "react";
import { AttachFile as AttachFileIcon } from "@mui/icons-material";

import { FileDialog } from "../../mdx/FileDialog";
import useFetcherAsync from "~/hooks/useFetcherAsync";

const FileButton = () => {
  const insertDirective = usePublisher(insertDirective$);
  const fetcher = useFetcherAsync<{ goal: "insert-file"; name: string; url: string }>();

  const insert = (name: string, url: string) => {
    insertDirective({
      name: "file",
      type: "leafDirective",

      attributes: { name, url },
      children: [],
    } as LeafDirective);
  };

  return (
    <FileDialog
      uploadFileTitle={"Загрузите файл с вашего устройства"}
      tooltipTitle="Вставить файл"
      submitButtonTitle="Загрузить"
      buttonContent={<AttachFileIcon />}
      acceptFileTypes={"*"}
      onSubmit={async ({ file: fileList }) => {
        const formData = new FormData();
        formData.append("goal", "insert-audio");
        formData.append("file", fileList.item(0)!);
        const data = await fetcher.submit(formData, {
          method: "POST",
          encType: "multipart/form-data",
        });
        insert(data!.name, data!.url);
      }}
    />
  );
};

export default FileButton;
