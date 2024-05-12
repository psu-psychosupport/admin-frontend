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
import { DiagramDirectiveDescriptor } from "../mdx/diagram";
import {
  PdfDirectiveDescriptor,
  PresentationDirectiveDescriptor,
} from "../mdx/pdf";
import {FileDirectiveDescriptor} from "../mdx/file/FileDescriptor";
import {TestDirectiveDescriptor} from "../mdx/test/TestDescriptor";

export const mdxPlugins = (uploadImage: (image: File) => Promise<string>) => [
  toolbarPlugin({
    toolbarContents: EditorToolbar,
  }),
  listsPlugin(),
  quotePlugin(),
  headingsPlugin(),
  linkPlugin(),
  linkDialogPlugin(),
  tablePlugin(),
  thematicBreakPlugin(),
  markdownShortcutPlugin(),
  imagePlugin({
    imageUploadHandler: uploadImage,
  }),
  directivesPlugin({
    directiveDescriptors: [
      VideoDirectiveDescriptor,
      AudioDirectiveDescriptor,
      DiagramDirectiveDescriptor,
      PdfDirectiveDescriptor,
      PresentationDirectiveDescriptor,
      FileDirectiveDescriptor,
      TestDirectiveDescriptor,
    ],
  }),
];
