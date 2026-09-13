import { useEffect, useState } from 'react';

export interface ApiPartner {
  id: number;
  name: string;
  tier: 'title' | 'premium' | 'official' | 'media';
  logo_url: string | null;
}

export function usePartners() {
  const [partners, setPartners] = useState<ApiPartner[]>([]);
  const [loading, setLoading] = useState(true);

  const refresh = () => {
    setLoading(true);
    return fetch('/api/partners')
      .then((res) => res.json())
      .then((data) => setPartners(data.partners ?? []))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    refresh();
  }, []);

  return { partners, loading, refresh };
}
