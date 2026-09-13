import { useState } from 'react';
import { CheckCircle2, Clock, XCircle, Users, MapPin } from 'lucide-react';
import { useI18n } from '@/i18n';
import { PageHero } from '@/components/ui';
import { heroImage2 } from '@/data';
import { useCountries, type ApiCountry } from '@/useCountries';

const statusConfig = {
  qualified: { badge: 'badge-success', icon: CheckCircle2, key: 'countries.status.qualified' },
  qualifying: { badge: 'badge-warning', icon: Clock, key: 'countries.status.qualifying' },
  open: { badge: 'badge-lime', icon: Users, key: 'countries.status.open' },
  closed: { badge: 'badge-error', icon: XCircle, key: 'countries.status.closed' },
};

export default function CountriesPage() {
  const { t } = useI18n();
  const { countries, loading } = useCountries();
  const [filter, setFilter] = useState<'all' | 'open' | 'qualifying' | 'qualified' | 'closed'>('all');

  const filtered = filter === 'all' ? countries : countries.filter((c) => c.status === filter);

  const counts = {
    qualified: countries.filter((c) => c.status === 'qualified').length,
    qualifying: countries.filter((c) => c.status === 'qualifying').length,
    open: countries.filter((c) => c.status === 'open').length,
  };

  return (
    <div className="animate-fade-in">
      <PageHero
        badge={t('countries.hero.badge')}
        title={t('countries.hero.title')}
        desc={t('countries.hero.desc')}
        image={heroImage2}
      />

      {/* Stats strip */}
      <section className="py-8 border-y border-white/10 bg-navy-850">
        <div className="container-x">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="heading-display text-3xl md:text-4xl text-lime-500">{counts.qualified}</div>
              <div className="text-xs text-gray-400 uppercase tracking-wide mt-1">{t('countries.status.qualified')}</div>
            </div>
            <div>
              <div className="heading-display text-3xl md:text-4xl text-warning-400">{counts.qualifying}</div>
              <div className="text-xs text-gray-400 uppercase tracking-wide mt-1">{t('countries.status.qualifying')}</div>
            </div>
            <div>
              <div className="heading-display text-3xl md:text-4xl text-purple-400">{counts.open}</div>
              <div className="text-xs text-gray-400 uppercase tracking-wide mt-1">{t('countries.status.open')}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Filter */}
      <section className="py-8">
        <div className="container-x">
          <div className="flex flex-wrap gap-2 mb-8">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${filter === 'all' ? 'bg-lime-500 text-navy-900' : 'bg-white/5 text-gray-400 hover:text-white border border-white/10'}`}
            >
              {t('players.filter.all')}
            </button>
            {(Object.keys(statusConfig) as ApiCountry['status'][]).map((s) => (
              <button
                key={s}
                onClick={() => setFilter(s)}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${filter === s ? 'bg-lime-500 text-navy-900' : 'bg-white/5 text-gray-400 hover:text-white border border-white/10'}`}
              >
                {t(statusConfig[s].key)}
              </button>
            ))}
          </div>

          {/* Grid */}
          {loading ? (
            <div className="text-center text-gray-500 py-16">Chargement...</div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {filtered.map((country) => {
                const cfg = statusConfig[country.status];
                return (
                  <div
                    key={country.id}
                    className="glass-card p-6 group hover:border-lime-500/30 transition-all duration-300 hover:-translate-y-1 relative overflow-hidden"
                  >
                    <div className="absolute -top-8 -right-8 w-24 h-24 bg-lime-500/5 rounded-full blur-2xl group-hover:bg-lime-500/10 transition-all" />
                    <div className="relative">
                      <div className="text-5xl mb-4">{country.flag}</div>
                      <h3 className="font-bold text-white text-lg mb-1">{country.name}</h3>
                      <div className="text-xs text-gray-500 mb-3">{country.code}</div>
                      <div className="flex items-center justify-between">
                        <span className={`badge ${cfg.badge} !text-[10px]`}>
                          <cfg.icon className="w-3 h-3" />
                          {t(cfg.key)}
                        </span>
                        <span className="text-xs text-gray-400">
                          {country.qualified_count}/2 {t('countries.players')}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Map placeholder */}
      <section className="pb-24">
        <div className="container-x">
          <div className="glass-card p-8 md:p-12 text-center">
            <MapPin className="w-12 h-12 text-purple-400 mx-auto mb-4" />
            <h3 className="heading-display text-2xl text-white mb-2">16 Nations Africaines</h3>
            <p className="text-sm text-gray-400 max-w-xl mx-auto">
              Du Maroc au nord à la RD Congo au sud, 16 pays convergent vers le Bénin pour la plus grande compétition e-sport du continent.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
