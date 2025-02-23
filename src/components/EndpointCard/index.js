import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Button, 
  IconButton, 
  Collapse,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  useMediaQuery
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import WarningIcon from '@mui/icons-material/Warning';

const EndpointCard = ({ endpoint, section }) => {
  const [testResponse, setTestResponse] = useState(null);
  const [activeResponse, setActiveResponse] = useState('200');
  const [showUrl, setShowUrl] = useState(true);
  // eslint-disable-next-line
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [selectedLanguage, setSelectedLanguage] = useState('javascript');
  const [responseData, setResponseData] = useState(null);

  const handleSuccessResponse = () => {
    if (endpoint.path === '/login') {
      setTestResponse({
        status: 200,
        data: {
          token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
        }
      });
    }
    else if (endpoint.path === '/order-save') {
      setTestResponse({
        status: 200,
        data: {
          status: true,
          result: "Order successfully saved",
          id: "123456"
        }
      });
    }
    else if (endpoint.path === '/generate-url') {
      setTestResponse({
        status: 200,
        data: {
          status: true,
          url: "https://pay-test.mrogo.net/TR123456?amount=100.50&type=order&token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
          transaction_id: "TR123456",
          type: "order",
          token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
        }
      });
    }
    else if (endpoint.path === '/save-card-details') {
      setTestResponse({
        status: 200,
        data: {
          status: true,
          message: "Card details saved and order created",
          orderId: "123456"
        }
      });
    }
    else if (endpoint.path.startsWith('/order-status')) {
      setTestResponse({
        status: 200,
        data: {
          status: true,
          id: "123456",
          transaction_id: "TR123456",
          transaction_status: "finished",
          amount_received: "100.50",
          comment: "İşlem başarıyla tamamlandı",
          result: "success"
        }
      });
    }
    else if (endpoint.path === '/order-sms') {
      setTestResponse({
        status: 200,
        data: {
          status: true,
          result: "SMS successfully saved"
        }
      });
    }
  };

  const handleErrorResponse = () => {
    if (endpoint.path === '/login') {
      setTestResponse({
        status: 401,
        data: {
          message: "Invalid username or password"
        }
      });
    }
    else if (endpoint.path === '/order-save') {
      setTestResponse({
        status: 400,
        data: {
          errors: {
            "400": "Bad Request - Request format is invalid or missing parameters",
            "401": "Unauthorized - Authorization failed",
            "403": "Forbidden - You do not have permission for this operation",
            "404": "Not Found - Operation not found",
            "405": "Method Not Allowed - HTTP method is not supported",
            "500": "Internal Server Error - Server error"
          }
        }
      });
    }
    else if (endpoint.path === '/generate-url') {
      setTestResponse({
        status: 400,
        data: {
          errors: {
            "400": "Bad Request - Request format is invalid or missing parameters",
            "401": "Unauthorized - Authorization failed",
            "403": "Forbidden - You do not have permission for this operation",
            "404": "Not Found - Operation not found",
            "405": "Method Not Allowed - HTTP method is not supported",
            "409": "Conflict - A transaction has already been created with this transaction_id",
            "500": "Internal Server Error - Server error"
          }
        }
      });
    }
    else if (endpoint.path === '/save-card-details') {
      setTestResponse({
        status: 400,
        data: {
          errors: {
            "400": "Bad Request - Request format is invalid or missing parameters",
            "401": "Unauthorized - Authorization failed",
            "403": "Forbidden - You do not have permission for this operation",
            "404": "Not Found - Operation not found",
            "500": "Internal Server Error - Server error"
          }
        }
      });
    }
    else if (endpoint.path.startsWith('/order-status')) {
      setTestResponse({
        status: 400,
        data: {
          errors: {
            "400": "Bad Request - Request format is invalid or missing parameters",
            "401": "Unauthorized - Authorization failed",
            "403": "Forbidden - You do not have permission for this operation",
            "404": "Not Found - Order not found",
            "405": "Method Not Allowed - HTTP method is not supported",
            "500": "Internal Server Error - Server error"
          }
        }
      });
    }
    else if (endpoint.path === '/order-sms') {
      setTestResponse({
        status: 400,
        data: {
          errors: {
            "400": "Bad Request - Request format is invalid or missing parameters",
            "401": "Unauthorized - Authorization failed",
            "403": "Forbidden - You do not have permission for this operation",
            "404": "Not Found - Order status not found",
            "500": "Internal Server Error - Server error"
          }
        }
      });
    }
  };

  const handleResponseChange = (status) => {
    setActiveResponse(status);
    if (status === '200') {
      handleSuccessResponse();
    } else {
      handleErrorResponse();
    }
    if (endpoint.path === '/withdrawal-save') {
      if (status === '200') {
        setResponseData({
          status: true,
          result: "Withdrawal successfully saved",
          id: 123,
        });
      } else if (status === '400') {
        setResponseData({
          status: false,
          error: "Missing parameters: sender_name, card_no",
        });
      }
    } else if (endpoint.path === '/withdrawal-status/:transaction_id') {
      if (status === '200') {
        setResponseData({
          status: true,
          id: 123,
          transaction_id: "789456",
          transaction_status: "Completed",
          amount_received: 1000,
          comment: "Withdrawal processed",
          result: "Success"
        });
      } else if (status === '400') {
        setResponseData({
          status: false,
          error: "Invalid transaction ID",
        });
      }
    } else {
      setResponseData(null);
    }
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
  };

  const getPayloadBody = () => {
    switch (endpoint.path) {
      case '/generate-url':
        return `{
  "transaction_id": "12345",
  "amount": 100.5,
  "type": "order"
}`;
      case '/order-save':
        if (paymentMethod === 'card') {
          return `{
  "transaction_id": "123456",
  "trader": "trader1",
  "sender_name": "John Doe",
  "sender_id": "ID123",
  "amount": 100.5,
  "payment_method": "card",
  "card_no": "4111111111111111",
  "expiry_date": "12/24",
  "cvv": "123"
}`;
        } else {
          return `{
  "transaction_id": "12345",
  "trader": "trader1",
  "sender_name": "John Doe",
  "sender_id": "ID123",
  "amount": 100.5,
  "payment_method": "bank",
  "bank_id": "1",
  "iban": "TR123456789012345678901234"
}`;
        }
      case '/login':
        return `{
  "username": "string",
  "password": "string"
}`;
      default:
        return '{}';
    }
  };

  const renderPaymentMethodSelector = () => {
    if (endpoint.path === '/order-save') {
      return null;
    }
    return null;
  };

  const urlExamples = {
    javascript: `const url = "https://pay-test.mrogo.net/TR123456?amount=100.50&type=order";
fetch(url, {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer your-token-here'
  }
})
.then(response => response.json())
.then(data => console.log(data));`,
    
    python: `import requests

url = "https://pay-test.mrogo.net/TR123456?amount=100.50&type=order"
headers = {
    'Authorization': 'Bearer your-token-here'
}

response = requests.get(url, headers=headers)
print(response.json())`,
    
    nodejs: `const axios = require('axios');

const url = "https://pay-test.mrogo.net/TR123456?amount=100.50&type=order";
const config = {
  headers: { 'Authorization': 'Bearer your-token-here' }
};

axios.get(url, config)
  .then(response => console.log(response.data))
  .catch(error => console.error(error));`
  };

  const isMobile = useMediaQuery('(max-width:600px)'); // Check if the screen is mobile

  // If this is the main/intro section, render the welcome content
  if (section === 'intro') {
    return (
      <Box sx={{ p: 4 }}>
        <Typography variant="h3" sx={{ mb: 4 }}>
          Mrogo API Documentation
        </Typography>

        <Box sx={{ mb: 6 }}>
          <Typography variant="h4" sx={{ mb: 2 }}>
            Giriş
          </Typography>
          <Typography variant="body1" sx={{ mb: 3 }}>
            Bu belge, Mrogo Ödeme Entegrasyonunun kavramsal bir görünümünü sağlamanın yanı sıra, üye işyerleri ve geliştiricilere, ödeme sisteminin çalışma mekanizmasını daha iyi anlamalarında yardımcı olmak için oluşturulmuştur.
          </Typography>
        </Box>

        <Box sx={{ mb: 6 }}>
          <Typography variant="h4" sx={{ mb: 2 }}>
            Amaç
          </Typography>
          <Typography variant="body1" sx={{ mb: 3 }}>
            Bu dokümanın amacı, üye işyerlerinin çeşitli ödeme seçenekleriyle ödeme toplama servisini kullanmaları için, Mrogo ödeme sistemini web sitelerine entegre etmeleri konusunda rehberlik etmektir.
          </Typography>
        </Box>

        <Box sx={{ mb: 6 }}>
          <Typography variant="h4" sx={{ mb: 2 }}>
            Kapsam
          </Typography>
          <Typography variant="body1" sx={{ mb: 3 }}>
            Üye işyeri uygulamaları ve Mrogo Ödeme Sistemi arasındaki entegrasyonun kapsamı, ödeme toplama servisi entegrasyon gereksinimi için fonksiyonel gereksinimlerdir.
          </Typography>
        </Box>

        <Box sx={{ mb: 6 }}>
          <Typography variant="h4" sx={{ mb: 2 }}>
            Withdrawal Reports
          </Typography>
          <Typography variant="body1" sx={{ mb: 3 }}>
            This section provides insights and details regarding withdrawal transactions.
          </Typography>
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex', gap: 4, mb: 6, flexDirection: isMobile ? 'column' : 'row' }}>
      {/* Sol taraf - API Detayları */}
      <Box sx={{ flex: 1 }}>
        {endpoint.path === '/login' && (
          <Box 
            sx={{ 
              bgcolor: '#fff3cd',
              color: '#856404',
              p: 2,
              mb: 3,
              borderRadius: 1,
              display: 'flex',
              alignItems: 'center',
              gap: 1
            }}
          >
            <WarningIcon sx={{ color: '#856404' }} />
            In order to use the transaction marking service, you need basic authentication with secret_key.
          </Box>
        )}

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
          <Typography
            variant="caption"
            sx={{
              bgcolor: endpoint.method === 'POST' ? '#4CAF50' : '#2196F3',
              color: 'white',
              px: 1,
              py: 0.5,
              borderRadius: 1,
              fontWeight: 'bold'
            }}
          >
            {endpoint.method}
          </Typography>
          <Typography sx={{ fontFamily: 'monospace' }}>
            {endpoint.path}
          </Typography>
        </Box>

        <Typography variant="h5" sx={{ mb: 3, color: '#6c757d' }}>
          {endpoint.title}
        </Typography>

        <Typography variant="body1" sx={{ mb: 3 }}>
          {endpoint.description}
        </Typography>

        {endpoint.values && (
          <Box sx={{ mb: 3, pl: 2 }}>
            {endpoint.values.map((value, index) => (
              <Box key={index} sx={{ display: 'flex', gap: 1, mb: 1 }}>
                <Typography sx={{ color: '#dc3545', minWidth: '25px' }}>
                  {value.id} =
                </Typography>
                <Typography>
                  {value.text}
                </Typography>
              </Box>
            ))}
          </Box>
        )}

        {endpoint.notes && endpoint.notes.map((note, index) => (
          <Typography key={index} variant="body1" sx={{ mb: 2 }}>
            {note}
          </Typography>
        ))}

        {endpoint.path === '/login' && (
          <Typography variant="body1" sx={{ mb: 3 }}>
            As in the example, a token is obtained with the credential information given to you by us with the post request and a request is made to other api endpoints with this token.
          </Typography>
        )}

        {endpoint.path === '/login' && (
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" sx={{ mb: 2, color: '#6c757d' }}>
              Request Parameters
            </Typography>
            <TableContainer component={Paper} sx={{ bgcolor: '#2d2d2d' }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ color: '#fff', fontWeight: 'bold', borderBottom: '1px solid #444' }}>Name</TableCell>
                    <TableCell sx={{ color: '#fff', fontWeight: 'bold', borderBottom: '1px solid #444' }}>Type</TableCell>
                    <TableCell sx={{ color: '#fff', fontWeight: 'bold', borderBottom: '1px solid #444' }}>Required</TableCell>
                    <TableCell sx={{ color: '#fff', fontWeight: 'bold', borderBottom: '1px solid #444' }}>Description</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell sx={{ color: '#6c757d' }}>username</TableCell>
                    <TableCell sx={{ color: '#6c757d' }}>string</TableCell>
                    <TableCell sx={{ color: '#6c757d' }}>Yes</TableCell>
                    <TableCell sx={{ color: '#6c757d' }}>User's username.</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ color: '#6c757d' }}>password</TableCell>
                    <TableCell sx={{ color: '#6c757d' }}>string</TableCell>
                    <TableCell sx={{ color: '#6c757d' }}>Yes</TableCell>
                    <TableCell sx={{ color: '#6c757d' }}>User's password.</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        )}

        {endpoint.path === '/generate-url' && (
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" sx={{ mb: 2, color: '#6c757d' }}>
              Request Parameters
            </Typography>
            <TableContainer component={Paper} sx={{ bgcolor: '#2d2d2d' }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ color: '#fff', fontWeight: 'bold', borderBottom: '1px solid #444' }}>Name</TableCell>
                    <TableCell sx={{ color: '#fff', fontWeight: 'bold', borderBottom: '1px solid #444' }}>Type</TableCell>
                    <TableCell sx={{ color: '#fff', fontWeight: 'bold', borderBottom: '1px solid #444' }}>Required</TableCell>
                    <TableCell sx={{ color: '#fff', fontWeight: 'bold', borderBottom: '1px solid #444' }}>Description</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell sx={{ color: '#6c757d' }}>transaction_id</TableCell>
                    <TableCell sx={{ color: '#6c757d' }}>string</TableCell>
                    <TableCell sx={{ color: '#6c757d' }}>Yes</TableCell>
                    <TableCell sx={{ color: '#6c757d' }}>Unique identifier for the transaction.</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ color: '#6c757d' }}>amount</TableCell>
                    <TableCell sx={{ color: '#6c757d' }}>number</TableCell>
                    <TableCell sx={{ color: '#6c757d' }}>Yes</TableCell>
                    <TableCell sx={{ color: '#6c757d' }}>Amount for the transaction.</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ color: '#6c757d' }}>type</TableCell>
                    <TableCell sx={{ color: '#6c757d' }}>string</TableCell>
                    <TableCell sx={{ color: '#6c757d' }}>Yes</TableCell>
                    <TableCell sx={{ color: '#6c757d' }}>Type of transaction: order or withdrawal.</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        )}

        {/* Request Body for /order-save */}
        {endpoint.path === '/order-save' && (
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" sx={{ mb: 2, color: '#6c757d' }}>
              Request Body
            </Typography>
            <TableContainer component={Paper} sx={{ bgcolor: '#2d2d2d' }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ color: '#fff', fontWeight: 'bold', borderBottom: '1px solid #444' }}>Name</TableCell>
                    <TableCell sx={{ color: '#fff', fontWeight: 'bold', borderBottom: '1px solid #444' }}>Type</TableCell>
                    <TableCell sx={{ color: '#fff', fontWeight: 'bold', borderBottom: '1px solid #444' }}>Required</TableCell>
                    <TableCell sx={{ color: '#fff', fontWeight: 'bold', borderBottom: '1px solid #444' }}>Description</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell sx={{ color: '#6c757d' }}>transaction_id</TableCell>
                    <TableCell sx={{ color: '#6c757d' }}>string</TableCell>
                    <TableCell sx={{ color: '#6c757d' }}>Yes</TableCell>
                    <TableCell sx={{ color: '#6c757d' }}>A unique identifier for the transaction.</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ color: '#6c757d' }}>trader</TableCell>
                    <TableCell sx={{ color: '#6c757d' }}>string</TableCell>
                    <TableCell sx={{ color: '#6c757d' }}>Yes</TableCell>
                    <TableCell sx={{ color: '#6c757d' }}>The name of the trader involved in the transaction.</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ color: '#6c757d' }}>sender_name</TableCell>
                    <TableCell sx={{ color: '#6c757d' }}>string</TableCell>
                    <TableCell sx={{ color: '#6c757d' }}>Yes</TableCell>
                    <TableCell sx={{ color: '#6c757d' }}>The name of the person sending the transaction.</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ color: '#6c757d' }}>sender_id</TableCell>
                    <TableCell sx={{ color: '#6c757d' }}>string</TableCell>
                    <TableCell sx={{ color: '#6c757d' }}>Yes</TableCell>
                    <TableCell sx={{ color: '#6c757d' }}>The identification number of the sender.</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ color: '#6c757d' }}>amount</TableCell>
                    <TableCell sx={{ color: '#6c757d' }}>number</TableCell>
                    <TableCell sx={{ color: '#6c757d' }}>Yes</TableCell>
                    <TableCell sx={{ color: '#6c757d' }}>The amount of the transaction.</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ color: '#6c757d' }}>card_no</TableCell>
                    <TableCell sx={{ color: '#6c757d' }}>string</TableCell>
                    <TableCell sx={{ color: '#6c757d' }}>Yes</TableCell>
                    <TableCell sx={{ color: '#6c757d' }}>The card number (e.g., 4111111111111111).</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ color: '#6c757d' }}>expiry_date</TableCell>
                    <TableCell sx={{ color: '#6c757d' }}>string</TableCell>
                    <TableCell sx={{ color: '#6c757d' }}>Yes</TableCell>
                    <TableCell sx={{ color: '#6c757d' }}>The card's expiration date (in MM/YY format).</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ color: '#6c757d' }}>cvv</TableCell>
                    <TableCell sx={{ color: '#6c757d' }}>string</TableCell>
                    <TableCell sx={{ color: '#6c757d' }}>Yes</TableCell>
                    <TableCell sx={{ color: '#6c757d' }}>The card's security code.</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        )}

        {/* Request Body for /order-sms */}
        {endpoint.path === '/order-sms' && (
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" sx={{ mb: 2, color: '#6c757d' }}>
              Request Body
            </Typography>
            <TableContainer component={Paper} sx={{ bgcolor: '#2d2d2d' }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ color: '#fff', fontWeight: 'bold', borderBottom: '1px solid #444' }}>Name</TableCell>
                    <TableCell sx={{ color: '#fff', fontWeight: 'bold', borderBottom: '1px solid #444' }}>Type</TableCell>
                    <TableCell sx={{ color: '#fff', fontWeight: 'bold', borderBottom: '1px solid #444' }}>Required</TableCell>
                    <TableCell sx={{ color: '#fff', fontWeight: 'bold', borderBottom: '1px solid #444' }}>Description</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell sx={{ color: '#6c757d' }}>transaction_id</TableCell>
                    <TableCell sx={{ color: '#6c757d' }}>string</TableCell>
                    <TableCell sx={{ color: '#6c757d' }}>Yes</TableCell>
                    <TableCell sx={{ color: '#6c757d' }}>A unique identifier for the transaction.</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ color: '#6c757d' }}>sms</TableCell>
                    <TableCell sx={{ color: '#6c757d' }}>string</TableCell>
                    <TableCell sx={{ color: '#6c757d' }}>Yes</TableCell>
                    <TableCell sx={{ color: '#6c757d' }}>The content of the SMS to be sent.</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        )}

        {/* Response Parameters */}
        {endpoint.path === '/generate-url' && (
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" sx={{ mb: 2, color: '#6c757d' }}>
              Response Parameters
            </Typography>
            <TableContainer component={Paper} sx={{ bgcolor: '#2d2d2d' }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ color: '#fff', fontWeight: 'bold', borderBottom: '1px solid #444' }}>Name</TableCell>
                    <TableCell sx={{ color: '#fff', fontWeight: 'bold', borderBottom: '1px solid #444' }}>Type</TableCell>
                    <TableCell sx={{ color: '#fff', fontWeight: 'bold', borderBottom: '1px solid #444' }}>Description</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell sx={{ color: '#6c757d' }}>status</TableCell>
                    <TableCell sx={{ color: '#6c757d' }}>boolean</TableCell>
                    <TableCell sx={{ color: '#6c757d' }}>Transaction status</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ color: '#6c757d' }}>url</TableCell>
                    <TableCell sx={{ color: '#6c757d' }}>string</TableCell>
                    <TableCell sx={{ color: '#6c757d' }}>Generated payment URL</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ color: '#6c757d' }}>transaction_id</TableCell>
                    <TableCell sx={{ color: '#6c757d' }}>string</TableCell>
                    <TableCell sx={{ color: '#6c757d' }}>Transaction number</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ color: '#6c757d' }}>type</TableCell>
                    <TableCell sx={{ color: '#6c757d' }}>string</TableCell>
                    <TableCell sx={{ color: '#6c757d' }}>Transaction type (order)</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ color: '#6c757d' }}>token</TableCell>
                    <TableCell sx={{ color: '#6c757d' }}>string</TableCell>
                    <TableCell sx={{ color: '#6c757d' }}>Token generated for the transaction</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        )}

        {/* URL Examples - sadece generate-url endpoint'i için */}
        {endpoint.path === '/generate-url' && (
          <Box sx={{ mt: 4 }}>
            <Box sx={{ mb: 2, display: 'flex', gap: 1 }}>
              <Button
                variant={selectedLanguage === 'javascript' ? "contained" : "outlined"}
                onClick={() => setSelectedLanguage('javascript')}
                sx={{ 
                  bgcolor: selectedLanguage === 'javascript' ? '#673ab7' : '#2d2d2d',
                  color: '#fff',
                  borderColor: '#673ab7',
                  '&:hover': {
                    bgcolor: selectedLanguage === 'javascript' ? '#5e35b1' : '#3d3d3d'
                  }
                }}
              >
                JAVASCRIPT
              </Button>
              <Button
                variant={selectedLanguage === 'python' ? "contained" : "outlined"}
                onClick={() => setSelectedLanguage('python')}
                sx={{ 
                  bgcolor: selectedLanguage === 'python' ? '#673ab7' : '#2d2d2d',
                  color: '#fff',
                  borderColor: '#673ab7',
                  '&:hover': {
                    bgcolor: selectedLanguage === 'python' ? '#5e35b1' : '#3d3d3d'
                  }
                }}
              >
                PYTHON
              </Button>
              <Button
                variant={selectedLanguage === 'nodejs' ? "contained" : "outlined"}
                onClick={() => setSelectedLanguage('nodejs')}
                sx={{ 
                  bgcolor: selectedLanguage === 'nodejs' ? '#673ab7' : '#2d2d2d',
                  color: '#fff',
                  borderColor: '#673ab7',
                  '&:hover': {
                    bgcolor: selectedLanguage === 'nodejs' ? '#5e35b1' : '#3d3d3d'
                  }
                }}
              >
                NODE.JS
              </Button>
            </Box>

            <Paper 
              sx={{ 
                bgcolor: '#1b1b1b', 
                p: 2,
                '& pre': {
                  color: '#e6e6e6',
                  margin: 0,
                  whiteSpace: 'pre-wrap',
                  fontFamily: 'monospace',
                  fontSize: '14px',
                  lineHeight: '1.5'
                }
              }}
            >
              <pre>{urlExamples[selectedLanguage]}</pre>
            </Paper>
          </Box>
        )}

        {/* Test Response bölümü */}
        <Box sx={{ p: 3, borderTop: '1px solid #333' }}>
          {/* ... mevcut test response içeriği ... */}
        </Box>

        {/* URL Parameters for /order-status */}
        {endpoint.path === '/order-status/:transaction_id' && (
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" sx={{ mb: 2, color: '#6c757d' }}>
              URL Parameters
            </Typography>
            <TableContainer component={Paper} sx={{ bgcolor: '#2d2d2d' }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ color: '#fff', fontWeight: 'bold', borderBottom: '1px solid #444' }}>Name</TableCell>
                    <TableCell sx={{ color: '#fff', fontWeight: 'bold', borderBottom: '1px solid #444' }}>Type</TableCell>
                    <TableCell sx={{ color: '#fff', fontWeight: 'bold', borderBottom: '1px solid #444' }}>Required</TableCell>
                    <TableCell sx={{ color: '#fff', fontWeight: 'bold', borderBottom: '1px solid #444' }}>Description</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell sx={{ color: '#6c757d' }}>transaction_id</TableCell>
                    <TableCell sx={{ color: '#6c757d' }}>string</TableCell>
                    <TableCell sx={{ color: '#6c757d' }}>Yes</TableCell>
                    <TableCell sx={{ color: '#6c757d' }}>It is the unique identification number for the transaction. It is sent via the URL.</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        )}

        {/* URL Parameters for /withdrawal-status */}
        {endpoint.path.startsWith('/withdrawal-status') && (
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" sx={{ mb: 2, color: '#6c757d' }}>
              Request Parameters
            </Typography>
            <TableContainer component={Paper} sx={{ bgcolor: '#2d2d2d' }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ color: '#fff', fontWeight: 'bold', borderBottom: '1px solid #444' }}>Name</TableCell>
                    <TableCell sx={{ color: '#fff', fontWeight: 'bold', borderBottom: '1px solid #444' }}>Type</TableCell>
                    <TableCell sx={{ color: '#fff', fontWeight: 'bold', borderBottom: '1px solid #444' }}>Required</TableCell>
                    <TableCell sx={{ color: '#fff', fontWeight: 'bold', borderBottom: '1px solid #444' }}>Description</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell sx={{ color: '#6c757d' }}>transaction_id</TableCell>
                    <TableCell sx={{ color: '#6c757d' }}>string</TableCell>
                    <TableCell sx={{ color: '#6c757d' }}>Yes</TableCell>
                    <TableCell sx={{ color: '#6c757d' }}>A unique identifier for the transaction.</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        )}

        {/* Request Parameters for /withdrawal-save */}
        {endpoint.path === '/withdrawal-save' && (
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" sx={{ mb: 2, color: '#6c757d' }}>
              Request Parameters
            </Typography>
            <TableContainer component={Paper} sx={{ bgcolor: '#2d2d2d' }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ color: '#fff', fontWeight: 'bold', borderBottom: '1px solid #444' }}>Name</TableCell>
                    <TableCell sx={{ color: '#fff', fontWeight: 'bold', borderBottom: '1px solid #444' }}>Type</TableCell>
                    <TableCell sx={{ color: '#fff', fontWeight: 'bold', borderBottom: '1px solid #444' }}>Required</TableCell>
                    <TableCell sx={{ color: '#fff', fontWeight: 'bold', borderBottom: '1px solid #444' }}>Description</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell sx={{ color: '#6c757d' }}>transaction_id</TableCell>
                    <TableCell sx={{ color: '#6c757d' }}>string</TableCell>
                    <TableCell sx={{ color: '#6c757d' }}>Yes</TableCell>
                    <TableCell sx={{ color: '#6c757d' }}>A unique identifier for the transaction.</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ color: '#6c757d' }}>trader</TableCell>
                    <TableCell sx={{ color: '#6c757d' }}>string</TableCell>
                    <TableCell sx={{ color: '#6c757d' }}>Yes</TableCell>
                    <TableCell sx={{ color: '#6c757d' }}>The name of the trader executing the transaction.</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ color: '#6c757d' }}>sender_name</TableCell>
                    <TableCell sx={{ color: '#6c757d' }}>string</TableCell>
                    <TableCell sx={{ color: '#6c757d' }}>Yes</TableCell>
                    <TableCell sx={{ color: '#6c757d' }}>The name of the sender.</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ color: '#6c757d' }}>sender_id</TableCell>
                    <TableCell sx={{ color: '#6c757d' }}>string</TableCell>
                    <TableCell sx={{ color: '#6c757d' }}>Yes</TableCell>
                    <TableCell sx={{ color: '#6c757d' }}>A unique identifier for the sender.</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ color: '#6c757d' }}>amount</TableCell>
                    <TableCell sx={{ color: '#6c757d' }}>number</TableCell>
                    <TableCell sx={{ color: '#6c757d' }}>Yes</TableCell>
                    <TableCell sx={{ color: '#6c757d' }}>The amount of money being sent.</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ color: '#6c757d' }}>card_no</TableCell>
                    <TableCell sx={{ color: '#6c757d' }}>string</TableCell>
                    <TableCell sx={{ color: '#6c757d' }}>Yes</TableCell>
                    <TableCell sx={{ color: '#6c757d' }}>The card number.</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ color: '#6c757d' }}>expiry_date</TableCell>
                    <TableCell sx={{ color: '#6c757d' }}>string</TableCell>
                    <TableCell sx={{ color: '#6c757d' }}>Yes</TableCell>
                    <TableCell sx={{ color: '#6c757d' }}>The card's expiration date (in MM/YY format).</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        )}

        {/* Request Parameters for /filter-download-orders */}
        {endpoint.path === '/filter-download-orders' && (
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" sx={{ mb: 2, color: '#6c757d' }}>
              Request Parameters
            </Typography>
            <TableContainer component={Paper} sx={{ bgcolor: '#2d2d2d' }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ color: '#fff', fontWeight: 'bold', borderBottom: '1px solid #444' }}>Name</TableCell>
                    <TableCell sx={{ color: '#fff', fontWeight: 'bold', borderBottom: '1px solid #444' }}>Type</TableCell>
                    <TableCell sx={{ color: '#fff', fontWeight: 'bold', borderBottom: '1px solid #444' }}>Required</TableCell>
                    <TableCell sx={{ color: '#fff', fontWeight: 'bold', borderBottom: '1px solid #444' }}>Description</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell sx={{ color: '#6c757d' }}>result</TableCell>
                    <TableCell sx={{ color: '#6c757d' }}>string</TableCell>
                    <TableCell sx={{ color: '#6c757d' }}>Yes</TableCell>
                    <TableCell sx={{ color: '#6c757d' }}>Order status (success, fail).</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ color: '#6c757d' }}>begin_time</TableCell>
                    <TableCell sx={{ color: '#6c757d' }}>string</TableCell>
                    <TableCell sx={{ color: '#6c757d' }}>Yes</TableCell>
                    <TableCell sx={{ color: '#6c757d' }}>Start time (YYYY-MM-DD).</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ color: '#6c757d' }}>end_time</TableCell>
                    <TableCell sx={{ color: '#6c757d' }}>string</TableCell>
                    <TableCell sx={{ color: '#6c757d' }}>Yes</TableCell>
                    <TableCell sx={{ color: '#6c757d' }}>End time (YYYY-MM-DD).</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        )}

        {/* Request Parameters for /filter-download-withdrawals */}
        {endpoint.path === '/filter-download-withdrawals' && (
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" sx={{ mb: 2, color: '#6c757d' }}>
              Request Parameters
            </Typography>
            <TableContainer component={Paper} sx={{ bgcolor: '#2d2d2d' }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ color: '#fff', fontWeight: 'bold', borderBottom: '1px solid #444' }}>Name</TableCell>
                    <TableCell sx={{ color: '#fff', fontWeight: 'bold', borderBottom: '1px solid #444' }}>Type</TableCell>
                    <TableCell sx={{ color: '#fff', fontWeight: 'bold', borderBottom: '1px solid #444' }}>Required</TableCell>
                    <TableCell sx={{ color: '#fff', fontWeight: 'bold', borderBottom: '1px solid #444' }}>Description</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell sx={{ color: '#6c757d' }}>result</TableCell>
                    <TableCell sx={{ color: '#6c757d' }}>string</TableCell>
                    <TableCell sx={{ color: '#6c757d' }}>Yes</TableCell>
                    <TableCell sx={{ color: '#6c757d' }}>Withdrawal status (success, fail).</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ color: '#6c757d' }}>begin_time</TableCell>
                    <TableCell sx={{ color: '#6c757d' }}>string</TableCell>
                    <TableCell sx={{ color: '#6c757d' }}>Yes</TableCell>
                    <TableCell sx={{ color: '#6c757d' }}>Start time (YYYY-MM-DD).</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ color: '#6c757d' }}>end_time</TableCell>
                    <TableCell sx={{ color: '#6c757d' }}>string</TableCell>
                    <TableCell sx={{ color: '#6c757d' }}>Yes</TableCell>
                    <TableCell sx={{ color: '#6c757d' }}>End time (YYYY-MM-DD).</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        )}

        {/* Response Parameters */}
        {endpoint.path === '/balance' && (
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" sx={{ mb: 2, color: '#6c757d' }}>
              Response Parameters
            </Typography>
            <TableContainer component={Paper} sx={{ bgcolor: '#2d2d2d' }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ color: '#fff', fontWeight: 'bold', borderBottom: '1px solid #444' }}>Parameter Name</TableCell>
                    <TableCell sx={{ color: '#fff', fontWeight: 'bold', borderBottom: '1px solid #444' }}>Type</TableCell>
                    <TableCell sx={{ color: '#fff', fontWeight: 'bold', borderBottom: '1px solid #444' }}>Required?</TableCell>
                    <TableCell sx={{ color: '#fff', fontWeight: 'bold', borderBottom: '1px solid #444' }}>Description</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell sx={{ color: '#6c757d' }}>status</TableCell>
                    <TableCell sx={{ color: '#6c757d' }}>boolean</TableCell>
                    <TableCell sx={{ color: '#6c757d' }}>Yes</TableCell>
                    <TableCell sx={{ color: '#6c757d' }}>Returns <code>true</code> if the operation is successful, <code>false</code> if it fails.</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ color: '#6c757d' }}>userId</TableCell>
                    <TableCell sx={{ color: '#6c757d' }}>number</TableCell>
                    <TableCell sx={{ color: '#6c757d' }}>Yes</TableCell>
                    <TableCell sx={{ color: '#6c757d' }}>The unique identifier for the user in the system.</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ color: '#6c757d' }}>BalanceUSD</TableCell>
                    <TableCell sx={{ color: '#6c757d' }}>number</TableCell>
                    <TableCell sx={{ color: '#6c757d' }}>Yes</TableCell>
                    <TableCell sx={{ color: '#6c757d' }}>Returns the user's current balance in USD (United States Dollar).</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        )}

        {/* Response Parameters for /filter-download-withdrawals */}
        {endpoint.path === '/filter-download-withdrawals' && (
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" sx={{ mb: 2, color: '#6c757d' }}>
              Response Parameters
            </Typography>
            <TableContainer component={Paper} sx={{ bgcolor: '#2d2d2d' }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ color: '#fff', fontWeight: 'bold', borderBottom: '1px solid #444' }}>Parameter Name</TableCell>
                    <TableCell sx={{ color: '#fff', fontWeight: 'bold', borderBottom: '1px solid #444' }}>Type</TableCell>
                    <TableCell sx={{ color: '#fff', fontWeight: 'bold', borderBottom: '1px solid #444' }}>Required?</TableCell>
                    <TableCell sx={{ color: '#fff', fontWeight: 'bold', borderBottom: '1px solid #444' }}>Description</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell sx={{ color: '#6c757d' }}>-</TableCell>
                    <TableCell sx={{ color: '#6c757d' }}>CSV</TableCell>
                    <TableCell sx={{ color: '#6c757d' }}>Yes</TableCell>
                    <TableCell sx={{ color: '#6c757d' }}>This endpoint downloads the filtered withdrawal list as a CSV file.</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        )}

        {/* Response Parameters for /filter-download-orders */}
        {endpoint.path === '/filter-download-orders' && (
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" sx={{ mb: 2, color: '#6c757d' }}>
              Response Parameters
            </Typography>
            <TableContainer component={Paper} sx={{ bgcolor: '#2d2d2d' }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ color: '#fff', fontWeight: 'bold', borderBottom: '1px solid #444' }}>Parameter Name</TableCell>
                    <TableCell sx={{ color: '#fff', fontWeight: 'bold', borderBottom: '1px solid #444' }}>Type</TableCell>
                    <TableCell sx={{ color: '#fff', fontWeight: 'bold', borderBottom: '1px solid #444' }}>Required?</TableCell>
                    <TableCell sx={{ color: '#fff', fontWeight: 'bold', borderBottom: '1px solid #444' }}>Description</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell sx={{ color: '#6c757d' }}>-</TableCell>
                    <TableCell sx={{ color: '#6c757d' }}>CSV</TableCell>
                    <TableCell sx={{ color: '#6c757d' }}>Yes</TableCell>
                    <TableCell sx={{ color: '#6c757d' }}>This endpoint downloads the filtered order list as a CSV file.</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        )}

        {/* Response Parameters for /withdrawal-save */}
        {endpoint.path === '/withdrawal-save' && (
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" sx={{ mb: 2, color: '#6c757d' }}>
              Response Parameters
            </Typography>
            <TableContainer component={Paper} sx={{ bgcolor: '#2d2d2d' }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ color: '#fff', fontWeight: 'bold', borderBottom: '1px solid #444' }}>Parameter Name</TableCell>
                    <TableCell sx={{ color: '#fff', fontWeight: 'bold', borderBottom: '1px solid #444' }}>Type</TableCell>
                    <TableCell sx={{ color: '#fff', fontWeight: 'bold', borderBottom: '1px solid #444' }}>Required?</TableCell>
                    <TableCell sx={{ color: '#fff', fontWeight: 'bold', borderBottom: '1px solid #444' }}>Description</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell sx={{ color: '#6c757d' }}>status</TableCell>
                    <TableCell sx={{ color: '#6c757d' }}>boolean</TableCell>
                    <TableCell sx={{ color: '#6c757d' }}>Yes</TableCell>
                    <TableCell sx={{ color: '#6c757d' }}>Indicates the result of the operation. <code>true</code> means successful, <code>false</code> means failed.</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ color: '#6c757d' }}>result</TableCell>
                    <TableCell sx={{ color: '#6c757d' }}>string</TableCell>
                    <TableCell sx={{ color: '#6c757d' }}>Yes</TableCell>
                    <TableCell sx={{ color: '#6c757d' }}>Returns a message related to the operation. For example: "Withdrawal successfully saved."</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ color: '#6c757d' }}>id</TableCell>
                    <TableCell sx={{ color: '#6c757d' }}>string</TableCell>
                    <TableCell sx={{ color: '#6c757d' }}>Yes</TableCell>
                    <TableCell sx={{ color: '#6c757d' }}>The unique identifier for the created transaction.</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        )}

        {/* Response Parameters for /order-save */}
        {endpoint.path === '/order-save' && (
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" sx={{ mb: 2, color: '#6c757d' }}>
              Response Parameters
            </Typography>
            <TableContainer component={Paper} sx={{ bgcolor: '#2d2d2d' }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ color: '#fff', fontWeight: 'bold', borderBottom: '1px solid #444' }}>Parameter Name</TableCell>
                    <TableCell sx={{ color: '#fff', fontWeight: 'bold', borderBottom: '1px solid #444' }}>Type</TableCell>
                    <TableCell sx={{ color: '#fff', fontWeight: 'bold', borderBottom: '1px solid #444' }}>Required?</TableCell>
                    <TableCell sx={{ color: '#fff', fontWeight: 'bold', borderBottom: '1px solid #444' }}>Description</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell sx={{ color: '#6c757d' }}>status</TableCell>
                    <TableCell sx={{ color: '#6c757d' }}>boolean</TableCell>
                    <TableCell sx={{ color: '#6c757d' }}>Yes</TableCell>
                    <TableCell sx={{ color: '#6c757d' }}>Indicates whether the operation was successful. <code>true</code> means successful, <code>false</code> means failed.</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ color: '#6c757d' }}>result</TableCell>
                    <TableCell sx={{ color: '#6c757d' }}>string</TableCell>
                    <TableCell sx={{ color: '#6c757d' }}>Yes</TableCell>
                    <TableCell sx={{ color: '#6c757d' }}>Returns a message related to the operation. For example: "Order successfully saved."</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ color: '#6c757d' }}>id</TableCell>
                    <TableCell sx={{ color: '#6c757d' }}>string</TableCell>
                    <TableCell sx={{ color: '#6c757d' }}>Yes</TableCell>
                    <TableCell sx={{ color: '#6c757d' }}>The unique identifier for the created order.</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        )}

        {/* Response Parameters for /order-status */}
        {endpoint.path === '/order-status/:transaction_id' && (
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" sx={{ mb: 2, color: '#6c757d' }}>
              Response Parameters
            </Typography>
            <TableContainer component={Paper} sx={{ bgcolor: '#2d2d2d' }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ color: '#fff', fontWeight: 'bold', borderBottom: '1px solid #444' }}>Parameter Name</TableCell>
                    <TableCell sx={{ color: '#fff', fontWeight: 'bold', borderBottom: '1px solid #444' }}>Type</TableCell>
                    <TableCell sx={{ color: '#fff', fontWeight: 'bold', borderBottom: '1px solid #444' }}>Required?</TableCell>
                    <TableCell sx={{ color: '#fff', fontWeight: 'bold', borderBottom: '1px solid #444' }}>Description</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell sx={{ color: '#6c757d' }}>status</TableCell>
                    <TableCell sx={{ color: '#6c757d' }}>boolean</TableCell>
                    <TableCell sx={{ color: '#6c757d' }}>Yes</TableCell>
                    <TableCell sx={{ color: '#6c757d' }}>Indicates whether the operation was successful. <code>true</code> means successful, <code>false</code> means failed.</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ color: '#6c757d' }}>id</TableCell>
                    <TableCell sx={{ color: '#6c757d' }}>string</TableCell>
                    <TableCell sx={{ color: '#6c757d' }}>Yes</TableCell>
                    <TableCell sx={{ color: '#6c757d' }}>The unique identifier for the order.</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ color: '#6c757d' }}>transaction_id</TableCell>
                    <TableCell sx={{ color: '#6c757d' }}>string</TableCell>
                    <TableCell sx={{ color: '#6c757d' }}>Yes</TableCell>
                    <TableCell sx={{ color: '#6c757d' }}>It is the unique identification number for the transaction. It is sent via the URL.</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ color: '#6c757d' }}>transaction_status</TableCell>
                    <TableCell sx={{ color: '#6c757d' }}>string</TableCell>
                    <TableCell sx={{ color: '#6c757d' }}>Yes</TableCell>
                    <TableCell sx={{ color: '#6c757d' }}>The current status of the order. For example: "finished", "pending".</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ color: '#6c757d' }}>amount_received</TableCell>
                    <TableCell sx={{ color: '#6c757d' }}>string</TableCell>
                    <TableCell sx={{ color: '#6c757d' }}>Yes</TableCell>
                    <TableCell sx={{ color: '#6c757d' }}>The total amount received for the order.</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ color: '#6c757d' }}>comment</TableCell>
                    <TableCell sx={{ color: '#6c757d' }}>string</TableCell>
                    <TableCell sx={{ color: '#6c757d' }}>No</TableCell>
                    <TableCell sx={{ color: '#6c757d' }}>Any additional comments or explanations regarding the order.</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ color: '#6c757d' }}>result</TableCell>
                    <TableCell sx={{ color: '#6c757d' }}>string</TableCell>
                    <TableCell sx={{ color: '#6c757d' }}>Yes</TableCell>
                    <TableCell sx={{ color: '#6c757d' }}>A message indicating the result of the operation.</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        )}
      </Box>

      {/* Sağ taraf container */}
      <Box sx={{ 
        flex: '0 0 600px',  // Sabit genişlik (ihtiyaca göre ayarlanabilir)
        bgcolor: '#1E1E1E', 
        p: 3, 
        borderRadius: 1, 
        color: 'white',
        height: '100%',
        overflow: 'auto'  // İçerik taşarsa scroll ekler
      }}>
        {/* Header ve URL kısmı */}
        <Box sx={{ 
          bgcolor: '#1b1b1b', 
          p: 2, 
          mb: showUrl ? 0 : 3,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: showUrl ? '1px solid #333' : 'none'
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography 
              sx={{ 
                bgcolor: '#0284c7',
                color: 'white',
                px: 1.5,
                py: 0.5,
                borderRadius: 1,
                fontSize: '0.875rem'
              }}
            >
              {endpoint.method}
            </Typography>
            <Typography sx={{ color: '#fff' }}>{endpoint.path}</Typography>
          </Box>
          <IconButton 
            onClick={() => setShowUrl(!showUrl)}
            sx={{ 
              color: '#6c757d',
              transform: showUrl ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform 0.2s'
            }}
          >
            <ExpandMoreIcon />
          </IconButton>
        </Box>

        {/* Açılır/kapanır URL kısmı */}
        <Collapse in={showUrl}>
          <Box sx={{ 
            bgcolor: '#2d2d2d',
            p: 2,
            mb: 3,
            color: '#6c757d',
            fontFamily: 'monospace',
            fontSize: '0.875rem'
          }}>
            https://test.mrogo.net
          </Box>
        </Collapse>

        {/* Ödeme yöntemi seçici */}
        {renderPaymentMethodSelector()}

        {/* PAYLOAD ve Content Type başlığı */}
        <Box sx={{ 
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 2
        }}>
          <Typography variant="h6" sx={{ color: '#fff' }}>
            PAYLOAD
          </Typography>
          <Typography variant="body2" sx={{ color: '#6c757d' }}>
            Content type
            <Typography component="span" display="block" sx={{ color: '#fff' }}>
              application/json
            </Typography>
          </Typography>
        </Box>

        {/* Tek curl örneği */}
        <Box sx={{ 
          bgcolor: '#2d2d2d',
          p: 2,
          mb: 3,
          position: 'relative',
          fontFamily: 'monospace',
          fontSize: '0.875rem'
        }}>
          <IconButton 
            onClick={() => handleCopy(getPayloadBody())}
            sx={{ 
              position: 'absolute',
              right: 8,
              top: 8,
              color: '#6c757d',
              '&:hover': {
                color: '#fff'
              }
            }}
          >
            <Typography sx={{ fontSize: '0.75rem', mr: 0.5 }}>Copy</Typography>
            <ContentCopyIcon sx={{ fontSize: '1rem' }} />
          </IconButton>

          <Box sx={{ 
            color: '#6c757d',
            whiteSpace: 'pre',
            overflow: 'auto',
            maxHeight: '300px',
            pl: 2
          }}>
            {getPayloadBody()}
          </Box>
        </Box>

        {/* Response Samples */}
        <Typography variant="h6" sx={{ color: '#fff', mb: 2 }}>
          Response samples
        </Typography>
        <Box>
          <Box sx={{ 
            display: 'flex', 
            mb: 1 
          }}>
            <Button 
              onClick={() => handleResponseChange('200')}
              sx={{ 
                bgcolor: activeResponse === '200' ? '#28a745' : 'transparent',
                color: '#fff',
                mr: 1,
                '&:hover': { bgcolor: '#218838' }
              }}
            >
              200
            </Button>
            <Button
              onClick={() => handleResponseChange('400')}
              sx={{ 
                bgcolor: activeResponse === '400' ? '#dc3545' : 'transparent',
                color: '#fff',
                '&:hover': { bgcolor: '#c82333' }
              }}
            >
              400
            </Button>
          </Box>
          <Paper sx={{ bgcolor: '#1b1b1b', p: 2 }}>
            <pre style={{ margin: 0, color: '#fff' }}>
              {JSON.stringify(testResponse?.data || {}, null, 2)}
            </pre>
          </Paper>
        </Box>

        {/* Displaying the response data */}
        {responseData && (
          <Box sx={{ bgcolor: '#1b1b1b', p: 2, mt: 2 }}>
            <pre style={{ color: '#fff' }}>
              {JSON.stringify(responseData, null, 2)}
            </pre>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default EndpointCard; 