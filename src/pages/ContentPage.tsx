import { useState } from 'react';
import { Play, ArrowRight } from 'lucide-react';
import { useI18n } from '@/i18n';
import { PageHero } from '@/components/ui';
import { cultureImage } from '@/data';
import { useContent } from '@/useContent';

export default function ContentPage() {
  const { t } = useI18n();
  const { items, loading } = useContent();
  const [filter, setFilter] = useState('all');
  const shown = filter === 'all' ? items : items.filter((item) => item.type === filter);

  return (
    <div className="animate-fade-in">
      <PageHero badge={t('content.hero.badge')} title={t('content.hero.title')} desc={t('content.hero.desc')} image={cultureImage} />
      <section className="py-8">
        <div className="container-x">
          <div className="flex gap-2 mb-8">
            {['all', 'article', 'video', 'social'].map((f) => (
              <button key={f} onClick={() => setFilter(f)} className={`px-4 py-2 rounded-lg text-sm font-semibold capitalize ${filter === f ? 'bg-lime-500 text-navy-900' : 'bg-white/5 text-gray-400 border border-white/10'}`}>
                {f === 'all' ? t('content.filter.all') : f === 'article' ? t('content.filter.articles') : f === 'video' ? t('content.filter.videos') : t('content.filter.social')}
              </button>
            ))}
          </div>
          {loading ? (
            <div className="text-center text-gray-500 py-16">Chargement...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {shown.map((item) => (
                <article key={item.id} className="glass-card overflow-hidden group hover:border-lime-500/30 transition-all hover:-translate-y-1">
                  <div className="relative h-52 overflow-hidden">
                    <img src={item.image_url} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-900/80 to-transparent" />
                    <span className="absolute top-4 left-4 badge badge-lime">{item.platform ?? item.type}</span>
                    {item.type === 'video' && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-12 h-12 rounded-full bg-lime-500 flex items-center justify-center text-navy-900">
                          <Play className="w-5 h-5 fill-current ml-0.5" />
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <div className="text-xs text-gray-500 mb-2">{new Date(item.published_at).toLocaleDateString('fr-FR')}</div>
                    <h3 className="font-bold text-white text-lg leading-snug mb-3">{item.title}</h3>
                    <p className="text-sm text-gray-400 leading-relaxed mb-5">{item.excerpt}</p>
                    {item.link_url ? (
                      <a href={item.link_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-bold text-lime-500">
                        {item.type === 'video' ? t('content.watch') : t('content.read')}<ArrowRight className="w-4 h-4" />
                      </a>
                    ) : (
                      <span className="inline-flex items-center gap-2 text-sm font-bold text-lime-500">
                        {item.type === 'video' ? t('content.watch') : t('content.read')}<ArrowRight className="w-4 h-4" />
                      </span>
                    )}
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
