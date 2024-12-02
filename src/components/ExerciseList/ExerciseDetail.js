import React from 'react';
import {useParams} from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  List,
  Box,
  CircularProgress,
  ListItem,
  ListItemText,
  Divider, IconButton
} from '@mui/material';
import {useStoryExerciseList} from '../../hooks/useExercise';
import {Delete as DeleteIcon, Edit as EditIcon} from "@mui/icons-material";

const ExerciseDetail = () => {
  const {id} = useParams();
  const {exercises, isLoading, isError} = useStoryExerciseList(id);

  if (isError) {
    return <Typography color="error">無法載入練習題目</Typography>;
  }

  const getExerciseType = (type) => {
    switch (type) {
      case 0:
        return '填空題';
      case 1:
        return '選擇題';
      default:
        return '未知題型';
    }
  }

  const onEdit = (id, exercise) => {
    console.log('Edit exercise:', exercise);
  }

  const onDelete = (id) => {
    console.log('Delete category:', id);
  }

  return (
    <Container maxWidth="md">
      <Box sx={{my: 4}}>
        <Typography variant="h4" component="h1" sx={{mb: 3}}>
          題目列表
        </Typography>

        <Paper>
          {isLoading ? (
            <Box sx={{display: 'flex', justifyContent: 'center', p: 3}}>
              <CircularProgress/>
            </Box>
          ) : (
            <List>
              {exercises.map((exercise, index) => (
                <React.Fragment key={exercise.id}>
                  <ListItem
                    secondaryAction={
                      <Box>
                        <IconButton edge="end" onClick={() => onEdit(exercise.id, exercise)}>
                          <EditIcon/>
                        </IconButton>
                        <IconButton edge="end" onClick={() => onDelete(exercise.id)}>
                          <DeleteIcon/>
                        </IconButton>
                      </Box>
                    }
                  >
                    <ListItemText
                      primary={
                        <Typography variant="h6">
                          #{exercise.id}: {exercise.prompt_text}
                        </Typography>
                      }
                      secondary={
                        <Box sx={{mt: 1}}>
                          <Typography variant="subtitle2" color="text.secondary">
                            題目類型: {getExerciseType(exercise.type)}
                          </Typography>
                        </Box>
                      }
                    />
                  </ListItem>
                  {index < exercises.length - 1 && <Divider/>}
                </React.Fragment>
              ))}
            </List>
          )}
        </Paper>
      </Box>
    </Container>
  );
};

export default ExerciseDetail; 