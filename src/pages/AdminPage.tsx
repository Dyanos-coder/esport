import { useEffect, useState, type FormEvent } from 'react';
import { LogOut, ShieldCheck, Plus, Trash2, X, Wrench } from 'lucide-react';
import { PageHero } from '@/components/ui';
import { heroImage2 } from '@/data';
import { useAuth } from '@/auth';
import { useRouter } from '@/router';
import { useCountries, type ApiCountry } from '@/useCountries';
import { useContent, type ApiContentItem } from '@/useContent';
import { usePartners, type ApiPartner } from '@/usePartners';

interface Registration {
  id: number;
  country: string;
  country_flag: string;
  pseudo: string;
  full_name: string;
  email: string;
  phone: string;
  level: string;
  status: 'pending' | 'accepted' | 'rejected';
  created_at: string;
}

const statusOptions: Registration['status'][] = ['pending', 'accepted', 'rejected'];
const statusLabels: Record<Registration['status'], string> = {
  pending: 'En attente',
  accepted: 'Acceptée',
  rejected: 'Refusée',
};

const countryStatusOptions: ApiCountry['status'][] = ['open', 'qualifying', 'qualified', 'closed'];
const countryStatusLabels: Record<ApiCountry['status'], string> = {
  open: 'Ouvert',
  qualifying: 'En cours',
  qualified: 'Qualifié',
  closed: 'Clos',
};

interface Stats {
  totals: { total: number; pending: number; accepted: number; rejected: number };
  byLevel: Record<'amateur' | 'semipro' | 'pro', number>;
  byCountry: { id: number; name: string; flag: string; total_registrations: number; qualified_count: number }[];
  trend: { date: string; count: number }[];
}

const levelLabels: [key: 'amateur' | 'semipro' | 'pro', label: string][] = [
  ['amateur', 'Amateur'],
  ['semipro', 'Semi-pro'],
  ['pro', 'Pro'],
];

