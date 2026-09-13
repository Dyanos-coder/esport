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
  | 'project'
  | 'login'
  | 'account'
  | 'admin';

interface RouterContextValue {
  route: Route;
  navigate: (route: Route) => void;
}

const RouterContext = createContext<RouterContextValue | null>(null);

const VALID_ROUTES: Route[] = [
  'home', 'concept', 'countries', 'register', 'rules', 'players', 'results', 'finale', 'content', 'partners', 'project',
  'login', 'account', 'admin',
];

function getRouteFromHash(): Route {
  const hash = window.location.hash.replace('#/', '');
  return (VALID_ROUTES as string[]).includes(hash) ? (hash as Route) : 'home';
}

export function RouterProvider({ children }: { children: ReactNode }) {
  const [route, setRoute] = useState<Route>(() => getRouteFromHash());

  const navigate = (r: Route) => {
    setRoute(r);
    window.location.hash = `/${r}`;
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  useEffect(() => {
    const onHashChange = () => setRoute(getRouteFromHash());
    window.addEventListener('popstate', onHashChange);
    window.addEventListener('hashchange', onHashChange);
    return () => {
      window.removeEventListener('popstate', onHashChange);
      window.removeEventListener('hashchange', onHashChange);
    };
  }, []);

  return <RouterContext.Provider value={{ route, navigate }}>{children}</RouterContext.Provider>;
}

export function useRouter() {
  const ctx = useContext(RouterContext);
  if (!ctx) throw new Error('useRouter must be used within RouterProvider');
  return ctx;
}
