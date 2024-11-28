import React from 'react';
import {
  ListItem,
  IconButton,
  Typography,
  Box,
} from '@mui/material';
import {
  Delete as DeleteIcon,
  Edit as EditIcon,
} from '@mui/icons-material';

const CategoryItem = ({ category, onEdit, onDelete }) => (
  <ListItem
    secondaryAction={
      <Box>
        <IconButton edge="end" onClick={() => onEdit(category.id, category)}>
          <EditIcon />
        </IconButton>
        <IconButton edge="end" onClick={() => onDelete(category.id)}>
          <DeleteIcon />
        </IconButton>
      </Box>
    }
  >
    <Box sx={{ flex: 1 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Typography
          sx={{
            backgroundColor: 'grey.200',
            px: 1,
            py: 0.5,
            borderRadius: 1,
            minWidth: '50px',
            textAlign: 'center'
          }}
        >
          #{category.id}
        </Typography>
        <Typography variant="h6">{category.name}</Typography>
      </Box>
      {category.description && (
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mt: 1, ml: 9 }}
        >
          {category.description}
        </Typography>
      )}
    </Box>
  </ListItem>
);

export default CategoryItem;