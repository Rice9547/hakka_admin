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

            {page.audios.map((audio, index) => (
              <Box key={index} sx={{display: 'flex', alignItems: 'center', mb: 1}}>
                <Typography variant="subtitle2">{audio.audio_url}</Typography>
                <CopyButton text={audio.audio_url}/>
                <audio key={index} controls src={audio.audio_url} sx={{mb: 1}}/>
              </Box>
            ))}
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