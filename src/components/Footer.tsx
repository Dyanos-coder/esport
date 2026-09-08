import { Gamepad2, Mail, Phone, MapPin, Youtube, Instagram, Facebook, Twitter } from 'lucide-react';
import { useRouter, type Route } from '@/router';
import { useI18n } from '@/i18n';

const footerLinks: { route: Route; key: string }[] = [
  { route: 'home', key: 'nav.home' },
  { route: 'concept', key: 'nav.concept' },
  { route: 'countries', key: 'nav.countries' },
  { route: 'register', key: 'nav.register' },
  { route: 'rules', key: 'nav.rules' },
  { route: 'players', key: 'nav.players' },
  { route: 'results', key: 'nav.results' },
  { route: 'finale', key: 'nav.finale' },
  { route: 'content', key: 'nav.content' },
  { route: 'partners', key: 'nav.partners' },
];

const socialIcons = [
  { icon: Youtube, label: 'YouTube', color: 'hover:text-red-500' },
  { icon: Instagram, label: 'Instagram', color: 'hover:text-pink-500' },
  { icon: Facebook, label: 'Facebook', color: 'hover:text-blue-500' },
  { icon: Twitter, label: 'Twitter', color: 'hover:text-cyan-400' },
];

export default function Footer() {
  const { navigate } = useRouter();
  const { t } = useI18n();

  return (
    <footer className="bg-navy-950 border-t border-white/10 mt-20">
      <div className="container-x py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-lg bg-lime-500 flex items-center justify-center">
                <Gamepad2 className="w-5 h-5 text-navy-900" strokeWidth={2.5} />
              </div>
              <span className="font-display text-xl tracking-wide text-white">
                AFN<span className="text-lime-500"> CUP</span>
              </span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed max-w-xs">
              {t('footer.tagline')}
            </p>
            <div className="flex items-center gap-3 mt-5">
              {socialIcons.map((s) => (
                <button
                  key={s.label}
                  className={`w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 ${s.color} transition-all duration-200 hover:bg-white/10`}
                >
                  <s.icon className="w-4 h-4" />
                </button>
              ))}
            </div>
          </div>

          {/* Nav */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400 mb-4">
              {t('footer.nav.title')}
            </h4>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2">
              {footerLinks.map((link) => (
                <button
                  key={link.route}
                  onClick={() => navigate(link.route)}
                  className="text-sm text-gray-400 hover:text-lime-500 transition-colors text-left"
                >
                  {t(link.key)}
                </button>
              ))}
            </div>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400 mb-4">
              {t('footer.legal.title')}
            </h4>
            <div className="flex flex-col gap-2">
              <button className="text-sm text-gray-400 hover:text-lime-500 transition-colors text-left">
                {t('footer.legal.mentions')}
              </button>
              <button className="text-sm text-gray-400 hover:text-lime-500 transition-colors text-left">
                {t('footer.legal.privacy')}
              </button>
              <button className="text-sm text-gray-400 hover:text-lime-500 transition-colors text-left">
                {t('footer.legal.cgu')}
              </button>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400 mb-4">
              {t('footer.contact.title')}
            </h4>
            <div className="flex flex-col gap-3">
              <a href="mailto:contact@afncup.africa" className="flex items-center gap-2 text-sm text-gray-400 hover:text-lime-500 transition-colors">
                <Mail className="w-4 h-4" /> contact@afncup.africa
              </a>
              <a href="tel:+22901000000" className="flex items-center gap-2 text-sm text-gray-400 hover:text-lime-500 transition-colors">
                <Phone className="w-4 h-4" /> +229 01 00 00 00
              </a>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <MapPin className="w-4 h-4" /> Cotonou, Bénin
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-500">
            © 2026 AFN eFootball Cup. {t('footer.rights')}
          </p>
          <p className="text-xs text-gray-500">
            {t('footer.made')} 🌍
          </p>
        </div>
      </div>
    </footer>
  );
}
