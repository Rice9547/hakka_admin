import { useApi } from '../hooks/useApi';
import {useFetcher} from "../lib/fetcher";

export const useStoryExercisesCount = () => {
  return useApi('/admin/story/exercise');
};

export const useStoryExercises = (story_id) => {
  return useApi(`/admin/story/${story_id}/exercise`);
}

export const useExerciseMutations = () => {
  const fetcher = useFetcher();

  const createExercise = async (story_id, data) => {
    const response = await fetcher(`/admin/story/${story_id}/exercise`, {
      method: 'POST',
      body: JSON.stringify(data)
    });
    return response.data;
  };

  const updateExercise = async (story_id, id, data) => {
    const response = await fetcher(`/admin/story/${story_id}/exercise/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data)
    });
    return response.data;
  };

  const deleteExercise = async (story_id, id) => {
    return await fetcher(`/admin/story/${story_id}/exercise/${id}`, {
      method: 'DELETE'
    });
  };

  return {
    createExercise,
    updateExercise,
    deleteExercise
  };
}