import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  Typography,
  CircularProgress,
  Alert,
  Snackbar
} from '@mui/material';
import { Image as ImageIcon, Upload as UploadIcon } from '@mui/icons-material';
import { useImageUpload } from "../../api/image";

const ImageUploadDialog = ({ open, onClose, onSelectImage, initialPrompt = '' }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [generationPrompt, setGenerationPrompt] = useState(initialPrompt);
  const [generatedImage, setGeneratedImage] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);
  const { uploadImage, generateImage } = useImageUpload();

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);

    try {
      setIsUploading(true);
      setError(null);

      const data = await uploadImage(formData);
      setUploadedImage(data.url);
      setSuccess('Image uploaded successfully!');
    } catch (err) {
      setError('Failed to upload image');
      console.error('Upload error:', err);
    } finally {
      setIsUploading(false);
    }
  };

  const handleUseUploaded = () => {
    onSelectImage(uploadedImage);
    onClose();
  };

  const handleGenerate = async () => {
    try {
      setIsUploading(true);
      setError(null);

      const data = await generateImage(generationPrompt);
      setGeneratedImage(data.url);
    } catch (err) {
      setError('Failed to generate image');
    } finally {
      setIsUploading(false);
    }
  };

  const handleUseGenerated = () => {
    onSelectImage(generatedImage);
    onClose();
  };

  const handleClose = () => {
    setUploadedImage(null);
    setGeneratedImage(null);
    setError(null);
    setSuccess(null);
    onClose();
  };

  return (
    <>
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>Upload or Generate Image</DialogTitle>
        <DialogContent>
          <Box sx={{ mb: 3 }}>
            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}

            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle1" gutterBottom>
                Generate Image
              </Typography>
              <TextField
                fullWidth
                multiline
                rows={3}
                label="Image Generation Prompt"
                value={generationPrompt}
                onChange={(e) => setGenerationPrompt(e.target.value)}
                sx={{ mb: 2 }}
              />
              <Button
                variant="contained"
                onClick={handleGenerate}
                disabled={!generationPrompt || isUploading}
                startIcon={isUploading ? <CircularProgress size={20} /> : <ImageIcon />}
              >
                Generate
              </Button>
              {generatedImage && (
                <Box sx={{ mt: 2 }}>
                  <img
                    src={generatedImage}
                    alt="Generated"
                    style={{ maxWidth: '100%', maxHeight: 300, objectFit: 'contain' }}
                  />
                  <Button
                    variant="contained"
                    color="success"
                    onClick={handleUseGenerated}
                    sx={{ mt: 1 }}
                  >
                    Use Generated Image
                  </Button>
                </Box>
              )}
            </Box>

            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle1" gutterBottom>
                Upload Image
              </Typography>
              <input
                accept="image/*"
                id="image-upload"
                type="file"
                style={{ display: 'none' }}
                onChange={handleFileUpload}
              />
              <label htmlFor="image-upload">
                <Button
                  variant="contained"
                  component="span"
                  disabled={isUploading}
                  startIcon={isUploading ? <CircularProgress size={20} /> : <UploadIcon />}
                >
                  Upload
                </Button>
              </label>

              {uploadedImage && (
                <Box sx={{ mt: 2 }}>
                  <img
                    src={uploadedImage}
                    alt="Uploaded"
                    style={{ maxWidth: '100%', maxHeight: 300, objectFit: 'contain' }}
                  />
                  <Button
                    variant="contained"
                    color="success"
                    onClick={handleUseUploaded}
                    sx={{ mt: 1 }}
                  >
                    Use Uploaded Image
                  </Button>
                </Box>
              )}
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={!!success}
        autoHideDuration={3000}
        onClose={() => setSuccess(null)}
        message={success}
      />
    </>
  );
};

export default ImageUploadDialog;