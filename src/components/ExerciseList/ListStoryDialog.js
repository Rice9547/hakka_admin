import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@mui/material';

const ListStoryDialog = ({ open, onClose, onSelect, stories }) => {
  if (!stories) return null;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
    >
      <DialogTitle>Create With</DialogTitle>
      <DialogContent>
        {stories.map(story => (
          <Button key={story.id} onClick={() => onSelect(story.id)}>{story.title}</Button>
        ))}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ListStoryDialog;