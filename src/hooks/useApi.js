import useSWR from 'swr';
import { useFetcher } from '../lib/fetcher';

export const useApi = (path, options = {}) => {
  const fetcher = useFetcher();

  return useSWR(path, fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: true,
    dedupingInterval: 5000,
    ...options,
  });
};