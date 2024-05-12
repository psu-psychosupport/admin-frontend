import { AdmonitionKind } from "lexical";
import React from "react";
import {
  EditorInFocus,
  DirectiveNode,
  ConditionalContents,
  Separator,
  BlockTypeSelect,
  BoldItalicUnderlineToggles,
  ChangeAdmonitionType,
  InsertTable,
  InsertImage,
  InsertThematicBreak,
  ListsToggle,
  UndoRedo,
  CreateLink,
  CodeToggle,
  InsertAdmonition,
} from "@mdxeditor/editor";

import AudioButton from "./AudioButton";
import VideoButton from "./VideoButton";
import DiagramButton from "./DiagramButton";
import InsertPresentation from "./PresentationButton";
import FileButton from "./FileButton";
import InsertTest from "./TestButton";

function whenInAdmonition(editorInFocus: EditorInFocus | null) {
  const node = editorInFocus?.rootNode;
  if (!node || node.getType() !== "directive") {
    return false;
  }

  return ["note", "tip", "danger", "info", "caution"].includes(
    (node as DirectiveNode).getMdastNode().name as AdmonitionKind,
  );
}

const EditorToolbar = () => {
  return (
    <>
      <ConditionalContents
        options={[
          {
            fallback: () => (
              <>
                <UndoRedo />
                <Separator />
                <BoldItalicUnderlineToggles />
                <CodeToggle />
                <Separator />
                <ListsToggle />
                <Separator />

                <ConditionalContents
                  options={[
                    {
                      when: whenInAdmonition,
                      contents: () => <ChangeAdmonitionType />,
                    },
                    { fallback: () => <BlockTypeSelect /> },
                  ]}
                />

                <Separator />

                <CreateLink />
                <InsertImage />
                <AudioButton />
                <VideoButton />
                <DiagramButton />
                <FileButton />
                <InsertPresentation />

                <Separator />

                <InsertTable />
                <InsertThematicBreak />

                <ConditionalContents
                  options={[
                    {
                      when: (editorInFocus) => !whenInAdmonition(editorInFocus),
                      contents: () => (
                        <>
                          <Separator />
                          <InsertAdmonition />
                        </>
                      ),
                    },
                  ]}
                />
              </>
            ),
          },
        ]}
      />
    </>
  );
};

export default EditorToolbar;
