import { usePublisher } from "@mdxeditor/gurx";
import { insertDirective$ } from "@mdxeditor/editor";
import { FileDialog } from "../../mdx/FileDialog";
import { LeafDirective } from "mdast-util-directive";
import React, {useEffect} from "react";
import { PlayCircle as PlayCircleIcon, Image as ImageIcon } from "@mui/icons-material";

import { apiService } from "../../api/apiService";
import { useFetcher } from "@remix-run/react";

const ImageButton = () => {
  const fetcher = useFetcher<{
    goal: "insert-image";
    url: string;
  }>();
  const insertDirective = usePublisher(insertDirective$);

  const insert = (url: string) => {
    insertDirective({
      name: "image",
      type: "leafDirective",

      attributes: { url },
      children: [],
    } as LeafDirective);
  };

  useEffect(() => {
    if (!fetcher.data || fetcher.data.goal !== "insert-image") return;

    insert(fetcher.data.url as string);
  }, [fetcher.data]);

  return (
    <FileDialog
      uploadFileTitle={"Загрузите изображение с вашего устройства"}
      tooltipTitle="Вставить изображение"
      submitButtonTitle="Загрузить"
      dialogInputLabel="Или вставьте прямую ссылку на файл с изображением"
      buttonContent={<ImageIcon />}
      acceptFileTypes={"image/*"}
      onSubmit={async ({ url, file: fileList }) => {
        if (fileList.length) {
          const formData = new FormData();
          formData.append("goal", "insert-image");
          formData.append("file", fileList.item(0)!);
          fetcher.submit(formData, { method: "POST", encType: "multipart/form-data" });
          return;
        }
        insert(url);
      }}
    />
  );
};

export default ImageButton;
