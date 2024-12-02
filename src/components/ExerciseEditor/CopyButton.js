import React from 'react';
import { IconButton, Tooltip } from '@mui/material';
import { ContentCopy } from '@mui/icons-material';

const CopyButton = ({ text }) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(text);
  };

  return (
    <Tooltip title="Copy">
      <IconButton onClick={handleCopy} size="small">
        <ContentCopy fontSize="small" />
      </IconButton>
    </Tooltip>
  );
};

export default CopyButton;