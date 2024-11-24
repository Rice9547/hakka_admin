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
  Tabs,
  Tab
} from '@mui/material';

const PreviewDialog = ({ open, onClose, story, pages }) => {
  const [tab, setTab] = React.useState('cn');

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
    >
      <DialogTitle>{story.title}</DialogTitle>
      <DialogContent>
        <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 2 }}>
          {story.description}
        </Typography>

        <Divider sx={{ my: 2 }} />

        <Tabs
          value={tab}
          onChange={(e, newValue) => setTab(newValue)}
          sx={{ mb: 2 }}
        >
          <Tab label="Chinese" value="cn" />
          <Tab label="Hakka" value="hakka" />
        </Tabs>

        {pages.map((page, index) => (
          <Box key={index} sx={{ mb: 2 }}>
            <Typography variant="h6">Page {page.page_number}</Typography>
            <Typography>
              {tab === 'cn' ? page.content_cn : page.content_hakka}
            </Typography>
          </Box>
        ))}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default PreviewDialog;