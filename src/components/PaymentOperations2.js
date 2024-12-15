import React from 'react';
import EndpointCard from './EndpointCard';

const PaymentOperations2 = () => {
  const endpoints = [
    {
      path: '/generate-url',
      title: 'Generate URL',
      description: 'Generate a payment URL.',
      method: 'POST'
    },
    {
      path: '/order-status/:transaction_id',
      title: 'Order Status',
      description: 'Check the status of an existing order.',
      method: 'GET'
    },
    {
      path: '/withdrawal-status/:transaction_id',
      title: 'Withdrawal Status',
      description: 'Check the status of a withdrawal.',
      method: 'GET'
    }
  ];

  return (
    <div>
      {endpoints.map(endpoint => (
        <EndpointCard 
          key={endpoint.path} 
          endpoint={endpoint}
          section="operations"
        />
      ))}
    </div>
  );
};

export default PaymentOperations2; 