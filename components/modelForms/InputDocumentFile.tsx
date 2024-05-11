import React, { ChangeEvent } from "react";
import { styled } from "@mui/material";

export const InputDocumentFile = ({
  onChange,
}: {
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <VisuallyHiddenInput
      type="file"
      accept={".doc,.docx,.txt"}
      onChange={onChange}
    />
  );
};
const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});
