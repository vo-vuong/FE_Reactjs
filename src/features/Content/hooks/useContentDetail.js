import contentApi from 'api/contentApi';
import productApi from 'api/productApi';
import { useEffect, useState } from 'react';

export default function useContentDetail(contentId) {
  const [content, setContent] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const result = await contentApi.get(contentId);
        setContent(result);
      } catch (error) {
        console.log('Failed to fetch content.', error);
      }

      setLoading(false);
    })();
  }, [contentId]);

  return { content, loading };
}
