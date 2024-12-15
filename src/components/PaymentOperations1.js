import React from 'react';
import EndpointCard from './EndpointCard';

const PaymentOperations1 = () => {
  const endpoints = [
    {
      path: '/order-save',
      title: 'Order Save',
      description: 'Creates a new order in the system.',
      method: 'POST'
    },
    {
      path: '/order-status/:transaction_id',
      title: 'Order Status',
      description: 'Check the status of an existing order.',
      method: 'GET'
    },
    {
      path: '/order-sms',
      title: 'Order SMS',
      description: 'Send SMS notification for an order.',
      method: 'POST'
    },
    {
      path: '/withdrawal-save',
      title: 'Withdrawal Save',
      description: 'Save a new withdrawal request.',
      method: 'POST'
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

export default PaymentOperations1; 