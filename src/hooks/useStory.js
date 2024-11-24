import { useSWRConfig } from 'swr';
import { useStoryList, useStoryDetail, useStoryMutations } from '../api/story';

export const useStories = () => {
  const { data, error, isLoading } = useStoryList();

  return {
    stories: data?.data || [],
    isLoading,
    isError: error
  };
};

export const useStory = (id) => {
  const { data, error, isLoading } = useStoryDetail(id);

  return {
    story: data?.data,
    isLoading,
    isError: error
  };
};

export const useStoryActions = () => {
  const { mutate } = useSWRConfig();
  const { createStory, updateStory, deleteStory } = useStoryMutations();

  const transformPages = (pages) => {
    return pages.map(page => ({
      content_cn: page.content_cn || '',
      content_hakka: page.content_hakka || '',
      page_number: page.page_number
    }));
  };

  const handleCreateStory = async (title, description, pages) => {
    const data = {
      title,
      description,
      pages: transformPages(pages)
    };

    await createStory(data);
    mutateStory(mutate);
  };

  const handleUpdateStory = async (id, title, description, pages) => {
    const data = {
      title,
      description,
      pages: transformPages(pages)
    };

    await updateStory(id, data);
    mutateStory(mutate);
    mutateStoryDetail(mutate, id);
  };

  const handleDeleteStory = async (id) => {
    await deleteStory(id);
    mutateStory(mutate);
  };

  return {
    createStory: handleCreateStory,
    updateStory: handleUpdateStory,
    deleteStory: handleDeleteStory
  };
};

function mutateStory(mutate) {
  mutate('/story');
}

function mutateStoryDetail(mutate, id) {
  mutate(`/story/${id}`);
}