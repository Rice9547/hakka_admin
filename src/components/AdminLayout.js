import React from 'react';
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Tabs,
  Tab,
  Button,
} from '@mui/material';
import { Logout as LogoutIcon } from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export const AdminLayout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();

  const currentTab = location.pathname.search( '/admin/category') === 0 ? 1 : 0;

  const handleTabChange = (event, newValue) => {
    navigate(newValue === 1 ? '/admin/category' : '/admin/story');
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <AppBar position="static">
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Box sx={{ flex: 1 }}>
            <Typography variant="h6">Story Admin</Typography>
            <Tabs
              value={currentTab}
              onChange={handleTabChange}
              sx={{
                minHeight: 0,
                '& .MuiTab-root': {
                  color: 'rgba(255, 255, 255, 0.7)',
                  '&.Mui-selected': { color: 'white' }
                }
              }}
            >
              <Tab label="Stories" onClick={() => navigate('/admin/story')} />
              <Tab label="Categories" onClick={() => navigate('/admin/category')} />
            </Tabs>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography variant="body2">
              {user?.email}
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
      {children}
    </Box>
  );
};
