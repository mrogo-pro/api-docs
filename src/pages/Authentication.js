import React from 'react';
import { Container, Typography } from '@mui/material';
import EndpointCard from '../components/ApiEndpoint/EndpointCard';
import { endpoints } from '../data/apiEndpoints';

const Authentication = () => {
  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom>
        Kimlik Doğrulama
      </Typography>
      {endpoints.authentication.map((endpoint, index) => (
        <EndpointCard key={index} endpoint={endpoint} />
      ))}
    </Container>
  );
};

export default Authentication; 