import React, { useState, useEffect } from "react";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {
  Container,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
  Typography,
  Button,
  IconButton,
  Stack,
  Paper, CircularProgress, Alert,
} from "@mui/material";
import {
  Add as AddIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";
import {useExerciseActions} from "../../hooks/useExercise";

const ExerciseEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { createExercise } = useExerciseActions();
  const defaultExercise = {
    prompt_text: "",
    audio_url: "",
    type: 0,
    answers: [],
    choices: [],
  };
  const [formData, setFormData] = useState(defaultExercise);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (location.state) {
      const exercise = location.state;
      setFormData({
        prompt_text: exercise.prompt_text || "",
        audio_url: exercise.audio_url || "",
        type: exercise.type || 0,
        answers: exercise.answers || [],
        choices: exercise.choices || [],
      });
    }
  }, [location.state]);

  const handleAddAnswer = () => {
    setFormData({
      ...formData,
      answers: [...formData.answers, { answer_text: "" }],
    });
  };

  const handleDeleteAnswer = (index) => {
    setFormData({
      ...formData,
      answers: formData.answers.filter((_, i) => i !== index),
    });
  };

  const handleAddChoice = () => {
    setFormData({
      ...formData,
      choices: [...formData.choices, { choice_text: "", is_correct: false }],
    });
  };

  const handleDeleteChoice = (index) => {
    setFormData({
      ...formData,
      choices: formData.choices.filter((_, i) => i !== index),
    });
  };

  const handleFormChange = (field, value) => {
    setError(null);
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAnswerChange = (index, value) => {
    setError(null);
    const newAnswers = [...formData.answers];
    newAnswers[index].answer_text = value;
    setFormData(prev => ({
      ...prev,
      answers: newAnswers
    }));
  };

  const handleChoiceChange = (index, field, value) => {
    setError(null);
    const newChoices = [...formData.choices];
    newChoices[index][field] = value;
    setFormData(prev => ({
      ...prev,
      choices: newChoices
    }));
  };

  const handleSubmit = async (e) => {
    setError(null);

    try {
      setSaving(true);
      await createExercise(id, formData);
      navigate(-1);
    } catch (err) {
      setError(err.info?.message || "Error saving exercise");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Container maxWidth="md">
      <Paper sx={{ p: 3, mt: 3 }}>
        <Typography variant="h4" gutterBottom>
          Exercise Editor
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Stack spacing={3}>
          <TextField
            fullWidth
            label="Prompt Text"
            value={formData.prompt_text}
            onChange={(e) => handleFormChange("prompt_text", e.target.value)}
            multiline
            rows={3}
          />

          <TextField
            fullWidth
            label="Audio URL"
            value={formData.audio_url}
            onChange={(e) => handleFormChange("audio_url", e.target.value)}
          />

          <FormControl fullWidth>
            <InputLabel>Type</InputLabel>
            <Select
              value={formData.type}
              label="Type"
              onChange={(e) => handleFormChange("type", e.target.value)}
            >
              <MenuItem value={0}>填空題</MenuItem>
              <MenuItem value={1}>選擇題</MenuItem>
            </Select>
          </FormControl>

          {formData.type === 0 ? (
            <Box>
              <Typography variant="h6" gutterBottom>
                Answers
              </Typography>
              {formData.answers.map((answer, index) => (
                <Box key={index} sx={{ display: "flex", gap: 1, mb: 2 }}>
                  <TextField
                    fullWidth
                    label={`Answer ${index + 1}`}
                    value={answer.answer_text}
                    onChange={(e) => handleAnswerChange(index, e.target.value)}
                  />
                  <IconButton
                    color="error"
                    onClick={() => handleDeleteAnswer(index)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              ))}
              <Button
                startIcon={<AddIcon />}
                variant="outlined"
                onClick={handleAddAnswer}
              >
                Add Answer
              </Button>
            </Box>
          ) : (
            <Box>
              <Typography variant="h6" gutterBottom>
                Choices
              </Typography>
              {formData.choices.map((choice, index) => (
                <Box key={index} sx={{ display: "flex", gap: 1, mb: 2 }}>
                  <TextField
                    fullWidth
                    label={`Choice ${index + 1}`}
                    value={choice.choice_text}
                    onChange={(e) => handleChoiceChange(index, "choice_text", e.target.value)}
                  />
                  <FormControl sx={{ minWidth: 120 }}>
                    <InputLabel>Correct?</InputLabel>
                    <Select
                      value={choice.is_correct}
                      label="Correct?"
                      onChange={(e) => handleChoiceChange(index, "is_correct", e.target.value)}
                    >
                      <MenuItem value={true}>正確答案</MenuItem>
                      <MenuItem value={false}>錯誤答案</MenuItem>
                    </Select>
                  </FormControl>
                  <IconButton
                    color="error"
                    onClick={() => handleDeleteChoice(index)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              ))}
              <Button
                startIcon={<AddIcon />}
                variant="outlined"
                onClick={handleAddChoice}
              >
                Add Choice
              </Button>
            </Box>
          )}
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', mt: 3 }}>
            <Button
              variant="outlined"
              onClick={() => navigate(-1)}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              disabled={saving}
            >
              {saving ? <CircularProgress size={24} /> : 'Save'}
            </Button>
          </Box>
        </Stack>
      </Paper>
    </Container>
  );
};

export default ExerciseEditor;