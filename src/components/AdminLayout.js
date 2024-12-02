import React, {useCallback, useEffect} from 'react';
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Tabs,
  Tab,
  Button, Alert,
} from '@mui/material';
import { Logout as LogoutIcon } from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export const AdminLayout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isAdmin, logout } = useAuth();
  const [ currentTab, setCurrentTab ] = React.useState(0);

  const handleTabChange = (event, newValue) => {
    navigate(newValue === 1 ? '/admin/category' : '/admin/story');
  };

  const getCurrentTab = useCallback(() => {
    const pathname = location.pathname;
    switch (true) {
      case /^\/admin\/story\/(?:[^/]+\/)?exercises(?:\/|$)/.test(pathname):
        return 2;
      case /^\/admin\/category/.test(pathname):
        return 1;
      default:
        return 0;
    }
  }, [location.pathname]);

  useEffect(() => {
    setCurrentTab(getCurrentTab());
  }, [location.pathname, getCurrentTab]);

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <AppBar position="static">
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Box sx={{ flex: 1 }}>
            <Typography variant="h6">Hakka Admin</Typography>
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
              <Tab label="Exercises" onClick={() => navigate('/admin/story/exercises')} />
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
      {isAdmin ? children : <Alert severity="error">
        You are not authorized to access this page.
      </Alert>}
    </Box>
  );
};
