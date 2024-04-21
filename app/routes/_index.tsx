import type { MetaFunction } from "@remix-run/node";
import "@mdxeditor/editor/style.css";
import React from "react";

import {
  markdownShortcutPlugin,
  headingsPlugin,
  imagePlugin,
  linkDialogPlugin,
  linkPlugin,
  listsPlugin,
  quotePlugin,
  tablePlugin,
  thematicBreakPlugin,
  toolbarPlugin,
  MDXEditor,
  insertDirective$,
  directivesPlugin,
} from "@mdxeditor/editor";
import { usePublisher } from "@mdxeditor/gurx";
import { VideoDirectiveDescriptor } from "../../mdx/video";
import { AudioDirectiveDescriptor } from "../../mdx/audio";
import { LeafDirective } from "mdast-util-directive";
import { FileDialog } from "../../mdx/FileDialog";

export async function expressImageUploadHandler(image: File) {
  const formData = new FormData();
  formData.append("image", image);
  const response = await fetch("/uploads/new", {
    method: "POST",
    body: formData,
  });
  const json = (await response.json()) as { url: string };
  return json.url;
}

const youtubeMarkdown = `
This should be an youtube video:

::video{url="https://videos.pexels.com/video-files/5667416/5667416-sd_640_338_30fps.mp4"}
`;

const VideoButton = () => {
  const insertDirective = usePublisher(insertDirective$);

  return (
    <FileDialog
      uploadFileTitle={"Загрузите видео с вашего устройства"}
      tooltipTitle="Загрузка файла"
      submitButtonTitle="Загрузить"
      dialogInputLabel="Или вставьте ссылку на видео файл"
      buttonContent="Видео"
      acceptFileTypes={"*"} //video/*
      onSubmit={async ({ url, file: fileList }) => {
        if (fileList.length) {
          const file = fileList.item(0)!;
          const formData = new FormData();
          formData.append("file", file);
          const res = await fetch("http://127.0.0.1:8000/upload", {
            method: "POST",
            body: formData,
            mode: "cors",
          });
          console.log("REQUEST SENT AND GOT RESPONSE");
          const data = await res.json();
          url = data.url;
        }
        console.log("URL", url);

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

const AudioButton = () => {
  const insertDirective = usePublisher(insertDirective$);

  return (
    <FileDialog
      uploadFileTitle={"Загрузите аудио с вашего устройства"}
      tooltipTitle="Загрузка файла"
      submitButtonTitle="Загрузить"
      dialogInputLabel="Или вставьте ссылку на аудио файл"
      buttonContent="Аудио"
      acceptFileTypes={"*"} //video/*
      onSubmit={async ({ url, file: fileList }) => {
        if (fileList.length) {
          const file = fileList.item(0)!;
          const formData = new FormData();
          formData.append("file", file);
          const res = await fetch("http://127.0.0.1:8000/upload", {
            method: "POST",
            body: formData,
            mode: "cors",
          });
          const data = await res.json();
          url = data.url;
        }

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

export const ALL_PLUGINS = [
  toolbarPlugin({
    toolbarContents: () => (
      <>
        <VideoButton />
        <AudioButton />
      </>
    ),
  }),
  listsPlugin(),
  quotePlugin(),
  headingsPlugin(),
  linkPlugin(),
  linkDialogPlugin(),
  imagePlugin({
    imageAutocompleteSuggestions: [
      "https://via.placeholder.com/150",
      "https://via.placeholder.com/150",
    ],
    imageUploadHandler: async () =>
      Promise.resolve("https://picsum.photos/200/300"),
  }),
  tablePlugin(),
  thematicBreakPlugin(),
  markdownShortcutPlugin(),
  directivesPlugin({
    directiveDescriptors: [VideoDirectiveDescriptor, AudioDirectiveDescriptor],
  }),
];

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <div
      style={{
        fontFamily: "system-ui, sans-serif",
        borderWidth: 2,
        borderColor: "#000",
      }}
    >
      <MDXEditor
        markdown={youtubeMarkdown}
        plugins={ALL_PLUGINS}
        onChange={(data) => console.log(data)}
      />
    </div>
  );
}
