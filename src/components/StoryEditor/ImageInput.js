import React, { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  IconButton,
  Button,
  Card,
  CardMedia,
} from '@mui/material';
import {
  Upload as UploadIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import ImageUploadDialog from './ImageUploadDialog';

const ImageInput = ({ value, onChange, description }) => {
  const [imageUrl, setImageUrl] = useState(value || '');
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    setImageUrl(value || '');
  }, [value]);

  const handleUrlChange = (e) => {
    const newUrl = e.target.value;
    setImageUrl(newUrl);
    onChange(newUrl);
  };

  const handleImageSelect = (url) => {
    setImageUrl(url);
    onChange(url);
  };

  return (
    <Box sx={{ mb: 3 }}>
      <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
        <TextField
          fullWidth
          label="Cover Image URL"
          value={imageUrl}
          onChange={handleUrlChange}
          helperText="Enter image URL or use upload button"
        />
        <Button
          variant="outlined"
          startIcon={<UploadIcon />}
          onClick={() => setDialogOpen(true)}
        >
          Upload
        </Button>
      </Box>

      {imageUrl && (
        <Card sx={{ position: 'relative', maxWidth: 400, mx: 'auto', mt: 2 }}>
          <CardMedia
            component="img"
            height="200"
            image={imageUrl}
            alt="Cover"
            sx={{ objectFit: 'contain' }}
          />
          <IconButton
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              bgcolor: 'background.paper',
            }}
            onClick={() => handleImageSelect('')}
          >
            <DeleteIcon />
          </IconButton>
        </Card>
      )}

      <ImageUploadDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onSelectImage={handleImageSelect}
        initialPrompt={description}
      />
    </Box>
  );
};

export default ImageInput;