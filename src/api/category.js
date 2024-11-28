import { useFetcher } from '../lib/fetcher';
import { useApi } from '../hooks/useApi';

export const useCategoryList = () => {
  return useApi('/category');
};

export const useCategoryMutations = () => {
  const fetcher = useFetcher();

  const createCategory = async (data) => {
    const response = await fetcher('/admin/category', {
      method: 'POST',
      body: JSON.stringify(data)
    });
    return response.data;
  };

  const updateCategory = async (id, data) => {
    const response = await fetcher(`/admin/category/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data)
    });
    return response.data;
  };

  return {
    createCategory,
    updateCategory
  };
};