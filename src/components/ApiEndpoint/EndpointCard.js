import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
} from '@mui/material';
import CodeBlock from '../Common/CodeBlock';

const EndpointCard = ({ endpoint }) => {
  const [activeTab, setActiveTab] = useState(0);

  const getMethodColor = (method) => {
    const colors = {
      GET: '#61affe',
      POST: '#49cc90',
      PUT: '#fca130',
      DELETE: '#f93e3e',
    };
    return colors[method] || '#999999';
  };

  return (
    <Paper sx={{ mb: 3, overflow: 'hidden' }}>
      {/* Header */}
      <Box sx={{ p: 2, borderBottom: '1px solid rgba(0,0,0,0.12)' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <Chip
            label={endpoint.method}
            sx={{
              backgroundColor: getMethodColor(endpoint.method),
              color: '#fff',
              fontWeight: 'bold',
              mr: 2,
            }}
          />
          <Typography variant="h6" component="span">
            {endpoint.path}
          </Typography>
        </Box>
        <Typography variant="body2" color="text.secondary">
          {endpoint.description}
        </Typography>
      </Box>

      {/* Content */}
      <Box>
        <Tabs
          value={activeTab}
          onChange={(e, v) => setActiveTab(v)}
          sx={{
            borderBottom: '1px solid rgba(0,0,0,0.12)',
            backgroundColor: '#f8f9fa',
          }}
        >
          <Tab label="Parameters" />
          <Tab label="Response" />
          <Tab label="Example" />
        </Tabs>

        <Box sx={{ p: 2 }}>
          {activeTab === 0 && (
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Parametre</TableCell>
                    <TableCell>Tip</TableCell>
                    <TableCell>Zorunlu</TableCell>
                    <TableCell>Açıklama</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {Object.entries(endpoint.request).map(([key, value]) => (
                    <TableRow key={key}>
                      <TableCell>{key}</TableCell>
                      <TableCell>
                        <Chip
                          label={typeof value === 'string' ? value : typeof value}
                          size="small"
                          sx={{ backgroundColor: '#e9ecef' }}
                        />
                      </TableCell>
                      <TableCell>
                        
                          <Chip label="Zorunlu" size="small" color="error" />
                        
                      </TableCell>
                      <TableCell>{endpoint.descriptions?.[key] || '-'}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}

          {activeTab === 1 && (
            <Box>
              <Typography variant="subtitle2" gutterBottom>
                Başarılı Yanıt (200)
              </Typography>
              <CodeBlock
                code={JSON.stringify(endpoint.response.success, null, 2)}
                language="json"
              />

              <Typography variant="subtitle2" gutterBottom sx={{ mt: 2 }}>
                Hata Yanıtı (400)
              </Typography>
              <CodeBlock
                code={JSON.stringify(endpoint.response.error, null, 2)}
                language="json"
              />
            </Box>
          )}

          {activeTab === 2 && (
            <Box>
              <Typography variant="subtitle2" gutterBottom>
                cURL
              </Typography>
              <CodeBlock
                code={endpoint.example.curl}
                language="bash"
              />

              <Typography variant="subtitle2" gutterBottom sx={{ mt: 2 }}>
                JavaScript
              </Typography>
              <CodeBlock
                code={endpoint.example.javascript}
                language="javascript"
              />
            </Box>
          )}
        </Box>
      </Box>
    </Paper>
  );
};

export default EndpointCard;