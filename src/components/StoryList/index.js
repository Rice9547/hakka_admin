import React from 'react';
import {
  Container,
  Paper,
  Button,
  Typography,
  List,
  Box,
  CircularProgress
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { useStories, useStoryActions } from '../../hooks/useStory';
import StoryItem from './StoryItem';

const StoryList = ({ onEdit, onCreateNew }) => {
  const { stories, isLoading, isError } = useStories();
  const { deleteStory } = useStoryActions();

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this story?')) {
      try {
        await deleteStory(id);
      } catch (error) {
        console.error('Error deleting story:', error);
      }
    }
  };

  if (isError) {
    return <Typography color="error">Failed to load stories</Typography>;
  }

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
          <Typography variant="h4" component="h1">Stories</Typography>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={onCreateNew}
          >
            New Story
          </Button>
        </Box>

        <Paper>
          {isLoading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
              <CircularProgress />
            </Box>
          ) : (
            <List>
              {stories.map(story => (
                <StoryItem
                  key={story.id}
                  story={story}
                  onEdit={onEdit}
                  onDelete={handleDelete}
                />
              ))}
            </List>
          )}
        </Paper>
      </Box>
    </Container>
  );
};

export default StoryList;