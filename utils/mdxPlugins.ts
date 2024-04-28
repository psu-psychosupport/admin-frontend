import {
  directivesPlugin,
  headingsPlugin,
  imagePlugin,
  linkDialogPlugin,
  linkPlugin,
  listsPlugin,
  markdownShortcutPlugin,
  quotePlugin,
  tablePlugin,
  thematicBreakPlugin,
  toolbarPlugin,
} from "@mdxeditor/editor";
import EditorToolbar from "../components/toolbar/EditorToolbar";
import { VideoDirectiveDescriptor } from "../mdx/video";
import { AudioDirectiveDescriptor } from "../mdx/audio";
import { apiService } from "../api/apiService";

export const mdxPlugins = [
  toolbarPlugin({
    toolbarContents: EditorToolbar,
  }),
  listsPlugin(),
  quotePlugin(),
  headingsPlugin(),
  linkPlugin(),
  linkDialogPlugin(),
  imagePlugin({
    imageUploadHandler: apiService.uploadFile,
  }),
  tablePlugin(),
  thematicBreakPlugin(),
  markdownShortcutPlugin(),
  directivesPlugin({
    directiveDescriptors: [VideoDirectiveDescriptor, AudioDirectiveDescriptor],
  }),
];
