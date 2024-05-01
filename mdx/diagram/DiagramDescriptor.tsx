import { LeafDirective } from "mdast-util-directive";
import { DirectiveDescriptor } from "@mdxeditor/editor";
import React from "react";
import { IconButton } from "@mui/material";
import { Delete as DeleteIcon } from "@mui/icons-material";

interface DiagramDirectiveNode extends LeafDirective {
  name: "diagram";
  attributes: { data: string };
}

const DiagramDirectiveDescriptor: DirectiveDescriptor<DiagramDirectiveNode> = {
  name: "diagram",
  type: "leafDirective",
  testNode(node) {
    return node.name === "diagram";
  },
  attributes: ["data"],
  hasChildren: false,
  Editor: ({ mdastNode, lexicalNode, parentEditor }) => {
    console.log("URL", mdastNode.attributes?.data);
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: 4,
        }}
      >
        <div dangerouslySetInnerHTML={{ __html: mdastNode.attributes.data }} />
        <IconButton
          onClick={() => {
            parentEditor.update(() => {
              lexicalNode.selectNext();
              lexicalNode.remove();
            });
          }}
        >
          <DeleteIcon />
        </IconButton>
      </div>
    );
  },
};

export { DiagramDirectiveDescriptor };
