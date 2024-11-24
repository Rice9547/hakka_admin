import { useFetcher } from '../lib/fetcher';
import {useAuth0} from "@auth0/auth0-react";
import {config} from "../config";

export const useAudioUpload = () => {
  const fetcher = useFetcher();
  const { getAccessTokenSilently } = useAuth0();

  const uploadAudio = async (formData) => {
    const response = await fetch( config.apiHost+'/admin/audio/upload', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${await getAccessTokenSilently()}`,
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Upload failed');
    }

    return response.json().then(data => {
      return data.data;
    });
  };

  const generateAudio = async (prompt) => {
    const response = await fetcher('/admin/audio/generate', {
      method: 'POST',
      body: JSON.stringify({ prompt })
    });

    return response.data;
  };

  return {
    uploadAudio,
    generateAudio
  };
};