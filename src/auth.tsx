import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from 'react';
import { flushSync } from 'react-dom';

export type Role = 'player' | 'admin';

export interface AuthUser {
  id: number;
  email: string;
  role: Role;
}

export interface SignupData {
  email: string;
  password: string;
  countryId: number;
  pseudo: string;
  fullName: string;
  phone: string;
  level: string;
  message?: string;
}

interface ActionResult {
  ok: boolean;
  error?: string;
}

interface AuthContextValue {
  user: AuthUser | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<ActionResult>;
  signup: (data: SignupData) => Promise<ActionResult>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  // Bumped on every login/signup/logout so a slow, now-stale /api/auth/me
  // response from the initial session check can't clobber a fresher state.
  const authVersion = useRef(0);

  useEffect(() => {
    const versionAtStart = authVersion.current;
    fetch('/api/auth/me')
      .then((res) => res.json())
      .then((data) => {
        if (authVersion.current === versionAtStart) setUser(data.user ?? null);
      })
      .catch(() => {
        if (authVersion.current === versionAtStart) setUser(null);
      })
      .finally(() => setLoading(false));
  }, []);

  const login = async (email: string, password: string): Promise<ActionResult> => {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) return { ok: false, error: data.error || 'Identifiants invalides' };
      authVersion.current += 1;
      flushSync(() => setUser(data.user));
      return { ok: true };
    } catch {
      return { ok: false, error: 'Impossible de contacter le serveur. Réessaie plus tard.' };
    }
  };

  const signup = async (payload: SignupData): Promise<ActionResult> => {
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) return { ok: false, error: data.error || 'Erreur lors de l\'inscription' };
      authVersion.current += 1;
      flushSync(() => setUser(data.user));
      return { ok: true };
    } catch {
      return { ok: false, error: 'Impossible de contacter le serveur. Réessaie plus tard.' };
    }
  };

  const logout = async () => {
    authVersion.current += 1;
    await fetch('/api/auth/logout', { method: 'POST' });
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
