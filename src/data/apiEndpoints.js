export const endpoints = {
  authentication: [
    {
      title: "Login",
      description: "As in the example, a token is obtained with the credential information given to you by us with the post request and a request is made to other api endpoints with this token.",
      path: "/login",
      method: "POST",
      requestParams: [
        {
          name: "asdsadsa",
          type: "string",
          required: true,
          description: "asdsadsa"
        },
        {
          name: "password",
          type: "string",
          required: true,
          description: "Password"
        }
      ],
      responseParams: [
        {
          name: "status",
          type: "boolean",
          description: "Operation status"
        },
        {
          name: "url",
          type: "string",
          description: "Generated payment URL"
        },
        {
          name: "transaction_id",
          type: "string",
          description: "Transaction ID"
        },
        {
          name: "token",
          type: "string",
          description: "Operation token"
        }
      ]
    }
  ],
  orders: [
    {
      path: '/generate-url',
      method: 'POST',
      title: 'Generate URL',
      description: 'Creates URL for the payment page.',
      requestParams: [
        {
          name: "asdsadsa",
          type: "string",
          required: true,
          description: "asdsadsa"
        },
        {
          name: "password",
          type: "string",
          required: true,
          description: "Password"
        }
      ],
      responseParams: [
        {
          name: "status",
          type: "boolean",
          description: "Operation status"
        },
        {
          name: "url",
          type: "string",
          description: "Generated payment URL"
        },
        {
          name: "transaction_id",
          type: "string",
          description: "Transaction ID"
        },
        {
          name: "token",
          type: "string",
          description: "Operation token"
        }
      ]
    },
    {
      path: '/order-save',
      method: 'POST',
      title: 'Save Order',
      description: 'Creates a new order in the system.',
      requestParams: [
        {
          name: "asdsadsa",
          type: "string",
          required: true,
          description: "asdsadsa"
        },
        {
          name: "password",
          type: "string",
          required: true,
          description: "Password"
        }
      ],
      responseParams: [
        {
          name: "status",
          type: "boolean",
          description: "Operation status"
        },
        {
          name: "url",
          type: "string",
          description: "Generated payment URL"
        },
        {
          name: "transaction_id",
          type: "string",
          description: "Transaction ID"
        },
        {
          name: "token",
          type: "string",
          description: "Operation token"
        }
      ]
    },
    {
      path: '/order-status/:transaction_id',
      method: 'GET',
      title: 'Order Status',
      description: 'Get the current status of an order.',
      requestParams: [
        {
          name: "asdsadsa",
          type: "string",
          required: true,
          description: "asdsadsa"
        },
        {
          name: "password",
          type: "string",
          required: true,
          description: "Password"
        }
      ],
      responseParams: [
        {
          name: "status",
          type: "boolean",
          description: "Operation status"
        },
        {
          name: "url",
          type: "string",
          description: "Generated payment URL"
        },
        {
          name: "transaction_id",
          type: "string",
          description: "Transaction ID"
        },
        {
          name: "token",
          type: "string",
          description: "Operation token"
        }
      ]
    },
    {
      path: '/order-sms',
      method: 'POST',
      title: 'Order SMS',
      description: 'Send SMS notification for an order.',
      requestParams: [
        {
          name: "asdsadsa",
          type: "string",
          required: true,
          description: "asdsadsa"
        },
        {
          name: "password",
          type: "string",
          required: true,
          description: "Password"
        }
      ],
      responseParams: [
        {
          name: "status",
          type: "boolean",
          description: "Operation status"
        },
        {
          name: "url",
          type: "string",
          description: "Generated payment URL"
        },
        {
          name: "transaction_id",
          type: "string",
          description: "Transaction ID"
        },
        {
          name: "token",
          type: "string",
          description: "Operation token"
        }
      ]
    }
  ],
  withdrawals: [
    {
      title: "Create Withdrawal",
      description: "Creates a new withdrawal request.",
      method: 'POST',
      path: '/withdrawal-save',
      request: {
        transaction_id: "12345",
        trader: "trader1",
        sender_name: "John Doe",
        sender_id: "ID123",
        amount: 100.50,
        card_no: "4111111111111111",
        expiry_date: "12/24"
      },
      response: {
        status: true,
        result: "Withdrawal successfully saved",
        id: 1
      }
    },
    {
      method: 'GET',
      path: '/withdrawal-status/:transaction_id',
      description: 'Withdrawal status inquiry',
      response: {
        status: true,
        id: 1,
        transaction_id: "12345",
        transaction_status: "pending",
        amount_received: 100.50,
        comment: "Processing",
        result: "success"
      }
    }
  ],
  reports: [
    {
      method: 'GET',
      path: '/filter-download-orders',
      description: '',
      request: {
        result: "success",
        begin_time: "2024-01-01",
        end_time: "2024-01-31"
      },
      response: "CSV Dosyası"
    },
    {
      method: 'GET',
      path: '/filter-download-withdrawals',
      description: 'Filter and download withdrawal reports',
      request: {
        result: "success",
        begin_time: "2024-01-01",
        end_time: "2024-01-31"
      },
      response: "CSV Dosyası"
    }
  ],
  balance: [
    {
      method: 'GET',
      path: '/balance',
      description: 'User balance inquiry',
      response: {
        status: true,
        userId: 1,
        BalanceUSD: 1000.50
      }
    }
  ]
}; 