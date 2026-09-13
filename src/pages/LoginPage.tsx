import { useState, type FormEvent } from 'react';
import { LogIn, ShieldCheck } from 'lucide-react';
import { PageHero } from '@/components/ui';
import { heroImage2 } from '@/data';
import { useAuth } from '@/auth';
import { useRouter } from '@/router';

export default function LoginPage() {
  const { login } = useAuth();
  const { navigate } = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle');
  const [error, setError] = useState('');

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus('loading');
    const result = await login(email, password);
    if (result.ok) {
      navigate('account');
      return;
    }
    setError(result.error || 'Identifiants invalides');
    setStatus('error');
  };

  return (
    <div className="animate-fade-in">
      <PageHero badge="Connexion" title="Content de te revoir" desc="Connecte-toi pour accéder à ton profil et suivre ta candidature." image={heroImage2} />
      <section className="section-pad">
        <div className="container-x max-w-md mx-auto glass-card p-6 md:p-10">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-11 h-11 rounded-xl bg-lime-500/10 border border-lime-500/20 flex items-center justify-center"><LogIn className="w-5 h-5 text-lime-500" /></div>
            <h2 className="heading-display text-3xl text-white">Connexion</h2>
          </div>
          <form onSubmit={submit} className="flex flex-col gap-5">
            <label><span className="label-field">Email</span><input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="ton@email.com" className="input-field" /></label>
            <label><span className="label-field">Mot de passe</span><input required type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="input-field" /></label>
            {status === 'error' && <div className="rounded-xl bg-error-500/10 border border-error-500/30 p-4 text-sm text-error-400">{error}</div>}
            <button disabled={status === 'loading'} type="submit" className="btn-primary w-full">{status === 'loading' ? 'Connexion...' : 'Se connecter'}<LogIn className="w-4 h-4" /></button>
            <div className="flex items-center gap-2 text-xs text-gray-500"><ShieldCheck className="w-4 h-4 text-success-400" /> Connexion sécurisée.</div>
            <p className="text-sm text-gray-400">
              Pas encore de compte ? <button type="button" onClick={() => navigate('register')} className="text-lime-500 font-semibold hover:text-lime-400">S&apos;inscrire</button>
            </p>
          </form>
        </div>
      </section>
    </div>
  );
}
