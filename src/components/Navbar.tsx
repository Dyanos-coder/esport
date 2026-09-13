import { useState, useEffect } from 'react';
import { Menu, X, Globe, LogIn, User as UserIcon, ShieldCheck } from 'lucide-react';
import { useRouter, type Route } from '@/router';
import { useI18n, type Lang } from '@/i18n';
import { useAuth } from '@/auth';

const navItems: { route: Route; key: string }[] = [
  { route: 'home', key: 'nav.home' },
  { route: 'concept', key: 'nav.concept' },
  { route: 'countries', key: 'nav.countries' },
  { route: 'players', key: 'nav.players' },
  { route: 'results', key: 'nav.results' },
  { route: 'finale', key: 'nav.finale' },
  { route: 'rules', key: 'nav.rules' },
  { route: 'content', key: 'nav.content' },
  { route: 'partners', key: 'nav.partners' },
];

export default function Navbar() {
  const { route, navigate } = useRouter();
  const { t, lang, setLang } = useI18n();
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNav = (r: Route) => {
    navigate(r);
    setOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-navy-900/90 backdrop-blur-md border-b border-white/10' : 'bg-transparent'
      }`}
    >
      <nav className="container-x flex items-center justify-between h-16 md:h-20">
        {/* Logo */}
        <button onClick={() => handleNav('home')} className="flex items-center gap-2 group">
          <span className="font-display text-xl tracking-wide text-white">
            KARRE<span className="text-lime-500">•X</span>
          </span>
        </button>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => (
            <button
              key={item.route}
              onClick={() => handleNav(item.route)}
              className={`px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                route === item.route
                  ? 'text-lime-500'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {t(item.key)}
            </button>
          ))}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3">
          {/* Language selector */}
          <div className="hidden sm:flex items-center gap-1 bg-white/5 rounded-lg p-1 border border-white/10">
            <Globe className="w-4 h-4 text-gray-400 ml-1.5" />
            {(['fr', 'en'] as Lang[]).map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={`px-2 py-1 text-xs font-bold rounded-md transition-all ${
                  lang === l ? 'bg-lime-500 text-navy-900' : 'text-gray-400 hover:text-white'
                }`}
              >
                {l.toUpperCase()}
              </button>
            ))}
          </div>

          {/* Auth */}
          {user ? (
            <button onClick={() => handleNav(user.role === 'admin' ? 'admin' : 'account')} className="hidden md:inline-flex btn-primary !py-2 !px-4 !text-xs">
              {user.role === 'admin' ? <ShieldCheck className="w-4 h-4" /> : <UserIcon className="w-4 h-4" />}
              {user.role === 'admin' ? 'Admin' : 'Mon compte'}
            </button>
          ) : (
            <>
              <button onClick={() => handleNav('login')} className="hidden md:inline-flex items-center gap-1.5 text-sm font-medium text-gray-400 hover:text-white transition-colors">
                <LogIn className="w-4 h-4" /> Connexion
              </button>
              <button onClick={() => handleNav('register')} className="hidden md:inline-flex btn-primary !py-2 !px-4 !text-xs">
                {t('nav.cta')}
              </button>
            </>
          )}

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden w-10 h-10 flex items-center justify-center rounded-lg bg-white/5 border border-white/10 text-white"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden bg-navy-900/95 backdrop-blur-md border-b border-white/10 animate-fade-in">
          <div className="container-x py-4 flex flex-col gap-1">
            {navItems.map((item) => (
              <button
                key={item.route}
                onClick={() => handleNav(item.route)}
                className={`px-4 py-3 text-sm font-medium rounded-lg text-left transition-all ${
                  route === item.route
                    ? 'bg-lime-500/10 text-lime-500'
                    : 'text-gray-400 hover:bg-white/5 hover:text-white'
                }`}
              >
                {t(item.key)}
              </button>
            ))}
            <div className="flex items-center gap-2 px-4 py-3">
              <Globe className="w-4 h-4 text-gray-400" />
              {(['fr', 'en'] as Lang[]).map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all ${
                    lang === l ? 'bg-lime-500 text-navy-900' : 'bg-white/5 text-gray-400'
                  }`}
                >
                  {l.toUpperCase()}
                </button>
              ))}
            </div>
            {user ? (
              <button onClick={() => handleNav(user.role === 'admin' ? 'admin' : 'account')} className="btn-primary mt-2">
                {user.role === 'admin' ? <ShieldCheck className="w-4 h-4" /> : <UserIcon className="w-4 h-4" />}
                {user.role === 'admin' ? 'Admin' : 'Mon compte'}
              </button>
            ) : (
              <>
                <button onClick={() => handleNav('login')} className="btn-ghost mt-2">
                  <LogIn className="w-4 h-4" /> Connexion
                </button>
                <button onClick={() => handleNav('register')} className="btn-primary mt-2">
                  {t('nav.cta')}
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
