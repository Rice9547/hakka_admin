import { useSWRConfig } from 'swr';
import { useStoryList, useStoryDetail, useStoryMutations } from '../api/story';

export const DIALECTS = [
  { key: 'sijian', label: '四縣腔' },
  { key: 'hailu', label: '海陸腔' },
];

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
      content_cn: page.content_cn,
      content_hakka: page.content_hakka,
      page_number: page.page_number,
      image: page.image,
      audios: Object.entries(page.audios)
        .filter(([_, url]) => url)
        .map(([dialect, audio_url]) => ({
          dialect,
          audio_url
        }))
    }))
  };

  const handleCreateStory = async (title, description, cover_image, pages, categories) => {
    const data = {
      title,
      description,
      cover_image,
      pages: transformPages(pages),
      categories: categories
    };

    await createStory(data);
    mutateStory(mutate);
  };

  const handleUpdateStory = async (id, title, description, cover_image, pages, categories) => {
    const data = {
      title,
      description,
      cover_image,
      pages: transformPages(pages),
      categories: categories
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