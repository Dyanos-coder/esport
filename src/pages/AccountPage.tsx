import { useEffect, useState, type FormEvent } from 'react';
import { CheckCircle2, Clock, LogOut, Save, User as UserIcon, XCircle } from 'lucide-react';
import { PageHero } from '@/components/ui';
import { heroImage2 } from '@/data';
import { useAuth } from '@/auth';
import { useRouter } from '@/router';
import { useCountries } from '@/useCountries';

interface Registration {
  id: number;
  country_id: number;
  country_name: string;
  country_flag: string;
  pseudo: string;
  full_name: string;
  phone: string;
  level: string;
  message: string | null;
  status: 'pending' | 'accepted' | 'rejected';
  email: string;
}

const statusMeta: Record<Registration['status'], { label: string; icon: typeof Clock; className: string }> = {
  pending: { label: 'En attente', icon: Clock, className: 'badge-warning' },
  accepted: { label: 'Acceptée', icon: CheckCircle2, className: 'badge-success' },
  rejected: { label: 'Refusée', icon: XCircle, className: 'badge-error' },
};

export default function AccountPage() {
  const { user, loading: authLoading, logout } = useAuth();
  const { navigate } = useRouter();
  const { countries } = useCountries();
  const [registration, setRegistration] = useState<Registration | null>(null);
  const [loading, setLoading] = useState(true);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');

  useEffect(() => {
    if (authLoading) return;
    if (!user) { navigate('login'); return; }
    if (user.role === 'admin') { navigate('admin'); return; }

    fetch('/api/profile')
      .then((res) => res.json())
      .then((data) => setRegistration(data.registration ?? null))
      .finally(() => setLoading(false));
  }, [authLoading, user, navigate]);

  const update = (field: keyof Registration, value: string | number) =>
    setRegistration((current) => (current ? { ...current, [field]: value } : current));

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!registration) return;
    setSaveStatus('saving');
    const res = await fetch('/api/profile', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        countryId: registration.country_id,
        pseudo: registration.pseudo,
        fullName: registration.full_name,
        phone: registration.phone,
        level: registration.level,
        message: registration.message,
      }),
    });
    setSaveStatus(res.ok ? 'saved' : 'error');
  };

  if (authLoading || loading) {
    return <div className="min-h-screen flex items-center justify-center text-gray-400">Chargement...</div>;
  }

  if (!registration) {
    return (
      <div className="animate-fade-in">
        <PageHero badge="Mon compte" title="Aucune candidature trouvée" desc="Il semble que ton compte n'ait pas de candidature associée." image={heroImage2} />
      </div>
    );
  }

  const status = statusMeta[registration.status];

  return (
    <div className="animate-fade-in">
      <PageHero badge="Mon compte" title={registration.pseudo} desc={registration.email} image={heroImage2}>
        <span className={`badge ${status.className}`}><status.icon className="w-3.5 h-3.5" /> {status.label}</span>
      </PageHero>
      <section className="section-pad">
        <div className="container-x max-w-3xl mx-auto glass-card p-6 md:p-10">
          <div className="flex items-center justify-between gap-3 mb-8">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-lime-500/10 border border-lime-500/20 flex items-center justify-center"><UserIcon className="w-5 h-5 text-lime-500" /></div>
              <h2 className="heading-display text-3xl text-white">Mon profil</h2>
            </div>
            <button onClick={() => { logout(); navigate('home'); }} className="btn-ghost !py-2 !px-4 !text-xs"><LogOut className="w-4 h-4" /> Déconnexion</button>
          </div>
          <form onSubmit={submit} className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <label><span className="label-field">Pays</span><select required value={registration.country_id} onChange={(e) => update('country_id', Number(e.target.value))} className="input-field"><option value="">Choisir un pays</option>{countries.map((c) => <option key={c.id} value={c.id}>{c.flag} {c.name}</option>)}</select></label>
            <label><span className="label-field">Pseudo</span><input required value={registration.pseudo} onChange={(e) => update('pseudo', e.target.value)} className="input-field" /></label>
            <label><span className="label-field">Nom complet</span><input required value={registration.full_name} onChange={(e) => update('full_name', e.target.value)} className="input-field" /></label>
            <label><span className="label-field">Téléphone</span><input required value={registration.phone} onChange={(e) => update('phone', e.target.value)} className="input-field" /></label>
            <label><span className="label-field">Niveau</span><select required value={registration.level} onChange={(e) => update('level', e.target.value)} className="input-field"><option value="amateur">Amateur</option><option value="semipro">Semi-pro</option><option value="pro">Pro</option></select></label>
            <label className="md:col-span-2"><span className="label-field">Message</span><textarea value={registration.message ?? ''} onChange={(e) => update('message', e.target.value)} rows={4} className="input-field resize-none" /></label>
            {saveStatus === 'saved' && <div className="md:col-span-2 rounded-xl bg-success-500/10 border border-success-500/30 p-4 text-sm text-success-400">Profil mis à jour.</div>}
            {saveStatus === 'error' && <div className="md:col-span-2 rounded-xl bg-error-500/10 border border-error-500/30 p-4 text-sm text-error-400">Une erreur est survenue.</div>}
            <div className="md:col-span-2">
              <button disabled={saveStatus === 'saving'} type="submit" className="btn-primary w-full sm:w-auto">{saveStatus === 'saving' ? 'Enregistrement...' : 'Enregistrer'}<Save className="w-4 h-4" /></button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}
