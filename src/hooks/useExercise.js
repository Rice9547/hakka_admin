import {useStoryExercises, useStoryExercisesCount} from '../api/exercise';

export const useStoryExerciseCount = () => {
  const { data, error, isLoading } = useStoryExercisesCount();

  return {
    exercises: data?.data || [],
    isLoading,
    isError: error
  };
};

export const useStoryExerciseList = (story_id) => {
  const { data, error, isLoading } = useStoryExercises(story_id);

  return {
    exercises: data?.data || [],
    isLoading,
    isError: error
  };
}