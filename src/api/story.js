import { useApi } from '../hooks/useApi';
import { useFetcher } from '../lib/fetcher';

export const useStoryList = (options) => {
  return useApi('/story', options);
};

export const useStoryDetail = (id, options) => {
  return useApi(id ? `/story/${id}` : null, options);
};

export const useStoryMutations = () => {
  const fetcher = useFetcher();

  const createStory = async (data) => {
    const response = await fetcher('/admin/story', {
      method: 'POST',
      body: JSON.stringify(data)
    });
    return response.data;
  };

  const updateStory = async (id, data) => {
    const response = await fetcher(`/admin/story/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data)
    });
    return response.data;
  };

  const deleteStory = async (id) => {
    return await fetcher(`/admin/story/${id}`, {
      method: 'DELETE'
    });
  };

  return {
    createStory,
    updateStory,
    deleteStory
  };
};