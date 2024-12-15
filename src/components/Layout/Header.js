import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';
const Header = () => {
  return (
    <AppBar position="fixed">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
        MrOgo API Documentation
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;