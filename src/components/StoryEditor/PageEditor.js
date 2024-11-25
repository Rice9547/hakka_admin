import React from 'react';
import {
  Box,
  IconButton,
  Typography,
  TextField,
  Paper,
} from '@mui/material';
import {
  Delete as DeleteIcon,
  KeyboardArrowUp as ArrowUpIcon,
  KeyboardArrowDown as ArrowDownIcon,
} from '@mui/icons-material';
import AudioUpload from './AudioUpload';
import { DIALECTS } from '../../hooks/useStory';

const PageEditor = ({
  page,
  onDelete,
  onMove,
  onContentChange,
  onAudioChange,
  isFirst,
  isLast,
  disabled
}) => {
  return (
    <Paper elevation={2} sx={{ p: 2, mb: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <IconButton
            size="small"
            onClick={() => onMove('up')}
            disabled={isFirst || disabled}
          >
            <ArrowUpIcon />
          </IconButton>
          <IconButton
            size="small"
            onClick={() => onMove('down')}
            disabled={isLast || disabled}
          >
            <ArrowDownIcon />
          </IconButton>
        </Box>

        <Box sx={{ flex: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Typography variant="subtitle1">
              Page {page.page_number}
            </Typography>
            <IconButton
              size="small"
              color="error"
              onClick={onDelete}
              disabled={disabled}
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
            disabled={disabled}
            sx={{ mb: 2 }}
          />

          <TextField
            fullWidth
            multiline
            rows={3}
            label="Hakka Content"
            value={page.content_hakka}
            onChange={(e) => onContentChange('content_hakka', e.target.value)}
            disabled={disabled}
            sx={{ mb: 2 }}
          />

          {DIALECTS.map(dialect => (
            <AudioUpload
              key={dialect.key}
              label={`${dialect.label} Audio`}
              value={page.audios?.[dialect.key] || ''}
              onChange={(url) => onAudioChange(dialect.key, url)}
              disabled={disabled}
              pageNumber={page.page_number}
              hakkaText={page.content_hakka}
            />
          ))}
        </Box>
      </Box>
    </Paper>
  );
};

export default PageEditor;