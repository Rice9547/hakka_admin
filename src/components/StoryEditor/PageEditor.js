import React from 'react';
import {
  Box,
  IconButton,
  Typography,
  TextField,
} from '@mui/material';
import {
  Delete as DeleteIcon,
  KeyboardArrowUp as ArrowUpIcon,
  KeyboardArrowDown as ArrowDownIcon,
} from '@mui/icons-material';

const PageEditor = ({ page, onDelete, onMove, onContentChange, isFirst, isLast }) => {
  return (
    <Box sx={{ display: 'flex', mb: 3 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', mr: 1 }}>
        <IconButton
          size="small"
          onClick={() => onMove('up')}
          disabled={isFirst}
        >
          <ArrowUpIcon />
        </IconButton>
        <IconButton
          size="small"
          onClick={() => onMove('down')}
          disabled={isLast}
        >
          <ArrowDownIcon />
        </IconButton>
      </Box>

      <Box sx={{ flex: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'start', gap: 1, mb: 1 }}>
          <Typography variant="subtitle2" sx={{ mt: 1 }}>
            Page {page.page_number}
          </Typography>
          <IconButton
            size="small"
            color="error"
            onClick={onDelete}
            sx={{ ml: 'auto' }}
          >
            <DeleteIcon />
          </IconButton>
        </Box>

        <TextField
          fullWidth
          multiline
          rows={3}
          label="Chinese Content"
          value={page.content_cn}
          onChange={(e) => onContentChange('content_cn', e.target.value)}
          sx={{ mb: 2 }}
        />

        <TextField
          fullWidth
          multiline
          rows={3}
          label="Hakka Content"
          value={page.content_hakka}
          onChange={(e) => onContentChange('content_hakka', e.target.value)}
        />
      </Box>
    </Box>
  );
};

export default PageEditor;