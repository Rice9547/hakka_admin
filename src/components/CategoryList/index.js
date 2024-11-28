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
import { useCategories, useCategoryActions } from '../../hooks/useCategory';
import CategoryItem from './CategoryItem';

const CategoryList = ({ onEdit, onCreateNew }) => {
  const { categories, isLoading, isError } = useCategories();
  const { deleteCategory } = useCategoryActions();

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      try {
        await deleteCategory(id);
      } catch (error) {
        console.error('Error deleting category:', error);
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
          <Typography variant="h4" component="h1">Categories</Typography>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={onCreateNew}
          >
            New Category
          </Button>
        </Box>

        <Paper>
          {isLoading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
              <CircularProgress />
            </Box>
          ) : (
            <List>
              {categories.map(category => (
                <CategoryItem
                  key={category.id}
                  category={category}
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

export default CategoryList;