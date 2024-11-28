import { useSWRConfig } from 'swr';
import { useCategoryList, useCategoryMutations } from '../api/category';


export const useCategories = () => {
  const { data, error, isLoading } = useCategoryList();

  return {
    categories: data?.data || [],
    isLoading,
    isError: error
  };
};

export const useCategoryActions = () => {
  const { mutate } = useSWRConfig();
  const { createCategory, updateCategory } = useCategoryMutations();

  const handleCreateCategory = async (name) => {
    const data = {
      name
    };

    await createCategory(data);
    mutateCategory(mutate);
  };

  const handleUpdateCategory = async (id, name) => {
    const data = {
      name
    };

    await updateCategory(id, data);
    mutateCategory(mutate);
  };

  const handleDeleteCategory = async (id) => {
    throw new Error('Not implemented');
  };

  return {
    createCategory: handleCreateCategory,
    updateCategory: handleUpdateCategory,
    deleteCategory: handleDeleteCategory
  };
};

function mutateCategory(mutate) {
  mutate('/category');
}
