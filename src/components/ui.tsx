import type { ReactNode } from 'react';

export function SectionTitle({
  badge,
  title,
  subtitle,
  align = 'center',
  light = false,
}: {
  badge?: string;
  title: ReactNode;
  subtitle?: string;
  align?: 'center' | 'left';
  light?: boolean;
}) {
  return (
    <div className={`flex flex-col gap-3 ${align === 'center' ? 'items-center text-center' : 'items-start text-left'} mb-12`}>
      {badge && (
        <span className={`badge ${light ? 'badge-lime' : 'badge-cyan'}`}>
          {badge}
        </span>
      )}
      <h2 className={`heading-display text-3xl md:text-5xl lg:text-6xl ${light ? 'text-navy-900' : 'text-white'}`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`text-base md:text-lg max-w-2xl ${light ? 'text-gray-600' : 'text-gray-400'} ${align === 'center' ? 'mx-auto' : ''}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}

export function PageHero({
  badge,
  title,
  desc,
  image,
  children,
}: {
  badge: string;
  title: ReactNode;
  desc: string;
  image: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative pt-28 md:pt-36 pb-16 md:pb-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img src={image} alt="" className="w-full h-full object-cover opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-b from-navy-900/80 via-navy-900/90 to-navy-900" />
        <div className="absolute inset-0 bg-grid opacity-30" />
      </div>

      <div className="container-x relative">
        <div className="max-w-3xl">
          <span className="badge badge-lime mb-6 animate-fade-in">
            {badge}
          </span>
          <h1 className="heading-display text-4xl md:text-6xl lg:text-7xl text-white mb-6 animate-slide-up">
            {title}
          </h1>
          <p className="text-base md:text-lg text-gray-300 max-w-2xl leading-relaxed mb-8 animate-slide-up" style={{ animationDelay: '0.1s' }}>
            {desc}
          </p>
          {children}
        </div>
      </div>
    </section>
  );
}

export function StatCard({
  value,
  label,
  accent = 'lime',
}: {
  value: string;
  label: string;
  accent?: 'lime' | 'cyan';
}) {
  return (
    <div className="glass-card p-6 md:p-8 text-center group hover:border-lime-500/30 transition-all duration-300 hover:-translate-y-1">
      <div className={`heading-display text-5xl md:text-6xl mb-2 ${accent === 'lime' ? 'text-lime-500' : 'text-cyan-400'} text-shadow-glow`}>
        {value}
      </div>
      <div className="text-sm text-gray-400 uppercase tracking-wide font-medium">
        {label}
      </div>
    </div>
  );
}

export function PillarCard({
  icon,
  title,
  desc,
  index,
}: {
  icon: ReactNode;
  title: string;
  desc: string;
  index: number;
}) {
  return (
    <div
      className="glass-card p-6 md:p-8 group hover:border-lime-500/30 transition-all duration-300 hover:-translate-y-1 relative overflow-hidden"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="absolute -top-4 -right-4 w-24 h-24 bg-lime-500/5 rounded-full blur-2xl group-hover:bg-lime-500/10 transition-all" />
      <div className="w-14 h-14 rounded-xl bg-lime-500/10 border border-lime-500/20 flex items-center justify-center mb-5 text-lime-500 group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h3 className="font-display text-2xl text-white mb-3 tracking-wide">
        {title}
      </h3>
      <p className="text-sm text-gray-400 leading-relaxed">
        {desc}
      </p>
    </div>
  );
}
