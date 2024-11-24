import { useAuth0 } from '@auth0/auth0-react';
import { config } from '../config';

export const useFetcher = () => {
  const { getAccessTokenSilently } = useAuth0();

  const fetcher = async (url, init) => {
    try {
      const token = await getAccessTokenSilently();
      const fullUrl = url.startsWith('http') ? url : `${config.apiHost}${url}`;

      const headers = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      };

      const response = await fetch(fullUrl, {
        headers,
        ...init,
      });

      if (!response.ok) {
        const error = new Error('API request failed');
        error.status = response.status;
        error.info = await response.json();
        throw error;
      }

      return response.json();
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  };

  return fetcher;
};
