import React from 'react';
import { Box, CssBaseline } from '@mui/material';
import Header from './Header';
import Sidebar from './Sidebar';


const Layout = ({ children }) => {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Header />
      <Sidebar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          backgroundColor: '#f8f9fa',
          minHeight: '100vh',
          width: { 
            xs: '100%',
            sm: `calc(100% - 280px)`,
            lg: `calc(100% - 680px)`
          },
          marginLeft: { xs: 0, sm: '280px' },
          marginTop: '64px',
          padding: '24px 40px',
        }}
      >
        {children}
      </Box>

    </Box>
  );
};

export default Layout; 