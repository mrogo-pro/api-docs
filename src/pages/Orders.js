import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import EndpointCard from '../components/ApiEndpoint/EndpointCard';
import { endpoints } from '../data/apiEndpoints';

const Orders = () => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Sipariş API Endpointleri
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Sipariş oluşturma, durum sorgulama ve filtreleme işlemleri için kullanılan endpointler
        </Typography>
      </Box>

      {endpoints.orders.map((endpoint, index) => (
        <EndpointCard key={index} endpoint={endpoint} />
      ))}
    </Container>
  );
};

export default Orders; 