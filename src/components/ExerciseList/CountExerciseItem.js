import React, {useState} from 'react';
import {
  Container,
  Paper,
  Typography,
  List,
  Box,
  CircularProgress,
  ListItem,
  ListItemText,
  Chip, Button
} from '@mui/material';
import { useStoryExerciseCount } from '../../hooks/useExercise';
import {Add as AddIcon} from "@mui/icons-material";
import {useStories} from "../../hooks/useStory";
import ListStoryDialog from "./ListStoryDialog";
import {useNavigate} from "react-router-dom";

const CountExerciseItem = ({ onStorySelect }) => {
  const navigator = useNavigate();
  const { exercises, isLoading, isError } = useStoryExerciseCount();
  const { stories } = useStories();
  const [ openListStoryDialog, setOpenListStoryDialog ] = useState(false);

  if (isError) {
    return <Typography color="error">無法載入練習題目</Typography>;
  }

  const onCreateNew = () => {
    if (stories) {
      setOpenListStoryDialog(true);
    }
  }

  const createWithStory = (id) => {
    setOpenListStoryDialog(false);
    navigator(`/admin/story/${id}/exercises/new`);
  }

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
          <Typography variant="h4" component="h1" sx={{ mb: 3 }}>
            故事練習題目
          </Typography>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={onCreateNew}
          >
            New Exercise
          </Button>
        </Box>

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

        <ListStoryDialog
          open={openListStoryDialog}
          onClose={() => setOpenListStoryDialog(false)}
          onSelect={(id) => createWithStory(id)}
          stories={stories}
        />
      </Box>
    </Container>
  );
};

export default CountExerciseItem; 