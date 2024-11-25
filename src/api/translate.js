import { useFetcher } from '../lib/fetcher';

export const useTranslator = () => {
  const fetcher = useFetcher();

  const translate = async (text) => {
    const response = await fetcher('/admin/translate/hakka', {
      method: 'POST',
      body: JSON.stringify({ text })
    });

    return response.data;
  };

  return {
    translate
  };
};