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
    <Paper elevation={2} sx={{p: 2, mb: 2}}>
      <Box sx={{display: 'flex', alignItems: 'flex-start', gap: 2}}>
        <Box sx={{display: 'flex', flexDirection: 'column'}}>
          <IconButton
            size="small"
            onClick={() => onMove('up')}
            disabled={isFirst || disabled}
          >
            <ArrowUpIcon/>
          </IconButton>
          <IconButton
            size="small"
            onClick={() => onMove('down')}
            disabled={isLast || disabled}
          >
            <ArrowDownIcon/>
          </IconButton>
        </Box>

        <Box sx={{flex: 1}}>
          <Box sx={{display: 'flex', alignItems: 'center', mb: 2}}>
            <Typography variant="subtitle1">
              Page {page.page_number}
            </Typography>
            <IconButton
              size="small"
              color="error"
              onClick={onDelete}
              disabled={disabled}
              sx={{ml: 'auto'}}
            >
              <DeleteIcon/>
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
            sx={{mb: 2}}
          />

          <TextField
            fullWidth
            multiline
            rows={3}
            label="Hakka Content"
            value={page.content_hakka}
            onChange={(e) => onContentChange('content_hakka', e.target.value)}
            disabled={disabled}
            sx={{mb: 2}}
          />

          <AudioUpload
            label="四縣腔 Audio"
            value={page.audio_sijian || ''}
            onChange={(url) => onAudioChange('audio_sijian', url)}
            disabled={disabled}
            pageNumber={page.page_number}  // 添加這行
          />

          <AudioUpload
            label="海陸腔 Audio"
            value={page.audio_hailu || ''}
            onChange={(url) => onAudioChange('audio_hailu', url)}
            disabled={disabled}
            pageNumber={page.page_number}  // 添加這行
          />
        </Box>
      </Box>
    </Paper>
  );
};

export default PageEditor;