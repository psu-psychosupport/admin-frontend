import { MDXEditor } from "~/components/editor.client";
import React, { forwardRef } from "react";
import { mdxPlugins } from "../utils/mdxPlugins";
import i18next from "i18next";
import translation from "./toolbar/locales/ru/translation.json";
import { MDXEditorMethods } from "@mdxeditor/editor";
import useFetcherAsync from "~/hooks/useFetcherAsync";
import "./inter.css"

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
    const fetcher = useFetcherAsync<{goal: "insert-image"; url: string}>();

    const uploadImage = async (image: File) => {
      const formData = new FormData();
      formData.append("goal", "insert-image");
      formData.append("file", image);

      const data = await fetcher.submit(formData, {
        method: "POST",
        encType: "multipart/form-data",
      });

      return data!.url;
    };

    return (
      <MDXEditor
        ref={ref}
        markdown={content}
        plugins={mdxPlugins(uploadImage)}
        onChange={onContentChange}
        contentEditableClassName={"inter"}
        translation={(key, defaultValue, interpolations) => {
          return i18next.t(key, defaultValue, interpolations) as string;
        }}
      />
    );
  }
);

export default Editor;
