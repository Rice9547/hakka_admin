import { useAuth0 } from '@auth0/auth0-react';
import { Navigate } from 'react-router-dom';
import {
  Box,
  Container,
  Paper,
  Typography,
  Button,
  CircularProgress
} from '@mui/material';
import { Login as LoginIcon } from '@mui/icons-material';

export const LoginPage = () => {
  const { isAuthenticated, loginWithRedirect, isLoading } = useAuth0();

  if (isLoading) {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: 'background.default'
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (isAuthenticated) {
    return <Navigate to="/admin" />;
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'background.default'
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={3}
          sx={{
            p: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography
            component="h1"
            variant="h4"
            sx={{
              mb: 4,
              fontWeight: 'bold',
            }}
          >
            Hakka Admin Dashboard
          </Typography>

          <Button
            variant="contained"
            size="large"
            startIcon={<LoginIcon />}
            onClick={() => loginWithRedirect()}
            fullWidth
            sx={{
              py: 1.5,
              textTransform: 'none',
              fontSize: '1.1rem'
            }}
          >
            Sign in
          </Button>
        </Paper>
      </Container>
    </Box>
  );
};