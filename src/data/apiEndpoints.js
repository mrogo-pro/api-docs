export const endpoints = {
  authentication: [
    {
      method: 'POST',
      path: '/login',
      description: 'Kullanıcı girişi ve JWT token alma',
      request: {
        username: 'string',
        password: 'string',
      },
      response: {
        token: 'string',
      },
    },
  ],
  orders: [
    {
      method: 'POST',
      path: '/order-save',
      description: 'Yeni sipariş oluşturma',
      request: {
        transaction_id: 'string',
        trader: 'string',
        sender_name: 'string',
        sender_id: 'string',
        amount: 'number',
        card_no: 'string',
        expiry_date: 'string',
        cvv: 'string',
      },
      response: {
        status: 'boolean',
        result: 'string',
        id: 'number',
      },
      example: {
        status: true,
        result: 'success',
        id: 123,
      },
    },
    // Diğer order endpointleri...
  ],
  withdrawals: [
    // Withdrawal endpointleri...
  ],
}; 