function DashboardTab() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/stats').then((res) => res.json()).then(setStats).finally(() => setLoading(false));
  }, []);

  if (loading || !stats) return <div className="text-center text-gray-500 py-16">Chargement...</div>;

  const maxCountry = Math.max(1, ...stats.byCountry.map((c) => c.total_registrations));
  const maxLevel = Math.max(1, ...levelLabels.map(([key]) => stats.byLevel[key]));
  const maxTrend = Math.max(1, ...stats.trend.map((t) => t.count));

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="glass-card p-5">
          <div className="heading-display text-3xl text-white">{stats.totals.total}</div>
          <div className="text-xs text-gray-500 uppercase tracking-wide mt-1">Candidatures</div>
        </div>
        <div className="glass-card p-5">
          <div className="heading-display text-3xl text-warning-400">{stats.totals.pending}</div>
          <div className="text-xs text-gray-500 uppercase tracking-wide mt-1">En attente</div>
        </div>
        <div className="glass-card p-5">
          <div className="heading-display text-3xl text-success-400">{stats.totals.accepted}</div>
          <div className="text-xs text-gray-500 uppercase tracking-wide mt-1">Acceptées</div>
        </div>
        <div className="glass-card p-5">
          <div className="heading-display text-3xl text-error-400">{stats.totals.rejected}</div>
          <div className="text-xs text-gray-500 uppercase tracking-wide mt-1">Refusées</div>
        </div>
      </div>

      <div className="glass-card p-6">
        <h3 className="text-sm font-bold text-white mb-4">Inscriptions — 14 derniers jours</h3>
        {maxTrend === 1 && stats.trend.every((t) => t.count === 0) ? (
          <p className="text-xs text-gray-500">Aucune inscription sur cette période.</p>
        ) : (
          <>
            <div className="flex items-end gap-1.5 h-24">
              {stats.trend.map((t) => (
                <div key={t.date} title={`${t.date} : ${t.count} inscription${t.count > 1 ? 's' : ''}`} className="flex-1 h-full flex items-end">
                  <div
                    className="w-full bg-lime-500/70 hover:bg-lime-500 rounded-t-sm transition-colors"
                    style={{ height: `${Math.max((t.count / maxTrend) * 100, t.count > 0 ? 6 : 2)}%` }}
                  />
                </div>
              ))}
            </div>
            <div className="flex justify-between text-[10px] text-gray-600 mt-2">
              <span>{stats.trend[0]?.date}</span>
              <span>{stats.trend[stats.trend.length - 1]?.date}</span>
            </div>
          </>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-card p-6">
          <h3 className="text-sm font-bold text-white mb-4">Inscriptions par pays</h3>
          {stats.byCountry.every((c) => c.total_registrations === 0) ? (
            <p className="text-xs text-gray-500">Aucune inscription pour le moment.</p>
          ) : (
            <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
              {stats.byCountry.filter((c) => c.total_registrations > 0).map((c) => (
                <div key={c.id} title={`${c.total_registrations} inscription${c.total_registrations > 1 ? 's' : ''} — ${c.qualified_count}/2 qualifiés`}>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-gray-300">{c.flag} {c.name}</span>
                    <span className="text-gray-500">{c.total_registrations}</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                    <div className="h-full bg-lime-500 rounded-full" style={{ width: `${(c.total_registrations / maxCountry) * 100}%` }} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="glass-card p-6">
          <h3 className="text-sm font-bold text-white mb-4">Répartition par niveau</h3>
          <div className="space-y-4">
            {levelLabels.map(([key, label]) => (
              <div key={key}>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-gray-300">{label}</span>
                  <span className="text-gray-500">{stats.byLevel[key]}</span>
                </div>
                <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                  <div className="h-full bg-purple-400 rounded-full" style={{ width: `${(stats.byLevel[key] / maxLevel) * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function RegistrationsTab() {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/registrations')
      .then((res) => res.json())
      .then((data) => setRegistrations(data.registrations ?? []))
      .finally(() => setLoading(false));
  }, []);

  const updateStatus = async (id: number, status: Registration['status']) => {
    setRegistrations((current) => current.map((r) => (r.id === id ? { ...r, status } : r)));
    await fetch(`/api/admin/registrations/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
  };

  if (loading) return <div className="text-center text-gray-500 py-16">Chargement...</div>;

  if (registrations.length === 0) {
    return (
      <div className="glass-card p-10 text-center text-gray-400 flex flex-col items-center gap-3">
        <ShieldCheck className="w-8 h-8 text-gray-600" />
        Aucune candidature pour le moment.
      </div>
    );
  }

  return (
    <div className="glass-card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-[10px] text-gray-500 uppercase border-b border-white/10">
              <th className="text-left px-5 py-4">Pays</th>
              <th className="text-left px-5 py-4">Pseudo</th>
              <th className="text-left px-5 py-4">Nom</th>
              <th className="text-left px-5 py-4">Email</th>
              <th className="text-left px-5 py-4">Téléphone</th>
              <th className="text-left px-5 py-4">Niveau</th>
              <th className="text-left px-5 py-4">Statut</th>
            </tr>
          </thead>
          <tbody>
            {registrations.map((r) => (
              <tr key={r.id} className="border-t border-white/5">
                <td className="px-5 py-4 text-white font-medium">{r.country_flag} {r.country}</td>
                <td className="px-5 py-4 text-white">{r.pseudo}</td>
                <td className="px-5 py-4 text-gray-400">{r.full_name}</td>
                <td className="px-5 py-4 text-gray-400">{r.email}</td>
                <td className="px-5 py-4 text-gray-400">{r.phone}</td>
                <td className="px-5 py-4 text-gray-400 capitalize">{r.level}</td>
                <td className="px-5 py-4">
                  <select
                    value={r.status}
                    onChange={(e) => updateStatus(r.id, e.target.value as Registration['status'])}
                    className="input-field !py-1.5 !px-3 !text-xs w-auto"
                  >
                    {statusOptions.map((s) => (
                      <option key={s} value={s}>{statusLabels[s]}</option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function CountriesTab() {
  const { countries, loading, refresh } = useCountries();
  const [form, setForm] = useState({ name: '', code: '', flag: '', status: 'open' as ApiCountry['status'] });
  const [error, setError] = useState('');

  const addCountry = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    const res = await fetch('/api/admin/countries', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    if (!res.ok) { setError(data.error || 'Erreur'); return; }
    setForm({ name: '', code: '', flag: '', status: 'open' });
    refresh();
  };

  const updateStatus = async (id: number, status: ApiCountry['status']) => {
    await fetch(`/api/admin/countries/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    refresh();
  };

  const removeCountry = async (id: number) => {
    const res = await fetch(`/api/admin/countries/${id}`, { method: 'DELETE' });
    if (!res.ok) {
      const data = await res.json();
      setError(data.error || 'Erreur');
      return;
    }
    refresh();
  };

  return (
    <div className="space-y-6">
      <form onSubmit={addCountry} className="glass-card p-5 grid grid-cols-2 md:grid-cols-5 gap-3 items-end">
        <label className="md:col-span-2"><span className="label-field !mb-1 !text-[10px]">Nom</span><input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Bénin" className="input-field !py-2" /></label>
        <label><span className="label-field !mb-1 !text-[10px]">Code</span><input required maxLength={5} value={form.code} onChange={(e) => setForm({ ...form, code: e.target.value })} placeholder="BJ" className="input-field !py-2" /></label>
        <label><span className="label-field !mb-1 !text-[10px]">Drapeau</span><input required value={form.flag} onChange={(e) => setForm({ ...form, flag: e.target.value })} placeholder="🇧🇯" className="input-field !py-2" /></label>
        <button type="submit" className="btn-primary !py-2.5 justify-center"><Plus className="w-4 h-4" /> Ajouter</button>
      </form>
      {error && <div className="rounded-xl bg-error-500/10 border border-error-500/30 p-3 text-sm text-error-400">{error}</div>}

      {loading ? (
        <div className="text-center text-gray-500 py-16">Chargement...</div>
      ) : (
        <div className="glass-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-[10px] text-gray-500 uppercase border-b border-white/10">
                  <th className="text-left px-5 py-4">Pays</th>
                  <th className="text-left px-5 py-4">Code</th>
                  <th className="text-left px-5 py-4">Qualifiés</th>
                  <th className="text-left px-5 py-4">Inscriptions</th>
                  <th className="text-left px-5 py-4">Statut</th>
                  <th className="px-5 py-4"></th>
                </tr>
              </thead>
              <tbody>
                {countries.map((c) => (
                  <tr key={c.id} className="border-t border-white/5">
                    <td className="px-5 py-4 text-white font-medium">{c.flag} {c.name}</td>
                    <td className="px-5 py-4 text-gray-400">{c.code}</td>
                    <td className="px-5 py-4 text-gray-400">{c.qualified_count}/2</td>
                    <td className="px-5 py-4 text-gray-400">{c.total_registrations}</td>
                    <td className="px-5 py-4">
                      <select
                        value={c.status}
                        onChange={(e) => updateStatus(c.id, e.target.value as ApiCountry['status'])}
                        className="input-field !py-1.5 !px-3 !text-xs w-auto"
                      >
                        {countryStatusOptions.map((s) => (
                          <option key={s} value={s}>{countryStatusLabels[s]}</option>
                        ))}
                      </select>
                    </td>
                    <td className="px-5 py-4">
                      <button onClick={() => removeCountry(c.id)} className="text-gray-500 hover:text-error-400 transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

interface QualPlayer {
  id: number;
  pseudo: string;
  full_name: string;
}

interface QualMatch {
  id: number;
  player1_id: number;
  player2_id: number;
  player1_pseudo: string;
  player2_pseudo: string;
  score1: number | null;
  score2: number | null;
}

interface QualStanding {
  id: number;
  pseudo: string;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  gf: number;
  ga: number;
  pts: number;
}

interface QualGroup {
  id: number;
  name: string;
  members: QualPlayer[];
  matches: QualMatch[];
  standings: QualStanding[];
}

interface QualData {
  country: { id: number; name: string; flag: string };
  ungrouped: QualPlayer[];
  groups: QualGroup[];
}

function MatchScoreRow({ match, onSave }: { match: QualMatch; onSave: (id: number, score1: number | null, score2: number | null) => void }) {
  const [score1, setScore1] = useState(match.score1 !== null ? String(match.score1) : '');
  const [score2, setScore2] = useState(match.score2 !== null ? String(match.score2) : '');

  const save = (s1: string, s2: string) => {
    onSave(match.id, s1 === '' ? null : Number(s1), s2 === '' ? null : Number(s2));
  };

  return (
    <div className="flex items-center gap-2 text-xs bg-white/5 rounded-lg px-3 py-2">
      <span className="flex-1 text-white truncate">{match.player1_pseudo}</span>
      <input
        type="number"
        min={0}
        value={score1}
        onChange={(e) => setScore1(e.target.value)}
        onBlur={() => save(score1, score2)}
        className="input-field !py-1 !px-2 !text-xs w-12 text-center"
      />
      <span className="text-gray-600">–</span>
      <input
        type="number"
        min={0}
        value={score2}
        onChange={(e) => setScore2(e.target.value)}
        onBlur={() => save(score1, score2)}
        className="input-field !py-1 !px-2 !text-xs w-12 text-center"
      />
      <span className="flex-1 text-white truncate text-right">{match.player2_pseudo}</span>
    </div>
  );
}

interface BracketMatch {
  id: number;
  round: number;
  slot: number;
  player1_id: number | null;
  player2_id: number | null;
  player1_pseudo: string | null;
  player2_pseudo: string | null;
  score1: number | null;
  score2: number | null;
  winner_id: number | null;
}

function BracketMatchRow({ match, onSave }: { match: BracketMatch; onSave: (id: number, score1: number | null, score2: number | null) => void }) {
  const [score1, setScore1] = useState(match.score1 !== null ? String(match.score1) : '');
  const [score2, setScore2] = useState(match.score2 !== null ? String(match.score2) : '');
  const ready = Boolean(match.player1_id && match.player2_id);

  const save = (s1: string, s2: string) => {
    if (!ready) return;
    onSave(match.id, s1 === '' ? null : Number(s1), s2 === '' ? null : Number(s2));
  };

  return (
    <div className={`rounded-lg px-3 py-2 text-xs space-y-1.5 ${match.winner_id ? 'bg-lime-500/10 border border-lime-500/20' : 'bg-white/5'}`}>
      <div className="flex items-center gap-2">
        <span className={`flex-1 truncate ${match.winner_id && match.winner_id === match.player1_id ? 'text-lime-500 font-bold' : 'text-white'}`}>
          {match.player1_pseudo ?? 'À déterminer'}
        </span>
        <input
          type="number"
          min={0}
          disabled={!ready}
          value={score1}
          onChange={(e) => setScore1(e.target.value)}
          onBlur={() => save(score1, score2)}
          className="input-field !py-1 !px-2 !text-xs w-10 text-center disabled:opacity-30"
        />
      </div>
      <div className="flex items-center gap-2">
        <span className={`flex-1 truncate ${match.winner_id && match.winner_id === match.player2_id ? 'text-lime-500 font-bold' : 'text-white'}`}>
          {match.player2_pseudo ?? 'À déterminer'}
        </span>
        <input
          type="number"
          min={0}
          disabled={!ready}
          value={score2}
          onChange={(e) => setScore2(e.target.value)}
          onBlur={() => save(score1, score2)}
          className="input-field !py-1 !px-2 !text-xs w-10 text-center disabled:opacity-30"
        />
      </div>
    </div>
  );
}

function roundLabel(round: number, totalRounds: number): string {
  const fromEnd = totalRounds - round;
  if (fromEnd === 0) return 'Finale';
  if (fromEnd === 1) return 'Demi-finales';
  if (fromEnd === 2) return 'Quarts';
  if (fromEnd === 3) return 'Huitièmes';
  return `Round ${round}`;
}

function QualificationsTab() {
  const { countries } = useCountries();
  const [countryId, setCountryId] = useState('');
  const [data, setData] = useState<QualData | null>(null);
  const [loading, setLoading] = useState(false);
  const [newGroupName, setNewGroupName] = useState('');
  const [bracket, setBracket] = useState<BracketMatch[]>([]);
  const [selectedForBracket, setSelectedForBracket] = useState<number[]>([]);
  const [bracketError, setBracketError] = useState('');

  const refresh = (id: string) => {
    if (!id) return;
    setLoading(true);
    fetch(`/api/admin/qualifications/${id}`)
      .then((res) => res.json())
      .then(setData)
      .finally(() => setLoading(false));
    fetch(`/api/admin/brackets/${id}`)
      .then((res) => res.json())
      .then((d) => setBracket(d.matches ?? []));
  };

  useEffect(() => {
    setSelectedForBracket([]);
    setBracketError('');
    if (countryId) refresh(countryId);
  }, [countryId]);

  const toggleBracketSelection = (playerId: number) => {
    setSelectedForBracket((current) =>
      current.includes(playerId) ? current.filter((id) => id !== playerId) : [...current, playerId],
    );
  };

  const generateBracket = async () => {
    setBracketError('');
    const res = await fetch(`/api/admin/brackets/${countryId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ playerIds: selectedForBracket }),
    });
    const resData = await res.json();
    if (!res.ok) { setBracketError(resData.error || 'Erreur'); return; }
    setSelectedForBracket([]);
    refresh(countryId);
  };

  const resetBracket = async () => {
    await fetch(`/api/admin/brackets/${countryId}`, { method: 'DELETE' });
    refresh(countryId);
  };

  const updateBracketScore = async (matchId: number, score1: number | null, score2: number | null) => {
    await fetch(`/api/admin/bracket-matches/${matchId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ score1, score2 }),
    });
    refresh(countryId);
  };

  const createGroup = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!newGroupName.trim()) return;
    await fetch('/api/admin/qualification-groups', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ countryId: Number(countryId), name: newGroupName.trim() }),
    });
    setNewGroupName('');
    refresh(countryId);
  };

  const deleteGroup = async (groupId: number) => {
    await fetch(`/api/admin/qualification-groups/${groupId}`, { method: 'DELETE' });
    refresh(countryId);
  };

  const assignToGroup = async (playerId: number, groupId: number | null) => {
    await fetch(`/api/admin/registrations/${playerId}/group`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ groupId }),
    });
    refresh(countryId);
  };

  const updateScore = async (matchId: number, score1: number | null, score2: number | null) => {
    await fetch(`/api/admin/group-matches/${matchId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ score1, score2 }),
    });
    refresh(countryId);
  };

  return (
    <div className="space-y-6">
      <select value={countryId} onChange={(e) => setCountryId(e.target.value)} className="input-field !py-2.5 max-w-xs">
        <option value="">Choisir un pays</option>
        {countries.map((c) => <option key={c.id} value={c.id}>{c.flag} {c.name}</option>)}
      </select>

      {!countryId && <p className="text-sm text-gray-500">Sélectionne un pays pour gérer ses groupes de qualification.</p>}

      {countryId && loading && <div className="text-center text-gray-500 py-16">Chargement...</div>}

      {countryId && !loading && data && (
        <div className="space-y-6">
          {data.ungrouped.length > 0 && (
            <div className="glass-card p-5">
              <h3 className="text-sm font-bold text-white mb-3">Candidats acceptés non groupés ({data.ungrouped.length})</h3>
              <div className="space-y-2">
                {data.ungrouped.map((p) => (
                  <div key={p.id} className="flex items-center justify-between gap-3 bg-white/5 rounded-lg px-4 py-2.5">
                    <span className="text-sm text-white">{p.pseudo} <span className="text-gray-500">— {p.full_name}</span></span>
                    <select
                      defaultValue=""
                      onChange={(e) => { if (e.target.value) assignToGroup(p.id, Number(e.target.value)); }}
                      className="input-field !py-1.5 !px-3 !text-xs w-auto"
                    >
                      <option value="" disabled>Assigner à un groupe</option>
                      {data.groups.map((g) => <option key={g.id} value={g.id}>{g.name}</option>)}
                    </select>
                  </div>
                ))}
              </div>
            </div>
          )}

          <form onSubmit={createGroup} className="flex gap-3">
            <input value={newGroupName} onChange={(e) => setNewGroupName(e.target.value)} placeholder="Nom du groupe (ex: Groupe A)" className="input-field !py-2.5" />
            <button type="submit" className="btn-primary !py-2.5 !px-5 whitespace-nowrap"><Plus className="w-4 h-4" /> Créer</button>
          </form>

          {data.groups.length === 0 ? (
            <p className="text-sm text-gray-500">Aucun groupe créé pour ce pays.</p>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {data.groups.map((group) => (
                <div key={group.id} className="glass-card p-5">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="heading-display text-xl text-white">{group.name}</h3>
                    <button onClick={() => deleteGroup(group.id)} className="text-gray-500 hover:text-error-400 transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  {group.members.length === 0 ? (
                    <p className="text-xs text-gray-500 mb-4">Aucun joueur dans ce groupe.</p>
                  ) : (
                    <>
                      <div className="overflow-x-auto mb-4">
                        <table className="w-full text-xs">
                          <thead>
                            <tr className="text-[10px] text-gray-500 uppercase border-b border-white/10">
                              <th className="text-left py-2 pr-1" title="Sélectionner pour le bracket national">Br.</th>
                              <th className="text-left py-2">Joueur</th>
                              <th>J</th><th>V</th><th>N</th><th>D</th><th>Diff</th><th>Pts</th><th></th>
                            </tr>
                          </thead>
                          <tbody>
                            {group.standings.map((s) => (
                              <tr key={s.id} className="border-t border-white/5">
                                <td className="py-2 pr-1">
                                  <input
                                    type="checkbox"
                                    checked={selectedForBracket.includes(s.id)}
                                    onChange={() => toggleBracketSelection(s.id)}
                                    className="accent-lime-500"
                                  />
                                </td>
                                <td className="py-2 text-white">{s.pseudo}</td>
                                <td className="text-center text-gray-400">{s.played}</td>
                                <td className="text-center text-gray-400">{s.won}</td>
                                <td className="text-center text-gray-400">{s.drawn}</td>
                                <td className="text-center text-gray-400">{s.lost}</td>
                                <td className="text-center text-gray-400">{s.gf - s.ga}</td>
                                <td className="text-center text-lime-500 font-bold">{s.pts}</td>
                                <td className="text-right">
                                  <button onClick={() => assignToGroup(s.id, null)} className="text-gray-600 hover:text-error-400 transition-colors" title="Retirer du groupe">
                                    <X className="w-3.5 h-3.5" />
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                      <div className="space-y-2">
                        {group.matches.map((m) => (
                          <MatchScoreRow key={m.id} match={m} onSave={updateScore} />
                        ))}
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          )}

          <div className="glass-card p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-white">Bracket national</h3>
              {bracket.length > 0 && (
                <button onClick={resetBracket} className="text-xs text-gray-500 hover:text-error-400 transition-colors flex items-center gap-1">
                  <Trash2 className="w-3.5 h-3.5" /> Réinitialiser
                </button>
              )}
            </div>

            {bracketError && <div className="mb-4 rounded-xl bg-error-500/10 border border-error-500/30 p-3 text-sm text-error-400">{bracketError}</div>}

            {bracket.length === 0 ? (
              <div className="space-y-3">
                <p className="text-xs text-gray-500">
                  Coche les joueurs (colonne « Br. » dans les classements ci-dessus) qui accèdent au bracket à élimination directe, puis génère-le.
                </p>
                <p className="text-xs text-gray-400">{selectedForBracket.length} joueur{selectedForBracket.length > 1 ? 's' : ''} sélectionné{selectedForBracket.length > 1 ? 's' : ''}</p>
                <button
                  onClick={generateBracket}
                  disabled={selectedForBracket.length < 2}
                  className="btn-primary !py-2.5 !px-5 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Générer le bracket national
                </button>
              </div>
            ) : (
              (() => {
                const totalRounds = Math.max(...bracket.map((m) => m.round));
                const finalMatch = bracket.find((m) => m.round === totalRounds);
                const finalists = finalMatch?.player1_id && finalMatch?.player2_id
                  ? [finalMatch.player1_pseudo, finalMatch.player2_pseudo]
                  : null;
                const rounds = Array.from({ length: totalRounds }, (_, i) => i + 1);
                return (
                  <div className="space-y-4">
                    {finalists && (
                      <div className="rounded-xl bg-lime-500/10 border border-lime-500/20 p-3 text-sm text-lime-400 font-semibold">
                        🏆 Duo qualifié pour la finale au Bénin : {finalists[0]} & {finalists[1]}
                      </div>
                    )}
                    <div className="overflow-x-auto">
                      <div className="flex gap-6 min-w-max pb-2">
                        {rounds.map((round) => (
                          <div key={round} className="w-40 space-y-3">
                            <h4 className="text-[10px] text-gray-500 uppercase tracking-wide">{roundLabel(round, totalRounds)}</h4>
                            {bracket.filter((m) => m.round === round).map((m) => (
                              <BracketMatchRow key={m.id} match={m} onSave={updateBracketScore} />
                            ))}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })()
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function FinalistsTab() {
  const [finalists, setFinalists] = useState<{ id: number; pseudo: string; full_name: string; level: string; email: string; country_id: number; country_name: string; country_flag: string }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/finalists')
      .then((res) => res.json())
      .then((d) => setFinalists(d.finalists ?? []))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="text-center text-gray-500 py-16">Chargement...</div>;

  if (finalists.length === 0) {
    return (
      <div className="glass-card p-10 text-center text-gray-400 flex flex-col items-center gap-3">
        <ShieldCheck className="w-8 h-8 text-gray-600" />
        Aucun finaliste national pour le moment — génère et termine un bracket national dans l&apos;onglet Qualifications.
      </div>
    );
  }

  const byCountry = new Map<number, typeof finalists>();
  for (const f of finalists) {
    if (!byCountry.has(f.country_id)) byCountry.set(f.country_id, []);
    byCountry.get(f.country_id)!.push(f);
  }

  return (
    <div className="space-y-6">
      <p className="text-sm text-gray-400">{finalists.length} joueur{finalists.length > 1 ? 's' : ''} qualifié{finalists.length > 1 ? 's' : ''} pour la phase finale au Bénin, sur {byCountry.size} pays.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[...byCountry.entries()].map(([countryId, players]) => (
          <div key={countryId} className="glass-card p-5">
            <h3 className="text-sm font-bold text-white mb-3">{players[0].country_flag} {players[0].country_name}</h3>
            <div className="space-y-2">
              {players.map((p) => (
                <div key={p.id} className="bg-white/5 rounded-lg px-3 py-2">
                  <div className="text-sm text-white font-medium">{p.pseudo}</div>
                  <div className="text-xs text-gray-500">{p.full_name} — {p.email}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SettingsTab() {
  const [maintenance, setMaintenance] = useState<boolean | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch('/api/site-status')
      .then((res) => res.json())
      .then((d) => setMaintenance(Boolean(d.maintenanceMode)));
  }, []);

  const toggle = async () => {
    if (maintenance === null) return;
    setSaving(true);
    const next = !maintenance;
    const res = await fetch('/api/admin/site-settings', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ maintenanceMode: next }),
    });
    if (res.ok) setMaintenance(next);
    setSaving(false);
  };

  if (maintenance === null) return <div className="text-center text-gray-500 py-16">Chargement...</div>;

  return (
    <div className="glass-card p-6 max-w-xl">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
          <Wrench className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-sm font-bold text-white">Mode maintenance</h3>
          <p className="text-xs text-gray-500">Affiche une page « site en construction » à tous les visiteurs non-admin.</p>
        </div>
      </div>

      <div className="flex items-center justify-between bg-white/5 rounded-xl px-4 py-3">
        <span className={`text-sm font-semibold ${maintenance ? 'text-warning-400' : 'text-success-400'}`}>
          {maintenance ? 'Site actuellement en maintenance' : 'Site actuellement en ligne'}
        </span>
        <button
          onClick={toggle}
          disabled={saving}
          className={`relative w-14 h-8 rounded-full transition-colors ${maintenance ? 'bg-warning-500' : 'bg-white/10'} disabled:opacity-50`}
        >
          <span className={`absolute top-1 left-1 w-6 h-6 rounded-full bg-white transition-transform ${maintenance ? 'translate-x-6' : 'translate-x-0'}`} />
        </button>
      </div>

      {maintenance && (
        <p className="text-xs text-gray-500 mt-3">
          Tu restes connecté en tant qu&apos;admin et peux continuer à naviguer normalement sur le site pendant la maintenance.
        </p>
      )}
    </div>
  );
}

const contentTypeLabels: Record<ApiContentItem['type'], string> = {
  article: 'Article',
  video: 'Vidéo',
  social: 'Réseaux sociaux',
};

function ContentTab() {
  const { items, loading, refresh } = useContent();
  const [form, setForm] = useState({ type: 'article' as ApiContentItem['type'], title: '', excerpt: '', imageUrl: '', platform: '', linkUrl: '', publishedAt: '' });
  const [error, setError] = useState('');

  const addItem = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    const res = await fetch('/api/admin/content', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    if (!res.ok) { setError(data.error || 'Erreur'); return; }
    setForm({ type: 'article', title: '', excerpt: '', imageUrl: '', platform: '', linkUrl: '', publishedAt: '' });
    refresh();
  };

  const removeItem = async (id: number) => {
    await fetch(`/api/admin/content/${id}`, { method: 'DELETE' });
    refresh();
  };

  return (
    <div className="space-y-6">
      <form onSubmit={addItem} className="glass-card p-5 grid grid-cols-2 md:grid-cols-4 gap-3">
        <select required value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value as ApiContentItem['type'] })} className="input-field !py-2">
          <option value="article">Article</option>
          <option value="video">Vidéo</option>
          <option value="social">Réseaux sociaux</option>
        </select>
        <input required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Titre" className="input-field !py-2 md:col-span-2" />
        <input required type="date" value={form.publishedAt} onChange={(e) => setForm({ ...form, publishedAt: e.target.value })} className="input-field !py-2" />
        <textarea required value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} placeholder="Extrait" rows={2} className="input-field !py-2 md:col-span-4 resize-none" />
        <input required value={form.imageUrl} onChange={(e) => setForm({ ...form, imageUrl: e.target.value })} placeholder="URL de l'image" className="input-field !py-2 md:col-span-2" />
        <input value={form.platform} onChange={(e) => setForm({ ...form, platform: e.target.value })} placeholder="Plateforme (YouTube, TikTok...)" className="input-field !py-2" />
        <input value={form.linkUrl} onChange={(e) => setForm({ ...form, linkUrl: e.target.value })} placeholder="Lien externe (optionnel)" className="input-field !py-2" />
        <button type="submit" className="btn-primary !py-2.5 justify-center md:col-span-4"><Plus className="w-4 h-4" /> Ajouter</button>
      </form>
      {error && <div className="rounded-xl bg-error-500/10 border border-error-500/30 p-3 text-sm text-error-400">{error}</div>}

      {loading ? (
        <div className="text-center text-gray-500 py-16">Chargement...</div>
      ) : (
        <div className="glass-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-[10px] text-gray-500 uppercase border-b border-white/10">
                  <th className="text-left px-5 py-4">Titre</th>
                  <th className="text-left px-5 py-4">Type</th>
                  <th className="text-left px-5 py-4">Plateforme</th>
                  <th className="text-left px-5 py-4">Date</th>
                  <th className="px-5 py-4"></th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.id} className="border-t border-white/5">
                    <td className="px-5 py-4 text-white font-medium">{item.title}</td>
                    <td className="px-5 py-4 text-gray-400">{contentTypeLabels[item.type]}</td>
                    <td className="px-5 py-4 text-gray-400">{item.platform ?? '—'}</td>
                    <td className="px-5 py-4 text-gray-400">{new Date(item.published_at).toLocaleDateString('fr-FR')}</td>
                    <td className="px-5 py-4">
                      <button onClick={() => removeItem(item.id)} className="text-gray-500 hover:text-error-400 transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

const partnerTierLabels: Record<ApiPartner['tier'], string> = {
  title: 'Titre',
  premium: 'Premium',
  official: 'Officiel',
  media: 'Média',
};

function PartnersTab() {
  const { partners, loading, refresh } = usePartners();
  const [form, setForm] = useState({ name: '', tier: 'official' as ApiPartner['tier'], logoUrl: '' });
  const [error, setError] = useState('');

  const addPartner = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    const res = await fetch('/api/admin/partners', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    if (!res.ok) { setError(data.error || 'Erreur'); return; }
    setForm({ name: '', tier: 'official', logoUrl: '' });
    refresh();
  };

  const removePartner = async (id: number) => {
    await fetch(`/api/admin/partners/${id}`, { method: 'DELETE' });
    refresh();
  };

  return (
    <div className="space-y-6">
      <form onSubmit={addPartner} className="glass-card p-5 grid grid-cols-2 md:grid-cols-4 gap-3 items-end">
        <label className="md:col-span-2"><span className="label-field !mb-1 !text-[10px]">Nom</span><input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Nom du partenaire" className="input-field !py-2" /></label>
        <label><span className="label-field !mb-1 !text-[10px]">Tier</span>
          <select value={form.tier} onChange={(e) => setForm({ ...form, tier: e.target.value as ApiPartner['tier'] })} className="input-field !py-2">
            <option value="title">Titre</option>
            <option value="premium">Premium</option>
            <option value="official">Officiel</option>
            <option value="media">Média</option>
          </select>
        </label>
        <button type="submit" className="btn-primary !py-2.5 justify-center"><Plus className="w-4 h-4" /> Ajouter</button>
        <label className="md:col-span-4"><span className="label-field !mb-1 !text-[10px]">Logo (URL, optionnel)</span><input value={form.logoUrl} onChange={(e) => setForm({ ...form, logoUrl: e.target.value })} placeholder="https://..." className="input-field !py-2" /></label>
      </form>
      {error && <div className="rounded-xl bg-error-500/10 border border-error-500/30 p-3 text-sm text-error-400">{error}</div>}

      {loading ? (
        <div className="text-center text-gray-500 py-16">Chargement...</div>
      ) : (
        <div className="glass-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-[10px] text-gray-500 uppercase border-b border-white/10">
                  <th className="text-left px-5 py-4">Nom</th>
                  <th className="text-left px-5 py-4">Tier</th>
                  <th className="px-5 py-4"></th>
                </tr>
              </thead>
              <tbody>
                {partners.map((p) => (
                  <tr key={p.id} className="border-t border-white/5">
                    <td className="px-5 py-4 text-white font-medium">{p.name}</td>
                    <td className="px-5 py-4 text-gray-400">{partnerTierLabels[p.tier]}</td>
                    <td className="px-5 py-4">
                      <button onClick={() => removePartner(p.id)} className="text-gray-500 hover:text-error-400 transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default function AdminPage() {
  const { user, loading: authLoading, logout } = useAuth();
  const { navigate } = useRouter();
  const [tab, setTab] = useState<'dashboard' | 'registrations' | 'countries' | 'qualifications' | 'finalists' | 'content' | 'partners' | 'settings'>('dashboard');

  useEffect(() => {
    if (authLoading) return;
    if (!user) { navigate('login'); return; }
    if (user.role !== 'admin') { navigate('account'); return; }
  }, [authLoading, user, navigate]);

  if (authLoading || !user || user.role !== 'admin') {
    return <div className="min-h-screen flex items-center justify-center text-gray-400">Chargement...</div>;
  }

  return (
    <div className="animate-fade-in">
      <PageHero badge="Espace admin" title="Back-office" desc="Gère les candidatures et les pays de la compétition." image={heroImage2}>
        <button onClick={() => { logout(); navigate('home'); }} className="btn-ghost !py-2 !px-4 !text-xs"><LogOut className="w-4 h-4" /> Déconnexion</button>
      </PageHero>
      <section className="section-pad">
        <div className="container-x">
          <div className="flex flex-wrap gap-2 mb-8">
            <button onClick={() => setTab('dashboard')} className={`px-5 py-3 rounded-xl font-bold text-sm ${tab === 'dashboard' ? 'bg-lime-500 text-navy-900' : 'bg-white/5 text-gray-400 border border-white/10'}`}>Dashboard</button>
            <button onClick={() => setTab('registrations')} className={`px-5 py-3 rounded-xl font-bold text-sm ${tab === 'registrations' ? 'bg-lime-500 text-navy-900' : 'bg-white/5 text-gray-400 border border-white/10'}`}>Candidatures</button>
            <button onClick={() => setTab('countries')} className={`px-5 py-3 rounded-xl font-bold text-sm ${tab === 'countries' ? 'bg-lime-500 text-navy-900' : 'bg-white/5 text-gray-400 border border-white/10'}`}>Pays</button>
            <button onClick={() => setTab('qualifications')} className={`px-5 py-3 rounded-xl font-bold text-sm ${tab === 'qualifications' ? 'bg-lime-500 text-navy-900' : 'bg-white/5 text-gray-400 border border-white/10'}`}>Qualifications</button>
            <button onClick={() => setTab('finalists')} className={`px-5 py-3 rounded-xl font-bold text-sm ${tab === 'finalists' ? 'bg-lime-500 text-navy-900' : 'bg-white/5 text-gray-400 border border-white/10'}`}>Finalistes</button>
            <button onClick={() => setTab('content')} className={`px-5 py-3 rounded-xl font-bold text-sm ${tab === 'content' ? 'bg-lime-500 text-navy-900' : 'bg-white/5 text-gray-400 border border-white/10'}`}>Contenus</button>
            <button onClick={() => setTab('partners')} className={`px-5 py-3 rounded-xl font-bold text-sm ${tab === 'partners' ? 'bg-lime-500 text-navy-900' : 'bg-white/5 text-gray-400 border border-white/10'}`}>Partenaires</button>
            <button onClick={() => setTab('settings')} className={`px-5 py-3 rounded-xl font-bold text-sm ${tab === 'settings' ? 'bg-lime-500 text-navy-900' : 'bg-white/5 text-gray-400 border border-white/10'}`}>Réglages</button>
          </div>
          {tab === 'dashboard' && <DashboardTab />}
          {tab === 'registrations' && <RegistrationsTab />}
          {tab === 'countries' && <CountriesTab />}
          {tab === 'qualifications' && <QualificationsTab />}
          {tab === 'finalists' && <FinalistsTab />}
          {tab === 'content' && <ContentTab />}
          {tab === 'partners' && <PartnersTab />}
          {tab === 'settings' && <SettingsTab />}
        </div>
      </section>
    </div>
  );
}
