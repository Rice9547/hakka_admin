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

const StoryItem = ({ story, onEdit, onDelete }) => (
  <ListItem
    secondaryAction={
      <Box>
        <IconButton edge="end" onClick={() => onEdit(story.id)}>
          <EditIcon />
        </IconButton>
        <IconButton edge="end" onClick={() => onDelete(story.id)}>
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
          #{story.id}
        </Typography>
        <Typography variant="h6">{story.title}</Typography>
      </Box>
      {story.description && (
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mt: 1, ml: 9 }}
        >
          {story.description}
        </Typography>
      )}
    </Box>
  </ListItem>
);

export default StoryItem;