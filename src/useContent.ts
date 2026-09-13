import { useEffect, useState } from 'react';

export interface ApiContentItem {
  id: number;
  type: 'article' | 'video' | 'social';
  title: string;
  excerpt: string;
  image_url: string;
  platform: string | null;
  link_url: string | null;
  published_at: string;
}

export function useContent() {
  const [items, setItems] = useState<ApiContentItem[]>([]);
  const [loading, setLoading] = useState(true);

  const refresh = () => {
    setLoading(true);
    return fetch('/api/content')
      .then((res) => res.json())
      .then((data) => setItems(data.items ?? []))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    refresh();
  }, []);

  return { items, loading, refresh };
}
