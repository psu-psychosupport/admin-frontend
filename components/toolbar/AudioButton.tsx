import { usePublisher } from "@mdxeditor/gurx";
import { insertDirective$ } from "@mdxeditor/editor";
import { FileDialog } from "../../mdx/FileDialog";
import { LeafDirective } from "mdast-util-directive";
import React from "react";
import { Audiotrack as AudiotrackIcon } from "@mui/icons-material";

import { apiService } from "../../api/apiService";

const AudioButton = () => {
  const insertDirective = usePublisher(insertDirective$);

  return (
    <FileDialog
      uploadFileTitle={"Загрузите аудио с вашего устройства"}
      tooltipTitle="Аудио"
      submitButtonTitle="Загрузить"
      dialogInputLabel="Или вставьте ссылку на аудио файл"
      buttonContent={<AudiotrackIcon />}
      acceptFileTypes={"audio/*"}
      onSubmit={async ({ url, file: fileList }) => {
        url = fileList.length
          ? await apiService.uploadFile(fileList.item(0)!)
          : url;

        insertDirective({
          name: "audio",
          type: "leafDirective",

          attributes: { url },
          children: [],
        } as LeafDirective);
      }}
    />
  );
};

export default AudioButton;
