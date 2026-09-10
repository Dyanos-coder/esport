import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

export type Route =
  | 'home'
  | 'concept'
  | 'countries'
  | 'register'
  | 'rules'
  | 'players'
  | 'results'
  | 'finale'
  | 'content'
  | 'partners'
  | 'project';

interface RouterContextValue {
  route: Route;
  navigate: (route: Route) => void;
}

const RouterContext = createContext<RouterContextValue | null>(null);

export function RouterProvider({ children }: { children: ReactNode }) {
  const [route, setRoute] = useState<Route>('home');

  const navigate = (r: Route) => {
    setRoute(r);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  useEffect(() => {
    const onPopState = () => {
      const hash = window.location.hash.replace('#/', '') || 'home';
      setRoute(hash as Route);
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  return <RouterContext.Provider value={{ route, navigate }}>{children}</RouterContext.Provider>;
}

export function useRouter() {
  const ctx = useContext(RouterContext);
  if (!ctx) throw new Error('useRouter must be used within RouterProvider');
  return ctx;
}
