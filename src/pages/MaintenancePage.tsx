import logoKarreX from '@/assets/maintenance page/Logo KarreX-1 colour.jpg.jpeg';
import logoWoman from '@/assets/maintenance page/Logo-KarreX-Woman.png';

export default function MaintenancePage() {
  return (
    <div className="min-h-screen bg-navy-950 flex flex-col items-center justify-center px-4 py-16 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-10" />
      <div className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-br from-purple-500/20 via-navy-950 to-navy-950" />
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-bl from-pink-500/20 via-navy-950 to-navy-950" />

      <div className="relative text-center mb-12 md:mb-16 max-w-2xl">
        <span className="badge badge-lime mb-6">Site en maintenance</span>
        <h1 className="heading-display text-3xl md:text-5xl text-white leading-tight mb-4">
          Deux univers. <span className="text-pink-500">Une même passion.</span>
        </h1>
        <p className="text-gray-300 text-base md:text-lg leading-relaxed">
          KarreX et KarreX Woman préparent leur arrivée. Le site est en cours de construction —
          on revient très bientôt avec la première expérience panafricaine de football, gaming et télé-réalité.
        </p>
      </div>

      <div className="relative grid grid-cols-1 sm:grid-cols-2 gap-5 w-full max-w-3xl">
        <div className="rounded-2xl overflow-hidden border border-purple-500/30 bg-gradient-to-b from-navy-800 to-navy-950 shadow-[0_0_60px_rgba(138,43,226,0.15)]">
          <div className="p-8 md:p-10 flex flex-col items-center">
            <div className="bg-white rounded-xl p-4 mb-5 w-40 h-40 flex items-center justify-center">
              <img src={logoKarreX} alt="KarreX" className="w-full h-full object-contain" />
            </div>
            <span className="text-xs uppercase tracking-widest text-purple-300 font-bold">Football · Gaming · Téléréalité</span>
          </div>
        </div>

        <div className="rounded-2xl overflow-hidden border border-pink-500/30 bg-gradient-to-b from-navy-800 to-navy-950 shadow-[0_0_60px_rgba(236,30,121,0.15)]">
          <div className="p-8 md:p-10 flex flex-col items-center">
            <div className="bg-white rounded-xl p-4 mb-5 w-40 h-40 flex items-center justify-center">
              <img src={logoWoman} alt="KarreX Woman" className="w-full h-full object-contain" />
            </div>
            <span className="text-xs uppercase tracking-widest text-pink-300 font-bold">Du gaming aux opportunités</span>
          </div>
        </div>
      </div>

      <div className="relative mt-14 md:mt-16 text-center">
        <p className="text-gray-500 text-sm">www.karre-x.com</p>
      </div>
    </div>
  );
}
