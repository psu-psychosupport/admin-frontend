import { LeafDirective } from "mdast-util-directive";
import { DirectiveDescriptor } from "@mdxeditor/editor";
import React, { useEffect, useState } from "react";
import DescriptorTemplate from "../DescriptorTemplate";
import { useFetcher } from "@remix-run/react";
import { IMedia } from "api/types/content";
import { ETestTypes, ITestForm } from "~/routes/tests.add";
import { Box, Button, TextField, Typography } from "@mui/material";

interface TestDirectiveNode extends LeafDirective {
  name: "test";
  attributes: { id: string };
}

const Test = ({ test }: { test: ITestForm }) => {
  const onOptionClick = (index: number) => {
    if (index === test.validOptionIndex) {
      // todo: make btn green
    } else {
      // todo: make btn red
    }
  };

  const onInput = (input: string) => {
    if (input === test.validTextInput) {
      // todo
    }
  };

  return (
    <Box>
      <Typography>{test.title}</Typography>
      {test.type === ETestTypes.OPTIONS &&
        test.options!.map((option, index) => (
          <Button key={index} onClick={() => onOptionClick(index)}>
            {option}
          </Button>
        ))}
      {test.type === ETestTypes.INPUT && (
        <Stack>
          <TextField />

          </Stack>
      )}
    </Box>
  );
};

const TestDirectiveDescriptor: DirectiveDescriptor<TestDirectiveNode> = {
  name: "test",
  type: "leafDirective",
  testNode(node) {
    return node.name === "test";
  },
  attributes: ["id"],
  hasChildren: false,
  Editor: ({ mdastNode, lexicalNode, parentEditor }) => {
    const fetcher = useFetcher();
    const [data, setData] = useState<ITestForm>();

    useEffect(() => {
      fetcher.submit(
        { goal: "request-test", mediaId: mdastNode.attributes.id },
        { method: "POST", encType: "application/json" }
      );
    }, []);

    useEffect(() => {
      if (!fetcher.data || fetcher.data !== "request-test") return;

      setData(fetcher.data.data);
    }, [fetcher.data]);

    if (!data) {
      return null;
    }

    return (
      <DescriptorTemplate
        onDelete={() => {
          parentEditor.update(() => {
            lexicalNode.selectNext();
            lexicalNode.remove();
          });
        }}
      >
        <Test test={data} />
      </DescriptorTemplate>
    );
  },
};

export { TestDirectiveDescriptor };
