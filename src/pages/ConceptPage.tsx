import { Eye, Target, Trophy, Film, Flag, Plane, Zap, Heart, Users, Star } from 'lucide-react';
import { useI18n } from '@/i18n';
import { PageHero, SectionTitle } from '@/components/ui';
import { heroImage2, gamingSetupImage, beninImage, cultureImage } from '@/data';

export default function ConceptPage() {
  const { t } = useI18n();

  const pillars = [
    { icon: Trophy, key: 'competition', color: 'lime' },
    { icon: Film, key: 'content', color: 'purple' },
    { icon: Flag, key: 'nations', color: 'lime' },
    { icon: Plane, key: 'destination', color: 'purple' },
  ];

  return (
    <div className="animate-fade-in">
      <PageHero
        badge={t('concept.hero.badge')}
        title={t('concept.hero.title')}
        desc={t('concept.hero.desc')}
        image={heroImage2}
      />

      {/* Vision + Positioning */}
      <section className="section-pad">
        <div className="container-x">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Vision */}
            <div className="glass-card p-8 md:p-10 relative overflow-hidden group">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-lime-500/5 rounded-full blur-3xl group-hover:bg-lime-500/10 transition-all" />
              <div className="relative">
                <div className="w-14 h-14 rounded-xl bg-lime-500/10 border border-lime-500/20 flex items-center justify-center mb-6">
                  <Eye className="w-7 h-7 text-lime-500" />
                </div>
                <h2 className="heading-display text-3xl text-white mb-4">
                  {t('concept.vision.title')}
                </h2>
                <p className="text-base text-gray-400 leading-relaxed">
                  {t('concept.vision.desc')}
                </p>
              </div>
            </div>

            {/* Positioning */}
            <div className="glass-card p-8 md:p-10 relative overflow-hidden group">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-purple-500/5 rounded-full blur-3xl group-hover:bg-purple-500/10 transition-all" />
              <div className="relative">
                <div className="w-14 h-14 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mb-6">
                  <Target className="w-7 h-7 text-purple-400" />
                </div>
                <h2 className="heading-display text-3xl text-white mb-4">
                  {t('concept.positioning.title')}
                </h2>
                <p className="text-base text-gray-400 leading-relaxed">
                  {t('concept.positioning.desc')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4 Pillars detailed */}
      <section className="section-pad bg-navy-850 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-10" />
        <div className="container-x relative">
          <SectionTitle
            badge={t('piliers.title')}
            title={t('piliers.subtitle')}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {pillars.map((p, i) => (
              <div
                key={p.key}
                className="glass-card p-8 group hover:border-lime-500/30 transition-all duration-300 hover:-translate-y-1 relative overflow-hidden"
              >
                <div className="flex items-start gap-5">
                  <div className={`w-16 h-16 rounded-xl flex items-center justify-center flex-shrink-0 ${p.color === 'lime' ? 'bg-lime-500/10 border border-lime-500/20 text-lime-500' : 'bg-purple-500/10 border border-purple-500/20 text-purple-400'}`}>
                    <p.icon className="w-8 h-8" />
                  </div>
                  <div className="flex-1">
                    <div className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">
                      0{i + 1}
                    </div>
                    <h3 className="heading-display text-2xl text-white mb-3">
                      {t(`piliers.${p.key}.title`)}
                    </h3>
                    <p className="text-sm text-gray-400 leading-relaxed">
                      {t(`piliers.${p.key}.desc`)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values strip */}
      <section className="section-pad">
        <div className="container-x">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: Zap, label: 'Premium', value: 'Qualité e-sport de niveau mondial' },
              { icon: Heart, label: 'Accessible', value: 'Ouvert à tous les niveaux' },
              { icon: Users, label: 'Panafricain', value: '16 pays, 1 continent' },
              { icon: Star, label: 'Inédit', value: 'Premier du genre en Afrique' },
            ].map((v) => (
              <div key={v.label} className="glass-card-light p-6 text-center hover:border-lime-500/30 transition-all duration-300">
                <v.icon className="w-8 h-8 text-lime-500 mx-auto mb-3" />
                <div className="font-display text-xl text-white mb-1 tracking-wide">{v.label}</div>
                <div className="text-xs text-gray-400">{v.value}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Visual showcase */}
      <section className="pb-24">
        <div className="container-x">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative overflow-hidden rounded-2xl group h-[300px]">
              <img src={gamingSetupImage} alt="" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-900 to-transparent" />
              <div className="absolute bottom-0 p-6">
                <span className="badge badge-lime">Compétition</span>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-2xl group h-[300px]">
              <img src={cultureImage} alt="" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-900 to-transparent" />
              <div className="absolute bottom-0 p-6">
                <span className="badge badge-purple">Culture</span>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-2xl group h-[300px]">
              <img src={beninImage} alt="" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-900 to-transparent" />
              <div className="absolute bottom-0 p-6">
                <span className="badge badge-lime">Destination</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
