import React from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  List,
  Box,
  CircularProgress,
  ListItem,
  ListItemText,
  Divider,
  IconButton,
  Button
} from '@mui/material';
import {
  Delete as DeleteIcon,
  Edit as EditIcon,
  Add as AddIcon
} from "@mui/icons-material";
import {useStoryExerciseList} from '../../hooks/useExercise';

const ExerciseList = () => {
  const navigate = useNavigate();
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

  const onEdit = (exerciseId, exercise) => {
    navigate(`/admin/story/${id}/exercises/${exerciseId}`, { state: exercise });
  }

  const onDelete = (exerciseId) => {
    if (window.confirm('確定要刪除此練習題？')) {
      console.log('Delete exercise:', exerciseId);
    }
  }

  return (
    <Container maxWidth="md">
      <Box sx={{my: 4}}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
          <Typography variant="h4" component="h1">
            練習題目列表
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => navigate(`/admin/story/${id}/exercises/new`)}
          >
            新增練習題
          </Button>
        </Box>

        <Paper>
          {isLoading ? (
            <Box sx={{display: 'flex', justifyContent: 'center', p: 3}}>
              <CircularProgress/>
            </Box>
          ) : exercises.length === 0 ? (
            <Box sx={{ p: 3, textAlign: 'center' }}>
              <Typography color="text.secondary">
                尚無練習題目
              </Typography>
            </Box>
          ) : (
            <List>
              {exercises.map((exercise, index) => (
                <React.Fragment key={exercise.id}>
                  <ListItem
                    secondaryAction={
                      <Box>
                        <IconButton onClick={() => onEdit(exercise.id, exercise)}>
                          <EditIcon/>
                        </IconButton>
                        <IconButton onClick={() => onDelete(exercise.id)}>
                          <DeleteIcon/>
                        </IconButton>
                      </Box>
                    }
                  >
                    <ListItemText
                      primary={`#${exercise.id}: ${exercise.prompt_text}`}
                      secondary={`題目類型: ${getExerciseType(exercise.type)}`}
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

export default ExerciseList;