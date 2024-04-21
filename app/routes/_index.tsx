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
  DialogButton,
  insertDirective$,
  directivesPlugin,
} from "@mdxeditor/editor";
import { usePublisher } from "@mdxeditor/gurx";
import { VideoDirectiveDescriptor } from "../../descriptors/video";
import { LeafDirective } from "mdast-util-directive";

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

const YouTubeButton = () => {
  const insertDirective = usePublisher(insertDirective$);

  return (
    <DialogButton
      tooltipTitle="Вставка видео"
      submitButtonTitle="Вставить"
      dialogInputPlaceholder="Вставьте ссылку на видео файл"
      buttonContent="Видео"
      onSubmit={(url) => {
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

export const ALL_PLUGINS = [
  toolbarPlugin({
    toolbarContents: () => (
      <>
        <YouTubeButton />
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
  directivesPlugin({ directiveDescriptors: [VideoDirectiveDescriptor] }),
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
