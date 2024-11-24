import { useFetcher } from '../lib/fetcher';
import {useAuth0} from "@auth0/auth0-react";
import {config} from "../config";

export const useImageUpload = () => {
  const fetcher = useFetcher();
  const { getAccessTokenSilently } = useAuth0();

  const uploadImage = async (formData) => {
    const response = await fetch( config.apiHost+'/admin/image/upload', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${await getAccessTokenSilently()}`,
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Upload failed');
    }

    return response.json();
  };

  const generateImage = async (prompt) => {
    const response = await fetcher('/admin/image/generate', {
      method: 'POST',
      body: JSON.stringify({ prompt })
    });

    return response;
  };

  return {
    uploadImage,
    generateImage
  };
};