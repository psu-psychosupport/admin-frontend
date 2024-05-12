import { LeafDirective } from "mdast-util-directive";
import { DirectiveDescriptor, useMdastNodeUpdater } from "@mdxeditor/editor";
import React from "react";
import DescriptorTemplate from "../DescriptorTemplate";

import { ITestForm } from "~/routes/tests.add";
import { TestForm } from "~/components/testForm/TestForm";

interface TestDirectiveNode extends LeafDirective {
  name: "test";
  attributes: ITestForm;
}

const TestDirectiveDescriptor: DirectiveDescriptor<TestDirectiveNode> = {
  name: "test",
  type: "leafDirective",
  testNode(node) {
    return node.name === "test";
  },
  attributes: [],
  hasChildren: false,
  Editor: ({ mdastNode, lexicalNode, parentEditor }) => {
    const updater = useMdastNodeUpdater();
    const onSubmit = (data: ITestForm) => {
      parentEditor.update(() => {
        updater({ attributes: data });
      });
    };

    return (
      <DescriptorTemplate
        onDelete={() => {
          parentEditor.update(() => {
            lexicalNode.selectNext();
            lexicalNode.remove();
          });
        }}
      >
        <TestForm onSubmit={onSubmit} test={mdastNode.attributes!} />
      </DescriptorTemplate>
    );
  },
};

export { TestDirectiveDescriptor };
