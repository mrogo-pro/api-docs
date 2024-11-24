import React from 'react';
import { Box } from '@mui/material';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';

const CodeBlock = ({ code, language }) => {
  return (
    <Box sx={{ borderRadius: 1, overflow: 'hidden' }}>
      <SyntaxHighlighter
        language={language}
        style={docco}
        customStyle={{
          margin: 0,
          padding: '16px',
          borderRadius: '4px',
        }}
      >
        {code}
      </SyntaxHighlighter>
    </Box>
  );
};

export default CodeBlock; 