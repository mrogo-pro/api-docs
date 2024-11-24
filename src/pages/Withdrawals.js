import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import EndpointCard from '../components/ApiEndpoint/EndpointCard';
import { endpoints } from '../data/apiEndpoints';

const Withdrawals = () => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Para Çekme API Endpointleri
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Para çekme işlemleri, durum sorgulama ve filtreleme için kullanılan endpointler
        </Typography>
      </Box>

      {endpoints.withdrawals.map((endpoint, index) => (
        <EndpointCard key={index} endpoint={endpoint} />
      ))}
    </Container>
  );
};

export default Withdrawals; 