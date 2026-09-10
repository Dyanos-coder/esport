import {
  Trophy, Target, Users, Plane, Film, Megaphone, Handshake, HeartHandshake,
  Rocket, Flag, Compass, Radio, CheckCircle2, ArrowRight, Sparkles, Quote,
} from 'lucide-react';
import { useRouter } from '@/router';
import { SectionTitle, PageHero, StatCard } from '@/components/ui';
import {
  heroImage, footballImage, beninImage, beninImage2, gamingSetupImage, cultureImage, cultureImage2,
} from '@/data';

const specificObjectives = [
  'Développer et structurer la pratique de l’e-sport en Afrique.',
  'Offrir aux joueurs une compétition crédible permettant de révéler de nouveaux talents.',
  'Construire une marque événementielle panafricaine durable.',
  'Faire du Bénin la première destination hôte de cette expérience.',
  'Valoriser la culture, le tourisme et l’image du pays hôte.',
  'Transformer la compétition en véritable produit média et de divertissement.',
  'Créer une plateforme d’expression et d’activation pour les marques.',
  'Faire découvrir les différents métiers liés au gaming et au numérique.',
];

const experienceItems = [
  'Accueil des délégations', 'Découverte du Bénin', 'Visites culturelles', 'Challenges',
  'Activités de groupe', 'Activations partenaires', 'Entraînements', 'Compétition', 'Cérémonie de clôture',
];

const cities = ['Cotonou', 'Ouidah', 'Ganvié', 'Porto-Novo'];

const contentFormats = ['Portraits', 'Coulisses', 'Défis', 'Confessionnal', 'Voyage', 'Matchs', 'Highlights', 'Interviews'];

const beninHighlights = ['Patrimoine', 'Tourisme', 'Gastronomie', 'Culture', 'Paysages', 'Villes', 'Expériences locales'];

const jobs = [
  'Joueur', 'Coach', 'Caster', 'Streamer', 'Créateur de contenus', 'Monteur vidéo', 'Graphiste',
  'Community Manager', 'Régisseur', 'Event Manager', 'Arbitre', 'Développeur', 'Marketing & partenariats',
];

const commPhases = [
  {
    icon: Rocket,
    title: 'Phase 1 — Le lancement',
    objective: 'Faire connaître le projet et créer la curiosité.',
    items: ['Révélation de la marque', 'Teaser', 'Vidéo manifeste', 'Présentation du concept', 'Révélation progressive des pays', 'Présentation du règlement', 'Appel aux joueurs', 'Mobilisation des influenceurs'],
  },
  {
    icon: Flag,
    title: 'Phase 2 — Les qualifications',
    objective: 'Créer la rivalité entre les pays.',
    items: ['Annonces des qualifications', 'Portraits des joueurs', 'Résultats', 'Classements', 'Highlights', 'Réactions', 'Coulisses', 'Interviews', 'Révélation des qualifiés'],
  },
  {
    icon: Compass,
    title: 'Phase 3 — La route vers le Bénin',
    objective: 'Créer l’attente autour de la phase finale.',
    items: ['Révélation des finalistes', 'Présentation des nations', 'Tirage', 'Compte à rebours', 'Présentation des délégations', 'Préparation au voyage', 'Contenus des joueurs avant leur départ'],
  },
  {
    icon: Radio,
    title: 'Phase 4 — L’expérience au Bénin',
    objective: 'Une communication quotidienne, sur tous les canaux.',
    items: ['TikTok & Instagram — contenus courts, réactions, challenges', 'YouTube — épisodes, documentaires, matchs, résumés', 'Facebook — mobilisation communautaire, directs', 'Site officiel — inscriptions, résultats, classements, profils', 'Médias partenaires — interviews, reportages, amplification'],
  },
];

const sponsoringTypes = [
  'Un soutien financier', 'Des dotations', 'Des prestations ou équipements', 'Des services nécessaires à l’organisation',
  'Des activations de marque', 'La production de contenus', 'L’accompagnement du programme social',
];

