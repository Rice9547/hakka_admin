import React, {useState} from 'react';
import {
  Box,
  IconButton,
  Typography,
  TextField,
  Paper, Button, CircularProgress, Alert,
} from '@mui/material';
import {
  Delete as DeleteIcon,
  KeyboardArrowUp as ArrowUpIcon,
  KeyboardArrowDown as ArrowDownIcon, Translate,
} from '@mui/icons-material';
import AudioUpload from './AudioUpload';
import { DIALECTS } from '../../hooks/useStory';
import {useTranslator} from "../../api/translate";
import ImageInput from "./ImageInput";

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
  const [isTranslating, setIsTranslating] = useState(false);
  const [translationError, setTranslationError] = useState(null);
  const { translate } = useTranslator();

  const handleTranslate = async () => {
    if (!page.content_cn.trim()) return;

    try {
      setIsTranslating(true);
      setTranslationError(null);
      const translatedText = await translate(page.content_cn);
      onContentChange('content_hakka', translatedText.hakka);
    } catch (err) {
      console.error('Translation error:', err);
      setTranslationError('Translation failed. Please try again.');
    } finally {
      setIsTranslating(false);
    }
  };

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

          <Box sx={{ mb: 2 }}>
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
              <TextField
                fullWidth
                multiline
                rows={3}
                label="Hakka Content"
                value={page.content_hakka}
                onChange={(e) => onContentChange('content_hakka', e.target.value)}
                disabled={disabled || isTranslating}
              />
              <Button
                variant="outlined"
                onClick={handleTranslate}
                disabled={disabled || isTranslating || !page.content_cn.trim()}
                sx={{ minWidth: '120px' }}
                startIcon={isTranslating ? (
                  <CircularProgress size={20} />
                ) : (
                  <Translate />
                )}
              >
                Translate
              </Button>
            </Box>

            {translationError && (
              <Alert
                severity="error"
                sx={{ mt: 1 }}
                onClose={() => setTranslationError(null)}
              >
                {translationError}
              </Alert>
            )}
          </Box>

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

          <ImageInput
            value={page.image}
            onChange={(url) => onContentChange('image', url)}
            description={page.content_cn}
          />
        </Box>
      </Box>
    </Paper>
  );
};

export default PageEditor;