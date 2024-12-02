import { useApi } from '../hooks/useApi';

export const useStoryExercisesCount = () => {
  return useApi('/admin/story/exercise');
};

export const useStoryExercises = (story_id) => {
  return useApi(`/admin/story/${story_id}/exercise`);
}