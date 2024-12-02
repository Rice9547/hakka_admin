import React from 'react';
import {
  Container,
  Paper,
  Typography,
  List,
  Box,
  CircularProgress,
  ListItem,
  ListItemText,
  Chip
} from '@mui/material';
import { useStoryExerciseCount } from '../../hooks/useExercise';

const CountExerciseItem = ({ onStorySelect }) => {
  const { exercises, isLoading, isError } = useStoryExerciseCount();

  if (isError) {
    return <Typography color="error">無法載入練習題目</Typography>;
  }

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" sx={{ mb: 3 }}>
          故事練習題目
        </Typography>

        <Paper>
          {isLoading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
              <CircularProgress />
            </Box>
          ) : (
            <List>
              {exercises.map(story => (
                <ListItem
                  key={story.story_id}
                  button="true"
                  onClick={() => onStorySelect(story.story_id)}
                  sx={{ 
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <ListItemText
                    primary={story.story_title}
                  />
                  <Chip 
                    label={`${story.count} 個練習題`}
                    color="primary"
                    variant="outlined"
                  />
                </ListItem>
              ))}
            </List>
          )}
        </Paper>
      </Box>
    </Container>
  );
};

export default CountExerciseItem; 