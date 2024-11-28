import React, { useState, useEffect } from 'react';
import {useLocation, useNavigate, useParams} from 'react-router-dom';
import {
  Container,
  Box,
  Button,
  Typography,
  TextField,
  CircularProgress,
  Alert,
  AppBar,
  Toolbar,
} from '@mui/material';
import { useCategoryActions } from '../../hooks/useCategory';

const CategoryEditor = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { createCategory, updateCategory } = useCategoryActions();
  const [category, setCategory] = useState({});
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (location.state) {
      setCategory(location.state);
    }

    if (id && category) {
      setFormData({
        name: category.name,
      });
    }
  }, [id, category, location]);

  const handleMainFieldChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      setError('Cover image is required');
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    setError(null);
    if (!validateForm()) return;

    try {
      setSaving(true);
      if (id) {
        await updateCategory(id, formData.name);
      } else {
        await createCategory(formData.name);
      }
      navigate('/admin/category');
    } catch (err) {
      setError(err.info?.message || 'Error saving category');
    } finally {
      setSaving(false);
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flex: 1 }}>
            {id ? 'Edit Category' : 'Create New Category'}
          </Typography>
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
          label="Category Name"
          value={formData.name}
          onChange={(e) => handleMainFieldChange('name', e.target.value)}
          margin="normal"
          required
        />

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 3 }}>
          <Button
            variant="outlined"
            onClick={() => navigate('/admin/category')}
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
    </Box>
  );
};

export default CategoryEditor;