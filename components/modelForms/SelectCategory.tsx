import { ICategory } from "../../api/types/content";
import React, { useState } from "react";
import { SelectChangeEvent } from "@mui/material/Select";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

export interface ISelectPost {
  categoryId: number;
  subcategoryId?: number;
}

export function SelectCategory({
  categories,
  onSelect,
}: {
  categories: ICategory[];
  onSelect: (data: ISelectPost) => void;
}) {
  const [category, setCategory] = useState<ICategory>();
  const [subcategory, setSubcategory] = useState<string>();

  const handleChange = (event: SelectChangeEvent) => {
    const $category = categories.find(
      (c) => c.id.toString() === event.target.value,
    );
    setCategory($category);
    if (!$category?.subcategories.length) {
      onSelect({
        categoryId: $category!.id,
      });
    }
  };

  const handleSubcategoryChange = (event: SelectChangeEvent) => {
    setSubcategory(event.target.value);
    onSelect({
      categoryId: category!.id,
      subcategoryId: Number.parseInt(event.target.value),
    });
  };

  return (
    <>
      <FormControl fullWidth>
        <InputLabel id="select-category-label">Раздел</InputLabel>
        <Select
          labelId="select-category-label"
          id="select-category"
          value={category ? category.id.toString() : ""}
          label="Раздел"
          onChange={handleChange}
        >
          {categories.map((category) => (
            <MenuItem value={category.id.toString()} key={category.id}>
              {category.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {!!category && !!category.subcategories.length && (
        <FormControl fullWidth>
          <InputLabel id="select-subcategory-label">Тема раздела</InputLabel>
          <Select
            labelId="select-subcategory-label"
            id="select-subcategory"
            value={subcategory || ""}
            label="Тема раздела"
            onChange={handleSubcategoryChange}
          >
            {category.subcategories.map((subc) => (
              <MenuItem value={subc.id.toString()} key={subc.id}>
                {subc.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
    </>
  );
}
