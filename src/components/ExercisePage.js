import React from 'react';
import { useParams} from "react-router-dom";
import ExerciseDetail from "./ExerciseList/ExerciseDetail";
import {ExerciseCountList} from "./ExerciseList";

export const ExercisePage = () => {
  const { id } = useParams();

  return (
    id ? <ExerciseDetail /> : <ExerciseCountList />
  );
}; 