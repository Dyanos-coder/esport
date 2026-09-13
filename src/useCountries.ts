import { useEffect, useState } from 'react';

export interface ApiCountry {
  id: number;
  name: string;
  code: string;
  flag: string;
  status: 'open' | 'qualifying' | 'closed' | 'qualified';
  qualified_count: number;
  total_registrations: number;
}

export function useCountries() {
  const [countries, setCountries] = useState<ApiCountry[]>([]);
  const [loading, setLoading] = useState(true);

  const refresh = () => {
    setLoading(true);
    return fetch('/api/countries')
      .then((res) => res.json())
      .then((data) => setCountries(data.countries ?? []))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    refresh();
  }, []);

  return { countries, loading, refresh };
}
