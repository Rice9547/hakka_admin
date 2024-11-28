import React from 'react';
import {
  Box,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
} from '@mui/material';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const CategorySelect = ({ value, onChange, options }) => {
  const handleChange = (event) => {
    const selectedIds = event.target.value;
    const selectedCategories = selectedIds.map(id =>
      options.find(cat => cat.id === id)
    );
    onChange(selectedCategories);
  };

  return (
    <FormControl fullWidth>
      <InputLabel>Categories</InputLabel>
      <Select
        multiple
        value={value.map(cat => cat.id)}
        onChange={handleChange}
        input={<OutlinedInput label="Categories" />}
        renderValue={(selected) => (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
            {value.map((category) => (
              <Chip
                key={category.id}
                label={category.name}
                onDelete={() => {
                  const newValue = value.filter(cat => cat.id !== category.id);
                  onChange(newValue);
                }}
              />
            ))}
          </Box>
        )}
        MenuProps={MenuProps}
      >
        {options.map((category) => (
          <MenuItem
            key={category.id}
            value={category.id}
            style={{
              fontWeight: value.find(cat => cat.id === category.id)
                ? 600
                : 400,
            }}
          >
            {category.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default CategorySelect;