import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Container,
  Box,
  Button,
  Typography,
  TextField,
  Paper,
  IconButton,
  CircularProgress,
  Alert,
  AppBar,
  Toolbar,
} from '@mui/material';
import {
  Add as AddIcon,
  Visibility as VisibilityIcon,
} from '@mui/icons-material';
import { useStory, useStoryActions } from '../../hooks/useStory';
import PageEditor from './PageEditor';
import PreviewDialog from './PreviewDialog';
import ImageInput from "./ImageInput";

const StoryEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { story, isLoading, isError } = useStory(id);
  const { createStory, updateStory } = useStoryActions();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    cover_image: '',
    pages: []
  });
  const [previewOpen, setPreviewOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id && story) {
      setFormData({
        title: story.title || '',
        description: story.description || '',
        cover_image: story.cover_image || '',
        pages: (story.pages || []).map(page => ({
          content_cn: page.content_cn || '',
          content_hakka: page.content_hakka || '',
          page_number: page.page_number,
          audios: (page.audios || []).reduce((acc, audio) => {
            acc[audio.dialect] = audio.audio_url;
            return acc;
          }, {})
        }))
      });
    }
  }, [id, story]);

  const handleAddPage = () => {
    setFormData(prev => ({
      ...prev,
      pages: [
        ...prev.pages,
        {
          content_cn: '',
          content_hakka: '',
          page_number: prev.pages.length + 1,
          audios: {}
        },
      ]
    }));
  };

  const handleDeletePage = (indexToDelete) => {
    setFormData(prev => ({
      ...prev,
      pages: prev.pages
        .filter((_, index) => index !== indexToDelete)
        .map((page, index) => ({
          ...page,
          page_number: index + 1
        }))
    }));
  };

  const handleMovePage = (index, direction) => {
    const newPages = [...formData.pages];
    if (direction === 'up' && index > 0) {
      [newPages[index], newPages[index - 1]] = [newPages[index - 1], newPages[index]];
    } else if (direction === 'down' && index < newPages.length - 1) {
      [newPages[index], newPages[index + 1]] = [newPages[index + 1], newPages[index]];
    }
    newPages.forEach((page, i) => {
      page.page_number = i + 1;
    });
    setFormData(prev => ({ ...prev, pages: newPages }));
  };

  const handleMainFieldChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePageContentChange = (index, field, value) => {
    setFormData(prev => {
      const newPages = [...prev.pages];
      newPages[index] = {
        ...newPages[index],
        [field]: value
      };
      return {
        ...prev,
        pages: newPages
      };
    });
  };

  const handlePageAudioChange = (index, dialect, value) => {
    setFormData(prev => {
      const newPages = [...prev.pages];
      newPages[index] = {
        ...newPages[index],
        audios: {
          ...newPages[index].audios,
          [dialect]: value
        }
      };
      return {
        ...prev,
        pages: newPages
      };
    });
  };

  const validateForm = () => {
    if (!formData.title.trim()) {
      setError('Title is required');
      return false;
    }
    if (!formData.description.trim()) {
      setError('Description is required');
      return false;
    }
    if (formData.pages.length === 0) {
      setError('At least one page is required');
      return false;
    }
    for (const page of formData.pages) {
      if (!page.content_cn.trim() || !page.content_hakka.trim()) {
        setError('All pages must have both Chinese and Hakka content');
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async () => {
    setError(null);
    if (!validateForm()) return;

    try {
      setSaving(true);
      if (id) {
        await updateStory(id, formData.title, formData.description, formData.cover_image, formData.pages);
      } else {
        await createStory(formData.title, formData.description, formData.cover_image, formData.pages);
      }
      navigate('/admin');
    } catch (err) {
      setError(err.info?.message || 'Error saving story');
    } finally {
      setSaving(false);
    }
  };

  if (id && isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (id && isError) {
    return (
      <Container maxWidth="sm" sx={{ mt: 4 }}>
        <Alert severity="error">
          Error loading story. Please try again later.
        </Alert>
      </Container>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flex: 1 }}>
            {id ? 'Edit Story' : 'Create New Story'}
          </Typography>
          <IconButton
            color="inherit"
            onClick={() => setPreviewOpen(true)}
            disabled={formData.pages.length === 0}
          >
            <VisibilityIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Container maxWidth="md" sx={{ py: 4 }}>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <TextField
          fullWidth
          label="Story Title"
          value={formData.title}
          onChange={(e) => handleMainFieldChange('title', e.target.value)}
          margin="normal"
          required
        />

        <TextField
          fullWidth
          label="Story Description"
          value={formData.description}
          onChange={(e) => handleMainFieldChange('description', e.target.value)}
          margin="normal"
          multiline
          rows={3}
          required
        />

        <ImageInput
          value={formData.cover_image}
          onChange={(url) => handleMainFieldChange('cover_image', url)}
          description={formData.description}
        />

        <Paper sx={{ p: 2, mt: 2 }}>
          {formData.pages.map((page, index) => (
            <PageEditor
              key={`page-${page.page_number}`}  // 使用更明確的 key
              page={page}
              onDelete={() => handleDeletePage(index)}
              onMove={(direction) => handleMovePage(index, direction)}
              onContentChange={(field, value) => handlePageContentChange(index, field, value)}
              onAudioChange={(dialect, value) => handlePageAudioChange(index, dialect, value)}
              isFirst={index === 0}
              isLast={index === formData.pages.length - 1}
            />
          ))}

          <Button
            fullWidth
            variant="outlined"
            startIcon={<AddIcon />}
            onClick={handleAddPage}
            sx={{ mt: 2 }}
          >
            Add Page
          </Button>
        </Paper>

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 3 }}>
          <Button
            variant="outlined"
            onClick={() => navigate('/admin')}
            disabled={saving}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            disabled={saving}
          >
            {saving ? <CircularProgress size={24} /> : 'Save'}
          </Button>
        </Box>
      </Container>

      <PreviewDialog
        open={previewOpen}
        onClose={() => setPreviewOpen(false)}
        story={formData}
        pages={formData.pages}
      />
    </Box>
  );
};

export default StoryEditor;