import { useStoryExercisesCount } from '../api/exercise';

export const useStoryExerciseCount = () => {
  const { data, error, isLoading } = useStoryExercisesCount();

  return {
    exercises: data?.data || [],
    isLoading,
    isError: error
  };
};
