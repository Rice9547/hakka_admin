import React from 'react';
import { useNavigate } from 'react-router-dom';
import CountExerciseItem from './CountExerciseItem';

export const ExerciseCountList = () => {
  const navigate = useNavigate();

  const handleStorySelect = (id) => {
    navigate(`/admin/story/${id}/exercises`);
  };

  return (
    <CountExerciseItem onStorySelect={handleStorySelect} />
  );
}; 