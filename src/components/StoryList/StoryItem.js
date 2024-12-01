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
    sx={{
      display: 'flex',
      alignItems: 'flex-start',
      padding: 2,
      gap: 2,
    }}
  >
    <Typography
      sx={{
        backgroundColor: 'grey.200',
        px: 1,
        py: 0.5,
        borderRadius: 1,
        minWidth: '50px',
        textAlign: 'center',
        alignSelf: 'center',
      }}
    >
      #{story.id}
    </Typography>

    <Box
      sx={{
        width: 80,
        height: 80,
        borderRadius: 1,
        backgroundColor: story.cover_image ? 'transparent' : 'grey.300',
        overflow: 'hidden',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {story.cover_image ? (
        <Box
          component="img"
          src={story.cover_image}
          alt={`${story.title} cover`}
          sx={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
      ) : (
        <Typography variant="body2" color="text.secondary">
          No Image
        </Typography>
      )}
    </Box>

    <Box sx={{ flex: 1 }}>
      <Typography variant="h6" sx={{ lineHeight: 1.2 }}>
        {story.title}
      </Typography>
      {story.description && (
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mt: 1, lineHeight: 1.4 }}
        >
          {story.description}
        </Typography>
      )}
    </Box>

    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
      <IconButton edge="end" onClick={() => onEdit(story.id)}>
        <EditIcon />
      </IconButton>
      <IconButton edge="end" onClick={() => onDelete(story.id)}>
        <DeleteIcon />
      </IconButton>
    </Box>
  </ListItem>
);

export default StoryItem;
