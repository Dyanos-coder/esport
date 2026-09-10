import { Trophy, Users, Globe, MapPin, Calendar, ChevronDown, Gamepad2, Film, Flag, Plane, ArrowRight, Sparkles } from 'lucide-react';
import { useRouter } from '@/router';
import { useI18n } from '@/i18n';
import { SectionTitle, StatCard, PillarCard } from '@/components/ui';
import { heroImage, gamingSetupImage, beninImage, footballImage } from '@/data';
import logoColor from '@/assets/Logo KarreX-1 green white1.png';

export default function HomePage() {
  const { navigate } = useRouter();
  const { t } = useI18n();

  return (
    <div className="animate-fade-in">
      {/* HERO */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <img src={heroImage} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-navy-900/70 via-navy-900/80 to-navy-900" />
          <div className="absolute inset-0 bg-grid opacity-20" />
          <div className="absolute inset-0 bg-radial-glow" />
        </div>

        {/* Brand logo, anchored to the right edge independent of the text column */}
        <div className="hidden lg:flex absolute inset-y-0 right-32 xl:right-28 2xl:right-20 items-center translate-y-6 pointer-events-none">
          <img
            src={logoColor}
            alt="KarreX"
            className="w-[34rem] xl:w-[42rem] 2xl:w-[48rem] animate-float-glow"
          />
        </div>

        {/* Content */}
        <div className="container-x relative pt-20">
          <div className="max-w-4xl">
            <div className="flex items-center gap-3 mb-6 animate-fade-in">
              <span className="badge badge-lime">
                <Sparkles className="w-3.5 h-3.5" />
                {t('hero.badge')}
              </span>
              <span className="flex items-center gap-1.5 text-sm text-gray-300">
                <MapPin className="w-4 h-4 text-purple-400" />
                {t('hero.date')}
              </span>
            </div>

            <h1 className="heading-display text-6xl md:text-8xl lg:text-9xl text-white mb-4 animate-slide-up leading-[0.9]">
              {t('hero.title1')}
              <span className="block text-gradient-lime text-shadow-glow">{t('hero.title2')}</span>
            </h1>

            <p className="text-lg md:text-xl text-gray-300 max-w-2xl leading-relaxed mb-8 animate-slide-up" style={{ animationDelay: '0.1s' }}>
              {t('hero.subtitle')}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <button onClick={() => navigate('register')} className="btn-primary text-base !px-8 !py-4">
                {t('hero.cta1')}
                <ArrowRight className="w-5 h-5" />
              </button>
              <button onClick={() => navigate('concept')} className="btn-secondary text-base !px-8 !py-4">
                {t('hero.cta2')}
              </button>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-500 animate-pulse">
          <span className="text-xs uppercase tracking-widest">{t('hero.scroll')}</span>
          <ChevronDown className="w-5 h-5" />
        </div>
      </section>

      {/* STATS */}
      <section className="section-pad bg-navy-850 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-10" />
        <div className="container-x relative">
          <SectionTitle
            badge={t('stats.title')}
            title={t('stats.subtitle')}
          />
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            <StatCard value="16" label={t('stats.countries')} accent="lime" />
            <StatCard value="32" label={t('stats.players')} accent="purple" />
            <StatCard value="14" label={t('stats.days')} accent="lime" />
            <StatCard value="120+" label={t('stats.matches')} accent="purple" />
          </div>
        </div>
      </section>

      {/* PILIERS */}
      <section className="section-pad relative">
        <div className="container-x">
          <SectionTitle
            badge={t('piliers.title')}
            title={t('piliers.subtitle')}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <PillarCard
              index={0}
              icon={<Trophy className="w-7 h-7" />}
              title={t('piliers.competition.title')}
              desc={t('piliers.competition.desc')}
            />
            <PillarCard
              index={1}
              icon={<Film className="w-7 h-7" />}
              title={t('piliers.content.title')}
              desc={t('piliers.content.desc')}
            />
            <PillarCard
              index={2}
              icon={<Flag className="w-7 h-7" />}
              title={t('piliers.nations.title')}
              desc={t('piliers.nations.desc')}
            />
            <PillarCard
              index={3}
              icon={<Plane className="w-7 h-7" />}
              title={t('piliers.destination.title')}
              desc={t('piliers.destination.desc')}
            />
          </div>
        </div>
      </section>

      {/* FEATURE SPLIT — Competition + Content */}
      <section className="section-pad bg-navy-850 relative overflow-hidden">
        <div className="container-x">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left: Competition */}
            <div className="relative group">
              <div className="relative overflow-hidden rounded-2xl">
                <img src={footballImage} alt="" className="w-full h-[400px] object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-navy-900/40 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <span className="badge badge-lime mb-4">
                    <Trophy className="w-3.5 h-3.5" />
                    {t('piliers.competition.title')}
                  </span>
                  <h3 className="heading-display text-3xl md:text-4xl text-white mb-3">
                    {t('piliers.competition.title')}
                  </h3>
                  <p className="text-sm text-gray-300 leading-relaxed mb-4">
                    {t('piliers.competition.desc')}
                  </p>
                  <button onClick={() => navigate('rules')} className="inline-flex items-center gap-2 text-sm font-bold text-lime-500 hover:text-lime-400 transition-colors">
                    {t('common.learnMore')} <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Right: Content */}
            <div className="relative group">
              <div className="relative overflow-hidden rounded-2xl">
                <img src={gamingSetupImage} alt="" className="w-full h-[400px] object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-navy-900/40 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <span className="badge badge-purple mb-4">
                    <Film className="w-3.5 h-3.5" />
                    {t('piliers.content.title')}
                  </span>
                  <h3 className="heading-display text-3xl md:text-4xl text-white mb-3">
                    {t('piliers.content.title')}
                  </h3>
                  <p className="text-sm text-gray-300 leading-relaxed mb-4">
                    {t('piliers.content.desc')}
                  </p>
                  <button onClick={() => navigate('content')} className="inline-flex items-center gap-2 text-sm font-bold text-purple-400 hover:text-purple-500 transition-colors">
                    {t('common.learnMore')} <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DESTINATION PREVIEW */}
      <section className="section-pad relative overflow-hidden">
        <div className="container-x">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative group order-2 lg:order-1">
              <div className="relative overflow-hidden rounded-2xl">
                <img src={beninImage} alt="Ganvié, Bénin" className="w-full h-[450px] object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-900/60 to-transparent" />
              </div>
              <div className="absolute -bottom-4 -right-4 glass-card p-4 flex items-center gap-3 max-w-[200px]">
                <MapPin className="w-8 h-8 text-lime-500 flex-shrink-0" />
                <div>
                  <div className="text-sm font-bold text-white">Ganvié</div>
                  <div className="text-xs text-gray-400">Cité lacustre du Bénin</div>
                </div>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <span className="badge badge-purple mb-4">
                <Plane className="w-3.5 h-3.5" />
                {t('piliers.destination.title')}
              </span>
              <h2 className="heading-display text-4xl md:text-5xl text-white mb-6">
                {t('finale.hero.title')}
              </h2>
              <p className="text-base text-gray-400 leading-relaxed mb-8">
                {t('finale.hero.desc')}
              </p>
              <div className="grid grid-cols-2 gap-3 mb-8">
                {[
                  { name: 'Cotonou', icon: Trophy },
                  { name: 'Ouidah', icon: MapPin },
                  { name: 'Ganvié', icon: Globe },
                  { name: 'Porto-Novo', icon: Calendar },
                ].map((city) => (
                  <div key={city.name} className="glass-card-light p-4 flex items-center gap-3 hover:border-purple-500/30 transition-all">
                    <city.icon className="w-5 h-5 text-purple-400 flex-shrink-0" />
                    <span className="text-sm font-semibold text-white">{city.name}</span>
                  </div>
                ))}
              </div>
              <button onClick={() => navigate('finale')} className="btn-secondary">
                {t('common.learnMore')}
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-pad relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-navy-850 via-navy-900 to-navy-850" />
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="absolute inset-0 bg-radial-glow" />
        <div className="container-x relative">
          <div className="glass-card p-8 md:p-16 text-center max-w-4xl mx-auto relative overflow-hidden">
            <div className="absolute -top-20 -left-20 w-60 h-60 bg-lime-500/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-purple-500/10 rounded-full blur-3xl" />
            <div className="relative">
              <Gamepad2 className="w-12 h-12 text-lime-500 mx-auto mb-6" />
              <h2 className="heading-display text-3xl md:text-5xl text-white mb-4">
                {t('cta.title')}
              </h2>
              <p className="text-base md:text-lg text-gray-400 max-w-2xl mx-auto mb-8">
                {t('cta.subtitle')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button onClick={() => navigate('register')} className="btn-primary text-base !px-8 !py-4">
                  {t('cta.button')}
                  <ArrowRight className="w-5 h-5" />
                </button>
                <button onClick={() => navigate('countries')} className="btn-secondary text-base !px-8 !py-4">
                  {t('cta.secondary')}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
