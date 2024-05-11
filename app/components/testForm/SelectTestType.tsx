import React, { ChangeEvent } from "react";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";

export const SelectTestType = ({
  value,
  onChange,
}: {
  value: number;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <FormControl>
      <FormLabel id="select-test-type">Тип теста</FormLabel>
      <RadioGroup row name="type" id={"type"} value={value} onChange={onChange}>
        <FormControlLabel value={0} control={<Radio />} label="С опциями" />
        <FormControlLabel
          value={1}
          control={<Radio />}
          label="С вводом текста"
        />
      </RadioGroup>
    </FormControl>
  );
};
