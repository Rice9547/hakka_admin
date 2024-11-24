import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Alert,
} from '@mui/material';
import { Logout as LogoutIcon } from '@mui/icons-material';
import { useAuth } from '../hooks/useAuth';
import StoryList from '../components/StoryList';

export const AdminDashboard = () => {
  const { user, isAdmin, logout } = useAuth();
  const navigate = useNavigate();

  if (!isAdmin) {
    return (
      <Container maxWidth="sm" sx={{ mt: 4 }}>
        <Alert severity="error">
          You are not authorized to access this page.
        </Alert>
      </Container>
    );
  }

  const handleEdit = (id) => {
    navigate(`/admin/story/${id}`);
  };

  const handleCreate = () => {
    navigate('/admin/story/new');
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <AppBar position="static">
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Typography variant="h6">Story Admin</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography variant="body2">
              {user.email}
            </Typography>
            <Button
              color="inherit"
              startIcon={<LogoutIcon />}
              onClick={() => logout({ returnTo: window.location.origin })}
            >
              Logout
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      <StoryList
        onEdit={handleEdit}
        onCreateNew={handleCreate}
      />
    </Box>
  );
};