const girlsSections = [
  {
    title: '6.1 — Formation et découverte',
    desc: 'Ateliers gratuits : gaming compétitif, streaming, casting, montage vidéo, graphisme et motion design, community management, production événementielle, création de contenus.',
  },
  {
    title: '6.2 — Accès aux opportunités',
    desc: 'Places gratuites, prêt de matériel, mentorat, invitations à la finale, rencontres avec des professionnels, accompagnement dans la création de projets et portfolios.',
  },
  {
    title: '6.3 — Une passerelle vers la compétition',
    desc: 'Un challenge féminin en amont de la compétition. Les meilleures participantes intègrent les qualifications principales, des équipes mixtes, la création de contenus ou la production de l’événement.',
  },
  {
    title: '6.4 — Féminisation de l’écosystème',
    desc: 'Favoriser la présence des femmes dans les métiers de l’événement : Production, Communication, Graphisme, Média, Streaming, Community Management, Événementiel, Arbitrage.',
  },
  {
    title: '6.5 — Impact recherché',
    desc: 'Mesuré à travers le nombre de femmes formées, le taux de participation, les projets réalisés, les opportunités proposées, la part des femmes en production et le nombre de participantes en compétition.',
  },
];

export default function ProjectPage() {
  const { navigate } = useRouter();

  return (
    <div className="animate-fade-in">
      <PageHero
        badge="PROJET KARRE-X"
        title={<>Football <span className="text-lime-500">•</span> Gaming <span className="text-lime-500">•</span> Téléréalité</>}
        desc="Une grande compétition panafricaine autour d'eFootball, pensée comme une expérience de divertissement, de contenu et de découverte du Bénin."
        image={heroImage}
      />

      {/* CONTEXTE */}
      <section className="section-pad">
        <div className="container-x grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
          <div className="lg:col-span-2 space-y-5 text-gray-300 leading-relaxed">
            <span className="badge badge-lime mb-2">Contexte et justification</span>
            <p className="pt-2">
              Le gaming compétitif connaît une transformation profonde en Afrique. Au-delà du simple divertissement,
              l&apos;e-sport constitue aujourd&apos;hui un véritable écosystème associant compétition, création de contenus,
              technologie, communication, événementiel et nouveaux métiers du numérique.
            </p>
            <p>
              Le projet consiste à créer une grande compétition panafricaine autour d&apos;eFootball, réunissant des
              joueurs issus de plusieurs pays africains. Les qualifications sont organisées dans les différents pays
              participants avant de conduire les meilleurs joueurs au Bénin pour une phase finale pensée comme une
              véritable expérience de divertissement.
            </p>
            <p>
              L&apos;ambition est de dépasser le modèle classique du tournoi e-sport : permettre au public de découvrir la
              personnalité des joueurs, suivre leur parcours, vivre leurs rivalités, découvrir le pays hôte et
              participer à une expérience médiatique continue. Chaque joueur devient un ambassadeur de son pays,
              tandis que le Bénin devient la première destination centrale de l&apos;événement.
            </p>
          </div>
          <div className="glass-card p-6 md:p-8">
            <h3 className="heading-display text-xl text-white mb-6">4 dimensions complémentaires</h3>
            <div className="flex flex-col gap-3">
              {['Compétition', 'Divertissement', 'Contenu', 'Destination'].map((dim, i) => (
                <div key={dim} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-lime-500/10 border border-lime-500/20 flex items-center justify-center text-lime-500 font-bold text-sm flex-shrink-0">
                    {i + 1}
                  </div>
                  <span className="text-white font-semibold">{dim}</span>
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-6 leading-relaxed">
              Un rendez-vous annuel capable de circuler d&apos;un pays africain à l&apos;autre et de devenir une marque
              e-sport africaine identifiable.
            </p>
          </div>
        </div>
      </section>

      {/* OBJECTIFS */}
      <section className="section-pad bg-navy-850 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-10" />
        <div className="container-x relative">
          <SectionTitle
            badge="Objectifs du projet"
            title="Un rendez-vous panafricain majeur"
            subtitle="Créer un rendez-vous panafricain majeur de l'e-sport, centré sur eFootball, capable de réunir les meilleurs joueurs, les communautés gaming, les créateurs de contenus, les médias, les marques et les institutions."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {specificObjectives.map((obj) => (
              <div key={obj} className="glass-card-light p-4 flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-lime-500 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-gray-300 leading-relaxed">{obj}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AXE 1 — COMPETITION */}
      <section className="section-pad relative overflow-hidden">
        <div className="container-x grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div className="relative overflow-hidden rounded-2xl order-2 lg:order-1">
            <img src={footballImage} alt="" className="w-full h-[380px] object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-900/60 to-transparent" />
          </div>
          <div className="order-1 lg:order-2">
            <span className="badge badge-lime mb-4"><Trophy className="w-3.5 h-3.5" /> Axe 1 — La compétition</span>
            <h2 className="heading-display text-3xl md:text-5xl text-white mb-5">Le cœur du projet</h2>
            <p className="text-gray-400 leading-relaxed mb-8">
              Une compétition eFootball structurée autour de représentants de plusieurs nations africaines. Chaque
              duo représente les couleurs de son pays, créant une dimension de fierté nationale et de rivalité positive.
            </p>
            <div className="grid grid-cols-3 gap-3">
              <StatCard value="16" label="Pays participants" accent="lime" />
              <StatCard value="2" label="Joueurs / pays" accent="purple" />
              <StatCard value="32" label="Finalistes" accent="lime" />
            </div>
          </div>
        </div>
      </section>

      {/* AXE 2 — EXPERIENCE PANAFRICAINE */}
      <section className="section-pad bg-navy-850 relative overflow-hidden">
        <div className="container-x grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div>
            <span className="badge badge-purple mb-4"><Plane className="w-3.5 h-3.5" /> Axe 2 — L&apos;expérience panafricaine</span>
            <h2 className="heading-display text-3xl md:text-5xl text-white mb-5">Vivre une expérience, pas juste jouer</h2>
            <p className="text-gray-400 leading-relaxed mb-6">
              Les joueurs ne viennent pas simplement au Bénin pour jouer. Le séjour intègre l&apos;accueil des
              délégations, la découverte culturelle, des challenges et des activations partenaires.
            </p>
            <div className="flex flex-wrap gap-2 mb-6">
              {experienceItems.map((item) => (
                <span key={item} className="badge badge-neutral">{item}</span>
              ))}
            </div>
            <div className="flex flex-wrap gap-2">
              {cities.map((city) => (
                <span key={city} className="badge badge-lime">{city}</span>
              ))}
            </div>
          </div>
          <div className="relative overflow-hidden rounded-2xl">
            <img src={beninImage} alt="Bénin" className="w-full h-[380px] object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-900/60 to-transparent" />
          </div>
        </div>
      </section>

      {/* AXE 3 — CONTENU & TELE-REALITE */}
      <section className="section-pad relative overflow-hidden">
        <div className="container-x grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div className="relative overflow-hidden rounded-2xl order-2 lg:order-1">
            <img src={gamingSetupImage} alt="" className="w-full h-[380px] object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-900/60 to-transparent" />
          </div>
          <div className="order-1 lg:order-2">
            <span className="badge badge-purple mb-4"><Film className="w-3.5 h-3.5" /> Axe 3 — Contenu & télé-réalité</span>
            <h2 className="heading-display text-3xl md:text-5xl text-white mb-5">Une histoire à suivre</h2>
            <p className="text-gray-400 leading-relaxed mb-6">
              Le public découvre les joueurs, leurs parcours, leurs pays, leurs ambitions et leurs rivalités.
              L&apos;objectif : ne plus soutenir seulement un joueur, mais une histoire et une nation.
            </p>
            <div className="flex flex-wrap gap-2">
              {contentFormats.map((f) => (
                <span key={f} className="badge badge-neutral">{f}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* AXE 4 — BENIN DESTINATION */}
      <section className="section-pad bg-navy-850 relative overflow-hidden">
        <div className="container-x">
          <SectionTitle badge="Axe 4 — Le Bénin comme destination" title="Une vitrine touristique et culturelle" subtitle="Le projet constitue aussi un outil de promotion du Bénin, à travers son patrimoine, son tourisme, sa gastronomie et sa culture." />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
            {[beninImage2, cultureImage, cultureImage2].map((img, i) => (
              <div key={img} className="relative overflow-hidden rounded-2xl h-56">
                <img src={img} alt="" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/60 to-transparent" />
                {i === 0 && <span className="absolute bottom-3 left-3 badge badge-lime">Découverte</span>}
              </div>
            ))}
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            {beninHighlights.map((h) => (
              <span key={h} className="badge badge-neutral">{h}</span>
            ))}
          </div>
        </div>
      </section>

      {/* AXE 5 — INCLUSION & METIERS */}
      <section className="section-pad relative overflow-hidden">
        <div className="container-x">
          <SectionTitle badge="Axe 5 — Inclusion & nouveaux métiers" title="Une transmission vers l'écosystème gaming" subtitle="Le projet fait découvrir les différents métiers de l'écosystème gaming et numérique." align="center" />
          <div className="flex flex-wrap justify-center gap-2 max-w-3xl mx-auto">
            {jobs.map((job) => (
              <span key={job} className="badge badge-purple">
                <Users className="w-3 h-3" /> {job}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* COMMUNICATION */}
      <section className="section-pad bg-navy-850 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-10" />
        <div className="container-x relative">
          <SectionTitle badge="La communication" title="Une campagne panafricaine" subtitle="« Chaque pays doit avoir ses héros, ses couleurs et son histoire. » — le public choisit son camp avant même la finale." />
          <div className="mb-4 flex items-center gap-2 justify-center text-purple-400">
            <Megaphone className="w-4 h-4" />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {commPhases.map((phase) => (
              <div key={phase.title} className="glass-card p-6 md:p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-11 h-11 rounded-xl bg-lime-500/10 border border-lime-500/20 flex items-center justify-center text-lime-500 flex-shrink-0">
                    <phase.icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-display text-xl text-white tracking-wide">{phase.title}</h3>
                </div>
                <p className="text-sm text-purple-400 font-semibold mb-4">{phase.objective}</p>
                <ul className="space-y-2">
                  {phase.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-gray-400 leading-relaxed">
                      <CheckCircle2 className="w-3.5 h-3.5 text-lime-500 flex-shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SPONSORING */}
      <section className="section-pad relative overflow-hidden">
        <div className="container-x">
          <SectionTitle badge="Le sponsoring" title="Plus qu'un tournoi, une expérience" align="center" />
          <div className="glass-card p-8 md:p-12 max-w-3xl mx-auto text-center mb-10 relative">
            <Quote className="w-8 h-8 text-lime-500 mx-auto mb-4 opacity-60" />
            <p className="text-lg md:text-xl text-white leading-relaxed font-medium">
              « Le partenaire ne finance pas simplement un tournoi. Il s&apos;associe à une expérience panafricaine,
              digitale, sportive, culturelle et médiatique. »
            </p>
          </div>
          <p className="text-center text-gray-400 max-w-2xl mx-auto mb-8 leading-relaxed">
            Une présence sur plusieurs semaines grâce aux qualifications, aux contenus et à la phase finale — avec
            des activations physiques, digitales et des contenus co-brandés avant, pendant et après l&apos;événement.
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {sponsoringTypes.map((s) => (
              <span key={s} className="badge badge-neutral">
                <Handshake className="w-3 h-3" /> {s}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* PROGRAMME SOCIAL — GIRLS IN GAME */}
      <section className="section-pad relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-navy-900 to-lime-500/5" />
        <div className="absolute inset-0 bg-grid opacity-10" />
        <div className="container-x relative">
          <div className="text-center mb-12">
            <span className="badge badge-purple mb-4"><HeartHandshake className="w-3.5 h-3.5" /> Programme social</span>
            <h2 className="heading-display text-4xl md:text-6xl text-white mb-3">
              KARRE<span className="text-lime-500">•X</span> <span className="text-pink-500">WOMEN</span>
            </h2>
            <p className="text-gradient-purple font-display text-xl md:text-2xl uppercase tracking-wide mb-5">
              Du gaming aux opportunités.
            </p>
            <p className="text-gray-400 max-w-2xl mx-auto leading-relaxed">
              Favoriser l&apos;accès des jeunes femmes au gaming, à l&apos;e-sport et aux métiers du numérique — une
              véritable passerelle vers la formation, la compétition, la création de contenus et l&apos;emploi.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {girlsSections.map((g) => (
              <div key={g.title} className="glass-card p-6 hover:border-purple-500/30 transition-all">
                <h3 className="font-display text-lg text-lime-500 tracking-wide mb-3">{g.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{g.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-pad relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-navy-850 via-navy-900 to-navy-850" />
        <div className="absolute inset-0 bg-radial-glow" />
        <div className="container-x relative">
          <div className="glass-card p-8 md:p-16 text-center max-w-4xl mx-auto relative overflow-hidden">
            <div className="absolute -top-20 -left-20 w-60 h-60 bg-lime-500/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-purple-500/10 rounded-full blur-3xl" />
            <div className="relative">
              <Sparkles className="w-12 h-12 text-lime-500 mx-auto mb-6" />
              <h2 className="heading-display text-3xl md:text-5xl text-white mb-4">Construisons KarreX ensemble</h2>
              <p className="text-base md:text-lg text-gray-400 max-w-2xl mx-auto mb-8">
                Joueur, partenaire ou média — rejoignez la première expérience panafricaine de football, gaming et télé-réalité.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button onClick={() => navigate('register')} className="btn-primary text-base !px-8 !py-4">
                  S&apos;inscrire comme joueur
                  <ArrowRight className="w-5 h-5" />
                </button>
                <button onClick={() => navigate('partners')} className="btn-secondary text-base !px-8 !py-4">
                  Devenir partenaire
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
