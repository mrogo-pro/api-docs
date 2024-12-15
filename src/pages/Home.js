import React from 'react';
import { Box, Typography, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper } from '@mui/material';
import EndpointCard from '../components/EndpointCard';
import { endpoints } from '../data/apiEndpoints';
import { useLocation } from 'react-router-dom';

const Home = () => {
  const [, setActiveFilter] = React.useState(null);
  const location = useLocation();

  React.useEffect(() => {
    const storedFilter = window.sessionStorage.getItem('endpointFilter');
    if (storedFilter) {
      setActiveFilter(JSON.parse(storedFilter));
      if (location.hash === '#filtered-orders' || location.hash === '#filtered-orders-2') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else {
      setActiveFilter(null);
    }
  }, [location.hash]);

  if (location.hash === '#filtered-orders') {
    const filteredEndpoints = [
      ...endpoints.orders.filter(endpoint => 
        ['order-save', 'order-status', 'order-sms'].includes(endpoint.path.replace('/', ''))
      ),
      ...endpoints.withdrawals.filter(endpoint => 
        ['withdrawal-save', 'withdrawal-status/:transaction_id'].includes(endpoint.path.replace('/', ''))
      )
    ];

    return (
      <Box sx={{ marginLeft: '-150px', width: `calc(100% - -150px)` }}>
        <Box sx={{ p: 4, mb: 12 }}>
          <Typography variant="h4" sx={{ mb: 3 }}>
            Payment Operations 1
          </Typography>
          {filteredEndpoints.map((endpoint, index) => (
            <EndpointCard 
              key={`filtered-orders-${index}`} 
              endpoint={endpoint} 
              section="orders" 
            />
          ))}
        </Box>
      </Box>
    );
  }

  if (location.hash === '#filtered-orders-2') {
    const filteredEndpoints = [
      ...endpoints.orders.filter(endpoint => 
        ['generate-url', 'order-status'].includes(endpoint.path.replace('/', ''))
      ),
      ...endpoints.withdrawals.filter(endpoint => 
        ['withdrawal-status/:transaction_id'].includes(endpoint.path.replace('/', ''))
      )
    ];

    return (
      <Box sx={{ marginLeft: '-150px', width: `calc(100% - -150px)` }}>
        <Box sx={{ p: 4, mb: 12 }}>
          <Typography variant="h4" sx={{ mb: 3 }}>
            Payment Operations 2
          </Typography>
          {filteredEndpoints.map((endpoint, index) => (
            <EndpointCard 
              key={`filtered-orders-2-${index}`} 
              endpoint={endpoint} 
              section="orders" 
            />
          ))}
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={{ marginLeft: '-150px', width: `calc(100% - -150px)` }}>
      <Box sx={{ p: 4, mb: 12 }}>
        <Typography variant="h3" sx={{ mb: 6 }}>
          Mrogo API Documentation
        </Typography>

        <Box sx={{ mb: '200px' }}>
          <Box sx={{ mb: 6 }}>
            <Typography variant="h4" sx={{ mb: 2 }}>
              Introduction
            </Typography>
            <Typography variant="body1" sx={{ mb: 3 }}>
              This document is created to provide a conceptual overview of Mrogo Payment Integration and to help merchants and developers better understand the payment system's working mechanism.
            </Typography>
          </Box>

          <Box sx={{ mb: 6 }}>
            <Typography variant="h4" sx={{ mb: 2 }}>
              Purpose
            </Typography>
            <Typography variant="body1" sx={{ mb: 3 }}>
              The purpose of this documentation is to guide merchants in integrating the Mrogo payment system into their websites to use the payment collection service with various payment options.
            </Typography>
          </Box>

          <Box sx={{ mb: 6 }}>
            <Typography variant="h4" sx={{ mb: 2 }}>
              Scope
            </Typography>
            <Typography variant="body1" sx={{ mb: 3 }}>
              The scope of integration between merchant applications and the Mrogo Payment System covers the functional requirements for payment collection service integration.
            </Typography>
          </Box>
        </Box>

        <section id="access-urls" style={{ marginBottom: '96px' }}>
          <Typography variant="h4" sx={{ mb: 3 }}>
            Access URLs
          </Typography>
          <Typography variant="body1" sx={{ mb: 3 }}>
            The following access URLs are provided based on the working environment.
          </Typography>

          <TableContainer component={Paper} sx={{ bgcolor: '#2d2d2d', mb: 4 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ color: '#fff', fontWeight: 'bold', borderBottom: '1px solid #444' }}>Environment</TableCell>
                  <TableCell sx={{ color: '#fff', fontWeight: 'bold', borderBottom: '1px solid #444' }}>URL Format</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell sx={{ color: '#6c757d' }}>Test Server</TableCell>
                  <TableCell sx={{ color: '#6c757d' }}>https://test.mrogo.net</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ color: '#6c757d' }}>Production Server</TableCell>
                  <TableCell sx={{ color: '#6c757d' }}>https://payment.mrogo.net</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </section>

        <section id="authentication" style={{ marginBottom: '96px' }}>
          <Typography variant="h4" sx={{ mb: 3 }}>
            Authentication
          </Typography>
          {endpoints.authentication.map((endpoint, index) => (
            <EndpointCard 
              key={`auth-${index}`} 
              endpoint={endpoint} 
              section="authentication" 
            />
          ))}
        </section>

        <section id="orders" style={{ marginBottom: '96px' }}>
          <Typography variant="h4" sx={{ mb: 3 }}>
            Orders
          </Typography>
          {endpoints.orders.map((endpoint, index) => (
            <EndpointCard 
              key={`orders-${index}`} 
              endpoint={endpoint} 
              section="orders" 
            />
          ))}
        </section>

        <section id="withdrawals" style={{ marginBottom: '96px' }}>
          <Typography variant="h4" sx={{ mb: 3 }}>
            Withdrawals
          </Typography>
          {endpoints.withdrawals.map((endpoint, index) => (
            <EndpointCard 
              key={`withdrawals-${index}`} 
              endpoint={endpoint} 
              section="withdrawals" 
            />
          ))}
        </section>

        <section id="reports" style={{ marginBottom: '96px' }}>
          <Typography variant="h4" sx={{ mb: 3 }}>
            Reports
          </Typography>
          {endpoints.reports.map((endpoint, index) => (
            <EndpointCard 
              key={`reports-${index}`} 
              endpoint={endpoint} 
              section="reports" 
            />
          ))}
        </section>

        <section id="balance" style={{ marginBottom: '200px', marginTop: '400px' }}>
          <Typography variant="h4" sx={{ mb: 3 }}>
            Balance
          </Typography>
          {endpoints.balance.map((endpoint, index) => (
            <EndpointCard 
              key={`balance-${index}`} 
              endpoint={endpoint} 
              section="balance" 
            />
          ))}
        </section>
      </Box>
    </Box>
  );
};

export default Home; 