import React from 'react';
import { Container, Typography, Box, Paper } from '@mui/material';

const Home = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          API Dokümantasyonu
        </Typography>
        
        <Typography variant="body1" paragraph>
          Bu dokümantasyon, sistemimizin API endpoints'lerini ve nasıl kullanılacaklarını detaylı bir şekilde açıklamaktadır.
        </Typography>

        <Box sx={{ mt: 4 }}>
          <Typography variant="h5" gutterBottom>
            Başlarken
          </Typography>
          <Typography variant="body1" paragraph>
            API'yi kullanmaya başlamadan önce bir kimlik doğrulama token'ı almanız gerekmektedir. 
            Bunun için Authentication bölümüne göz atın.
          </Typography>
        </Box>

        <Box sx={{ mt: 4 }}>
          <Typography variant="h5" gutterBottom>
            Base URL
          </Typography>
          <Typography variant="body1" component="code" sx={{ 
            backgroundColor: '#f5f5f5',
            padding: '4px 8px',
            borderRadius: '4px'
          }}>
            https://api-base-url.com
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default Home; 