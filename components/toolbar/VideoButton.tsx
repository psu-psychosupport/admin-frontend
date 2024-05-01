import { usePublisher } from "@mdxeditor/gurx";
import { insertDirective$ } from "@mdxeditor/editor";
import { FileDialog } from "../../mdx/FileDialog";
import { LeafDirective } from "mdast-util-directive";
import React from "react";
import { PlayCircle as PlayCircleIcon } from "@mui/icons-material";

import { apiService } from "../../api/apiService";

const VideoButton = () => {
  const insertDirective = usePublisher(insertDirective$);

  return (
    <FileDialog
      uploadFileTitle={"Загрузите видео с вашего устройства"}
      tooltipTitle="Видео"
      submitButtonTitle="Загрузить"
      dialogInputLabel="Или вставьте ссылку на видео файл"
      buttonContent={<PlayCircleIcon />}
      acceptFileTypes={"video/*"}
      onSubmit={async ({ url, file: fileList }) => {
        url = fileList.length
          ? await apiService.uploadFile(fileList.item(0)!)
          : url;

        insertDirective({
          name: "video",
          type: "leafDirective",

          attributes: { url },
          children: [],
        } as LeafDirective);
      }}
    />
  );
};

export default VideoButton;
