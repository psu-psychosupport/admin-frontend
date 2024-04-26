import type {MetaFunction} from "@remix-run/node";
import "@mdxeditor/editor/style.css";
import React from "react";

import {
  directivesPlugin,
  headingsPlugin,
  imagePlugin,
  linkDialogPlugin,
  linkPlugin,
  listsPlugin,
  markdownShortcutPlugin,
  MDXEditor,
  quotePlugin,
  tablePlugin,
  thematicBreakPlugin,
  toolbarPlugin,
} from "@mdxeditor/editor";
import {VideoDirectiveDescriptor} from "../../mdx/video";
import {AudioDirectiveDescriptor} from "../../mdx/audio";
import EditorToolbar from "../../components/toolbar/EditorToolbar";


const youtubeMarkdown = `
This should be an youtube video:

::video{url="https://videos.pexels.com/video-files/5667416/5667416-sd_640_338_30fps.mp4"}
`;


export const ALL_PLUGINS = [
  toolbarPlugin({
    toolbarContents: EditorToolbar,
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
