import { MDXEditor } from "~/components/editor.client";
import React, { forwardRef, useRef } from "react";
import { mdxPlugins } from "../utils/mdxPlugins";
import i18next from "i18next";
import translation from "./toolbar/locales/ru/translation.json";
import { MDXEditorMethods } from "@mdxeditor/editor";

i18next.init({
  lng: "ru",
  resources: {
    ru: {
      translation,
    },
  },
});

export interface EditorProps {
  content: string;
  onContentChange: (content: string) => void;
}

const Editor = forwardRef<MDXEditorMethods, EditorProps>(
  ({ content, onContentChange }, ref) => {
    return (
      <MDXEditor
        ref={ref}
        markdown={content}
        plugins={mdxPlugins}
        onChange={onContentChange}
        translation={(key, defaultValue, interpolations) => {
          return i18next.t(key, defaultValue, interpolations) as string;
        }}
      />
    );
  },
);

export default Editor;