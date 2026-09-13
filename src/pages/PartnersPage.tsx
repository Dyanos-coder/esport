import { Medal, ArrowRight } from 'lucide-react';
import { useI18n } from '@/i18n';
import { PageHero } from '@/components/ui';
import { cultureImage } from '@/data';
import { usePartners } from '@/usePartners';

export default function PartnersPage() {
  const { t } = useI18n();
  const { partners, loading } = usePartners();
  const tiers = ['title', 'premium', 'official', 'media'] as const;

  return (
    <div className="animate-fade-in">
      <PageHero badge={t('partners.hero.badge')} title={t('partners.hero.title')} desc={t('partners.hero.desc')} image={cultureImage} />
      <section className="section-pad">
        <div className="container-x space-y-12">
          {loading ? (
            <div className="text-center text-gray-500 py-16">Chargement...</div>
          ) : (
            tiers.map((tier) => {
              const tierPartners = partners.filter((p) => p.tier === tier);
              if (tierPartners.length === 0) return null;
              return (
                <div key={tier}>
                  <h3 className="heading-display text-2xl text-white mb-5">
                    {tier === 'title' ? t('partners.tier.title') : tier === 'premium' ? t('partners.tier.premium') : tier === 'official' ? t('partners.tier.official') : t('partners.tier.media')}
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    {tierPartners.map((p) => (
                      <div key={p.id} className="h-24 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center p-4 text-center hover:border-lime-500/30 transition-all">
                        {p.logo_url ? (
                          <img src={p.logo_url} alt={p.name} className="max-h-full max-w-full object-contain" />
                        ) : (
                          <span className="font-bold text-white/80 text-sm">{p.name}</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </section>
      <section className="pb-24">
        <div className="container-x">
          <div className="glass-card p-8 md:p-14 text-center bg-gradient-to-br from-lime-500/10 to-purple-500/5">
            <Medal className="w-12 h-12 text-lime-500 mx-auto mb-5" />
            <h2 className="heading-display text-3xl md:text-5xl text-white mb-4">{t('partners.cta.title')}</h2>
            <p className="text-gray-400 max-w-xl mx-auto mb-7">{t('partners.cta.desc')}</p>
            <a href="mailto:contact@karrex.com" className="btn-primary">{t('partners.cta.button')}<ArrowRight className="w-4 h-4" /></a>
          </div>
        </div>
      </section>
    </div>
  );
}
