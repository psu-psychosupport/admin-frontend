import { MDXEditor } from "~/components/editor.client";
import React from "react";
import { mdxPlugins } from "../utils/mdxPlugins";
import i18next from "i18next";
import translation from "./toolbar/locales/ru/translation.json";

i18next.init({
  lng: "ru",
  resources: {
    ru: {
      translation,
    },
  },
});

export default function Editor({
  content,
  onContentChange,
}: {
  content: string;
  onContentChange: (content: string) => void;
}) {
  return (
    <MDXEditor
      markdown={content}
      plugins={mdxPlugins}
      onChange={onContentChange}
      translation={(key, defaultValue, interpolations) => {
        return i18next.t(key, defaultValue, interpolations) as string;
      }}
    />
  );
}
