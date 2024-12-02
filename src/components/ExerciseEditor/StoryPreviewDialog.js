import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Divider,
} from '@mui/material';
import CopyButton from "./CopyButton";

const StoryPreviewDialog = ({ open, onClose, story }) => {
  if (!story) return null;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
    >
      <DialogTitle>Story Content</DialogTitle>
      <DialogContent>
        <Box sx={{ mb: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <Typography variant="subtitle1">Description</Typography>
            <CopyButton text={story.description} />
          </Box>
          <Typography variant="body1">{story.description}</Typography>
        </Box>

        <Divider sx={{ my: 2 }} />

        {story.pages.map((page, index) => (
          <Box key={index} sx={{ mb: 3 }}>
            <Typography variant="h6">Page {page.page_number}</Typography>

            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Typography variant="subtitle2">Chinese</Typography>
              <CopyButton text={page.content_cn} />
            </Box>
            <Typography variant="body1" sx={{ mb: 2 }}>{page.content_cn}</Typography>

            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Typography variant="subtitle2">Hakka</Typography>
              <CopyButton text={page.content_hakka} />
            </Box>
            <Typography variant="body1" sx={{ mb: 2 }}>{page.content_hakka}</Typography>

            {page.audio_sijian && (
              <audio controls src={page.audio_sijian} sx={{ mb: 1 }} />
            )}
            {page.audio_hailu && (
              <audio controls src={page.audio_hailu} sx={{ mb: 1 }} />
            )}
          </Box>
        ))}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default StoryPreviewDialog;