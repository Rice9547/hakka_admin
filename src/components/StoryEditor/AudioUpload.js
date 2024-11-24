import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  TextField,
  Button,
  IconButton,
  Typography,
  CircularProgress,
  Alert,
} from '@mui/material';
import {
  Upload as UploadIcon,
  PlayArrow as PlayIcon,
  Pause as PauseIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import { useAudioUpload } from "../../api/audio";

const AudioUpload = ({ value, onChange, label, disabled, pageNumber }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(new Audio());
  const fileInputRef = useRef(null);

  const { uploadAudio } = useAudioUpload();

  const inputId = `audio-upload-${label}-page-${pageNumber}`;

  const handleUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('audio', file);

    try {
      setIsUploading(true);
      setError(null);

      const data = await uploadAudio(formData);
      onChange(data.url);
    } catch (err) {
      setError('Failed to upload audio');
      console.error('Upload error:', err);
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const togglePlay = () => {
    if (!value) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      document.querySelectorAll('audio').forEach(audio => {
        if (audio !== audioRef.current) {
          audio.pause();
        }
      });

      audioRef.current.src = value;
      audioRef.current.play().catch(e => {
        console.error('Playback failed:', e);
        setError('Failed to play audio');
      });
    }
  };

  const handleDelete = () => {
    if (isPlaying) {
      audioRef.current.pause();
    }
    onChange('');
    setError(null);
  };

  useEffect(() => {
    const audio = audioRef.current;

    return () => {
      audio.pause();
      audio.src = '';
    };
  }, []);

  useEffect(() => {
    const audio = audioRef.current;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleEnded = () => setIsPlaying(false);

    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('ended', handleEnded);

    const handleOtherPlay = (e) => {
      if (e.target !== audio) {
        audio.pause();
      }
    };
    document.addEventListener('play', handleOtherPlay, true);

    return () => {
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('ended', handleEnded);
      document.removeEventListener('play', handleOtherPlay, true);
      if (audio.src) {
        audio.pause();
      }
    };
  }, [pageNumber]);

  return (
    <Box sx={{ mb: 2 }}>
      <Typography variant="subtitle2" gutterBottom>
        {label}
      </Typography>

      <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
        <TextField
          size="small"
          fullWidth
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Audio URL"
          disabled={disabled}
        />

        <input
          ref={fileInputRef}
          accept="audio/*"
          id={inputId}
          type="file"
          style={{ display: 'none' }}
          onChange={handleUpload}
          disabled={disabled || isUploading}
        />

        <label htmlFor={inputId}>
          <Button
            variant="outlined"
            component="span"
            disabled={disabled || isUploading}
            startIcon={isUploading ? <CircularProgress size={20} /> : <UploadIcon />}
            size="small"
          >
            Upload
          </Button>
        </label>

        {value && (
          <>
            <IconButton
              onClick={togglePlay}
              disabled={disabled}
              size="small"
            >
              {isPlaying ? <PauseIcon /> : <PlayIcon />}
            </IconButton>

            <IconButton
              onClick={handleDelete}
              disabled={disabled}
              size="small"
              color="error"
            >
              <DeleteIcon />
            </IconButton>
          </>
        )}
      </Box>

      {error && (
        <Alert
          severity="error"
          sx={{ mt: 1 }}
          onClose={() => setError(null)}
        >
          {error}
        </Alert>
      )}
    </Box>
  );
};

export default AudioUpload;