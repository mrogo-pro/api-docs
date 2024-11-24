import React from 'react';
import { Chip } from '@mui/material';

const methodColors = {
  GET: '#61affe',
  POST: '#49cc90',
  PUT: '#fca130',
  DELETE: '#f93e3e',
};

const MethodBadge = ({ method }) => {
  return (
    <Chip
      label={method}
      sx={{
        backgroundColor: methodColors[method] || '#999999',
        color: '#fff',
        fontWeight: 'bold',
      }}
    />
  );
};

export default MethodBadge; 