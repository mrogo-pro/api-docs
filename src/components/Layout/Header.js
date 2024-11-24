import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <AppBar position="fixed">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          API Dokümantasyonu
        </Typography>
        <Box>
          <Button color="inherit" component={Link} to="/">
            Ana Sayfa
          </Button>
          <Button color="inherit" component={Link} to="/authentication">
            Kimlik Doğrulama
          </Button>
          <Button color="inherit" component={Link} to="/orders">
            Siparişler
          </Button>
          <Button color="inherit" component={Link} to="/withdrawals">
            Para Çekme
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;