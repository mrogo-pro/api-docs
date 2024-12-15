import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import { theme } from './theme/theme';
import Layout from './components/Layout/Layout';
import Home from './pages/Home';
import PaymentOperations1 from './components/PaymentOperations1';
import PaymentOperations2 from './components/PaymentOperations2';


function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/payment-operations-1" element={<PaymentOperations1 />} />
            <Route path="/payment-operations-2" element={<PaymentOperations2 />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;