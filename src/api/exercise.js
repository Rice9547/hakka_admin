import { useApi } from '../hooks/useApi';

export const useStoryExercisesCount = () => {
  return useApi('/admin/story/exercise');
};
