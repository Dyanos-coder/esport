import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';

export type Lang = 'fr' | 'en';

type Dict = Record<string, string>;

const fr: Dict = {
  // Nav
  'nav.home': 'Accueil',
  'nav.concept': 'Le Concept',
  'nav.countries': 'Pays',
  'nav.register': 'Inscriptions',
  'nav.rules': 'Règlement',
  'nav.players': 'Joueurs',
  'nav.results': 'Résultats',
  'nav.finale': 'La Finale',
  'nav.content': 'Contenus',
  'nav.partners': 'Partenaires',
  'nav.cta': "S'inscrire",

  // Home - Hero
  'hero.badge': 'Tournoi Panafricain d\'eFootball',
  'hero.title1': '16 NATIONS',
  'hero.title2': '1 TROPHÉE',
  'hero.subtitle': 'Le premier tournoi panafricain d\'eFootball. 32 joueurs s\'affrontent pendant 14 jours au Bénin, entre compétition e-sport, télé-réalité et découverte touristique.',
  'hero.cta1': "S'inscrire",
  'hero.cta2': 'Découvrir le concept',
  'hero.date': 'Finale : 14 jours au Bénin',
  'hero.scroll': 'Défiler',

  // Home - Stats
  'stats.title': 'EN CHIFFRES',
  'stats.subtitle': 'Un événement inédit sur le continent',
  'stats.countries': 'Pays participants',
  'stats.players': 'Joueurs finalistes',
  'stats.days': 'Jours de finale',
  'stats.matches': 'Matchs prévus',

  // Home - Piliers
  'piliers.title': 'LES 4 PILIERS',
  'piliers.subtitle': 'Une expérience unique qui dépasse le simple tournoi',
  'piliers.competition.title': 'Compétition',
  'piliers.competition.desc': 'Un format e-sport professionnel avec qualifications nationales, phases de groupe et finales à élimination directe.',
  'piliers.content.title': 'Contenu',
  'piliers.content.desc': 'Programme de divertissement avec portraits, coulisses, défis et documentaires — une véritable télé-réalité e-sport.',
  'piliers.nations.title': 'Nations',
  'piliers.nations.desc': '16 pays africains réunis autour d\'une passion commune, célébrant la diversité et l\'unité du continent.',
  'piliers.destination.title': 'Destination',
  'piliers.destination.desc': 'Découverte du Bénin : Cotonou, Ouidah, Ganvié et Porto-Novo — culture, histoire et tourisme.',
  'piliers.competition.icon': 'Compétition',
  'piliers.content.icon': 'Contenu',
  'piliers.nations.icon': 'Nations',
  'piliers.destination.icon': 'Destination',

  // Home - CTA
  'cta.title': 'PRÊT À FAIRE PARTIE DE L\'HISTOIRE ?',
  'cta.subtitle': 'Les inscriptions sont ouvertes. Représente ton pays et deviens l\'un des 32 finalistes au Bénin.',
  'cta.button': "S'inscrire maintenant",
  'cta.secondary': 'Voir les pays participants',

  // Concept
  'concept.hero.badge': 'LE CONCEPT',
  'concept.hero.title': 'Plus qu\'un tournoi.\nUne révolution e-sport africaine.',
  'concept.hero.desc': 'L\'AFN eFootball Cup est un programme de divertissement complet qui mêle compétition e-sport de haut niveau, télé-réalité immersive et découverte touristique du Bénin.',
  'concept.vision.title': 'NOTRE VISION',
  'concept.vision.desc': 'Démontrer que l\'Afrique peut organiser des événements e-sport de classe mondiale, révéler de nouveaux talents, et projeter une image moderne et dynamique du continent à travers le gaming.',
  'concept.positioning.title': 'POSITIONNEMENT',
  'concept.positioning.desc': 'Premium mais accessible. Jeune, dynamique, africain. Un programme qui parle aux gamers, aux fans de sport, aux amateurs de divertissement et aux curieux de culture africaine.',

  // Countries
  'countries.hero.badge': 'PAYS PARTICIPANTS',
  'countries.hero.title': '16 NATIONS, 1 RÊVE',
  'countries.hero.desc': '16 pays africains engagés dans la course. Chacun organise ses qualifications nationales pour sélectionner ses 2 représentants.',
  'countries.status.open': 'Inscriptions ouvertes',
  'countries.status.qualifying': 'Qualifications en cours',
  'countries.status.closed': 'Inscriptions closes',
  'countries.status.qualified': 'Qualifié',
  'countries.players': 'joueurs',

  // Register
  'register.hero.badge': 'INSCRIPTIONS',
  'register.hero.title': 'REPRÉSENTE TON PAYS',
  'register.hero.desc': 'Inscris-toi pour participer aux qualifications nationales. Les meilleurs joueurs représenteront leur pays lors de la finale au Bénin.',
  'register.form.title': 'Formulaire de candidature',
  'register.form.country': 'Pays représenté',
  'register.form.country.placeholder': 'Sélectionne ton pays',
  'register.form.pseudo': 'Pseudo / Gamertag',
  'register.form.pseudo.placeholder': 'Ton pseudo de joueur',
  'register.form.name': 'Nom complet',
  'register.form.name.placeholder': 'Ton nom et prénom',
  'register.form.email': 'Email',
  'register.form.email.placeholder': 'ton@email.com',
  'register.form.phone': 'Téléphone / WhatsApp',
  'register.form.phone.placeholder': '+XXX XX XX XX XX',
  'register.form.level': 'Niveau de jeu',
  'register.form.level.placeholder': 'Sélectionne ton niveau',
  'register.form.level.amateur': 'Amateur',
  'register.form.level.semipro': 'Semi-pro',
  'register.form.level.pro': 'Compétitif / Pro',
  'register.form.message': 'Message (optionnel)',
  'register.form.message.placeholder': 'Parle-nous de toi, ton expérience...',
  'register.form.submit': 'Envoyer ma candidature',
  'register.form.submitting': 'Envoi en cours...',
  'register.form.success': 'Candidature envoyée ! Nous te contacterons par email.',
  'register.form.error': 'Une erreur est survenue. Réessaie ou contacte-nous.',
  'register.form.required': 'Ce champ est obligatoire',
  'register.info.title': 'INFORMATIONS IMPORTANTES',
  'register.info.1': 'Tu dois avoir au moins 16 ans pour participer',
  'register.info.2': 'Les qualifications nationales se déroulent en ligne',
  'register.info.3': '2 joueurs par pays seront sélectionnés pour la finale',
  'register.info.4': 'La finale se déroule au Bénin sur 14 jours',
  'register.info.5': 'Transport et hébergement pris en charge pour les finalistes',

  // Rules
  'rules.hero.badge': 'RÈGLEMENT',
  'rules.hero.title': 'FORMAT DE COMPÉTITION',
  'rules.hero.desc': 'Du qualification nationale à la grande finale au Bénin, découvrez le format complet de la compétition.',
  'rules.phase1.title': 'Phase 1 — Qualifications Nationales',
  'rules.phase1.desc': 'Chaque pays organise ses propres qualifications en ligne. Les joueurs s\'affrontent dans un format de bracket à élimination directe jusqu\'à déterminer les 2 représentants nationaux.',
  'rules.phase2.title': 'Phase 2 — Phase de Groupes',
  'rules.phase2.desc': 'Les 32 joueurs sont répartis en 8 groupes de 4. Chaque joueur affronte les 3 autres de son groupe en format aller-retour. Les 2 premiers de chaque groupe avancent.',
  'rules.phase3.title': 'Phase 3 — Phases Finales',
  'rules.phase3.desc': 'Les 16 qualifiés s\'affrontent en bracket à élimination directe : huitièmes, quarts, demi-finales et grande finale.',
  'rules.format.relay.title': 'Format Relais',
  'rules.format.relay.desc': 'Deux joueurs d\'un même pays jouent en alternance : un mi-temps chacun. La coordination et la communication sont essentielles.',
  'rules.format.battle.title': 'Format Battle',
  'rules.format.battle.desc': 'Affrontement direct 1v1 classique. Le joueur avec le meilleur score sur deux manches l\'emporte.',
  'rules.rules.title': 'RÈGLES GÉNÉRALES',
  'rules.rules.1': 'Jeu officiel : eFootball (version mobile et console)',
  'rules.rules.2': 'Durée d\'un match : 10 minutes (2 mi-temps de 5 min)',
  'rules.rules.3': 'En cas d\'égalité en phase finale : prolongations puis tirs au but',
  'rules.rules.4': 'Connexion internet stable obligatoire pour les qualifications en ligne',
  'rules.rules.5': 'Comportement fair-play exigé : tout comportement toxique entraîne une disqualification',
  'rules.rules.6': 'Les joueurs doivent utiliser leur compte personnel et vérifié',

  // Players
  'players.hero.badge': 'PORTRAITS',
  'players.hero.title': 'LES FINALISTES',
  'players.hero.desc': '32 joueurs. 16 nations. Découvrez les portraits de ceux qui représenteront leur pays au Bénin.',
  'players.filter.all': 'Tous les pays',
  'players.stats.matches': 'Matchs',
  'players.stats.wins': 'Victoires',
  'players.stats.goals': 'Buts',

  // Results
  'results.hero.badge': 'RÉSULTATS & CLASSEMENTS',
  'results.hero.title': 'TOURNAGE EN DIRECT',
  'results.hero.desc': 'Suivez les résultats en temps réel, du phase de groupes jusqu\'à la grande finale.',
  'results.groups': 'Phase de Groupes',
  'results.bracket': 'Tableau Final',
  'results.live': 'EN DIRECT',
  'results.upcoming': 'À VENIR',
  'results.completed': 'TERMINÉ',

  // Finale
  'finale.hero.badge': 'LA FINALE AU BÉNIN',
  'finale.hero.title': '14 JOURS D\'INTENSITÉ',
  'finale.hero.desc': 'La grande finale se déroule au Bénin, entre compétition e-sport et découverte touristique. 4 villes, 14 jours d\'émotion.',
  'finale.program.title': 'PROGRAMME DES 14 JOURS',
  'finale.locations.title': 'LIEUX DE LA FINALE',
  'finale.cotonou.title': 'Cotonou',
  'finale.cotonou.desc': 'La capitale économique. Arène principale de la compétition, cérémonie d\'ouverture et grande finale.',
  'finale.ouidah.title': 'Ouidah',
  'finale.ouidah.desc': 'Ville historique de la route des esclaves. Visite culturelle et documentaire sur l\'histoire du Bénin.',
  'finale.ganvie.title': 'Ganvié',
  'finale.ganvie.desc': 'La cité lacustre, plus grand village sur pilotis d\'Afrique. Défi e-sport en plein air sur le lac.',
  'finale.portonovo.title': 'Porto-Novo',
  'finale.portonovo.desc': 'La capitale politique. Visite de la ville, rencontre avec les autorités et cérémonie de clôture.',

  // Content
  'content.hero.badge': 'CONTENUS',
  'content.hero.title': 'DERRIÈRE LES ÉCRANS',
  'content.hero.desc': 'Articles, vidéos, portraits et coulisses. Plongez dans l\'univers de l\'AFN eFootball Cup.',
  'content.filter.all': 'Tout',
  'content.filter.articles': 'Articles',
  'content.filter.videos': 'Vidéos',
  'content.filter.social': 'Réseaux',
  'content.read': 'Lire',
  'content.watch': 'Regarder',

  // Partners
  'partners.hero.badge': 'PARTENAIRES',
  'partners.hero.title': 'ENSEMBBLE, CONSTRUISONS L\'ÉVÉNEMENT',
  'partners.hero.desc': 'Partenaires officiels, sponsors et supports médiatiques qui font de cet événement une réalité.',
  'partners.tier.title': 'Titre',
  'partners.tier.premium': 'Premium',
  'partners.tier.official': 'Officiel',
  'partners.tier.media': 'Médias',
  'partners.cta.title': 'DEVENIR PARTENAIRE',
  'partners.cta.desc': 'Associez votre marque au premier tournoi panafricain d\'eFootball. Contactez-nous pour recevoir le dossier partenaires.',
  'partners.cta.button': 'Demander le dossier',
  'partners.contact': 'Contact partenariats',

  // Footer
  'footer.tagline': 'Le premier tournoi panafricain d\'eFootball. 16 nations, 32 joueurs, 14 jours au Bénin.',
  'footer.nav.title': 'Navigation',
  'footer.legal.title': 'Légal',
  'footer.legal.mentions': 'Mentions légales',
  'footer.legal.privacy': 'Confidentialité',
  'footer.legal.cgu': 'Conditions d\'utilisation',
  'footer.contact.title': 'Contact',
  'footer.rights': 'Tous droits réservés.',
  'footer.made': 'Conçu avec passion pour l\'Afrique',

  // Common
  'common.learnMore': 'En savoir plus',
  'common.comingSoon': 'Bientôt disponible',
  'common.tba': 'À définir',
};

const en: Dict = {
  // Nav
  'nav.home': 'Home',
  'nav.concept': 'Concept',
  'nav.countries': 'Countries',
  'nav.register': 'Register',
  'nav.rules': 'Rules',
  'nav.players': 'Players',
  'nav.results': 'Results',
  'nav.finale': 'The Finale',
  'nav.content': 'Content',
  'nav.partners': 'Partners',
  'nav.cta': 'Register',

  // Home - Hero
  'hero.badge': 'Pan-African eFootball Tournament',
  'hero.title1': '16 NATIONS',
  'hero.title2': '1 TROPHY',
  'hero.subtitle': 'The first pan-African eFootball tournament. 32 players compete over 14 days in Benin, blending e-sport competition, reality TV and tourism.',
  'hero.cta1': 'Register',
  'hero.cta2': 'Discover the concept',
  'hero.date': 'Finale: 14 days in Benin',
  'hero.scroll': 'Scroll',

  // Home - Stats
  'stats.title': 'BY THE NUMBERS',
  'stats.subtitle': 'An unprecedented event on the continent',
  'stats.countries': 'Participating countries',
  'stats.players': 'Finalist players',
  'stats.days': 'Days of finale',
  'stats.matches': 'Matches scheduled',

  // Home - Piliers
  'piliers.title': 'THE 4 PILLARS',
  'piliers.subtitle': 'A unique experience that goes beyond a tournament',
  'piliers.competition.title': 'Competition',
  'piliers.competition.desc': 'A professional e-sport format with national qualifiers, group stages and knockout finals.',
  'piliers.content.title': 'Content',
  'piliers.content.desc': 'Entertainment program with portraits, behind-the-scenes, challenges and documentaries — a true e-sport reality show.',
  'piliers.nations.title': 'Nations',
  'piliers.nations.desc': '16 African countries united around a shared passion, celebrating the diversity and unity of the continent.',
  'piliers.destination.title': 'Destination',
  'piliers.destination.desc': 'Discovering Benin: Cotonou, Ouidah, Ganvié and Porto-Novo — culture, history and tourism.',
  'piliers.competition.icon': 'Competition',
  'piliers.content.icon': 'Content',
  'piliers.nations.icon': 'Nations',
  'piliers.destination.icon': 'Destination',

  // Home - CTA
  'cta.title': 'READY TO MAKE HISTORY?',
  'cta.subtitle': 'Registration is open. Represent your country and become one of the 32 finalists in Benin.',
  'cta.button': 'Register now',
  'cta.secondary': 'See participating countries',

  // Concept
  'concept.hero.badge': 'THE CONCEPT',
  'concept.hero.title': 'More than a tournament.\nAn African e-sport revolution.',
  'concept.hero.desc': 'The AFN eFootball Cup is a complete entertainment program blending top-level e-sport competition, immersive reality TV and tourism discovery of Benin.',
  'concept.vision.title': 'OUR VISION',
  'concept.vision.desc': 'To show that Africa can host world-class e-sport events, reveal new talent, and project a modern, dynamic image of the continent through gaming.',
  'concept.positioning.title': 'POSITIONING',
  'concept.positioning.desc': 'Premium yet accessible. Young, dynamic, African. A program that speaks to gamers, sports fans, entertainment lovers and those curious about African culture.',

  // Countries
  'countries.hero.badge': 'PARTICIPATING COUNTRIES',
  'countries.hero.title': '16 NATIONS, 1 DREAM',
  'countries.hero.desc': '16 African countries in the race. Each organizes national qualifiers to select its 2 representatives.',
  'countries.status.open': 'Registration open',
  'countries.status.qualifying': 'Qualifiers in progress',
  'countries.status.closed': 'Registration closed',
  'countries.status.qualified': 'Qualified',
  'countries.players': 'players',

  // Register
  'register.hero.badge': 'REGISTRATION',
  'register.hero.title': 'REPRESENT YOUR COUNTRY',
  'register.hero.desc': 'Register to participate in national qualifiers. The best players will represent their country at the finale in Benin.',
  'register.form.title': 'Application form',
  'register.form.country': 'Country represented',
  'register.form.country.placeholder': 'Select your country',
  'register.form.pseudo': 'Gamertag / Pseudo',
  'register.form.pseudo.placeholder': 'Your player tag',
  'register.form.name': 'Full name',
  'register.form.name.placeholder': 'Your full name',
  'register.form.email': 'Email',
  'register.form.email.placeholder': 'your@email.com',
  'register.form.phone': 'Phone / WhatsApp',
  'register.form.phone.placeholder': '+XXX XX XX XX XX',
  'register.form.level': 'Skill level',
  'register.form.level.placeholder': 'Select your level',
  'register.form.level.amateur': 'Amateur',
  'register.form.level.semipro': 'Semi-pro',
  'register.form.level.pro': 'Competitive / Pro',
  'register.form.message': 'Message (optional)',
  'register.form.message.placeholder': 'Tell us about you, your experience...',
  'register.form.submit': 'Submit my application',
  'register.form.submitting': 'Submitting...',
  'register.form.success': 'Application sent! We will contact you by email.',
  'register.form.error': 'An error occurred. Please try again or contact us.',
  'register.form.required': 'This field is required',
  'register.info.title': 'IMPORTANT INFORMATION',
  'register.info.1': 'You must be at least 16 years old to participate',
  'register.info.2': 'National qualifiers take place online',
  'register.info.3': '2 players per country will be selected for the finale',
  'register.info.4': 'The finale takes place in Benin over 14 days',
  'register.info.5': 'Transport and accommodation covered for finalists',

  // Rules
  'rules.hero.badge': 'RULES',
  'rules.hero.title': 'COMPETITION FORMAT',
  'rules.hero.desc': 'From national qualifiers to the grand finale in Benin, discover the full competition format.',
  'rules.phase1.title': 'Phase 1 — National Qualifiers',
  'rules.phase1.desc': 'Each country organizes its own online qualifiers. Players compete in a single-elimination bracket until 2 national representatives are determined.',
  'rules.phase2.title': 'Phase 2 — Group Stage',
  'rules.phase2.desc': 'The 32 players are split into 8 groups of 4. Each player faces the other 3 in their group in a round-robin format. The top 2 from each group advance.',
  'rules.phase3.title': 'Phase 3 — Knockout Stage',
  'rules.phase3.desc': 'The 16 qualified players compete in a single-elimination bracket: round of 16, quarterfinals, semifinals and grand finale.',
  'rules.format.relay.title': 'Relay Format',
  'rules.format.relay.desc': 'Two players from the same country alternate: one half each. Coordination and communication are essential.',
  'rules.format.battle.title': 'Battle Format',
  'rules.format.battle.desc': 'Classic 1v1 direct match. The player with the best aggregate score over two legs wins.',
  'rules.rules.title': 'GENERAL RULES',
  'rules.rules.1': 'Official game: eFootball (mobile and console versions)',
  'rules.rules.2': 'Match duration: 10 minutes (2 halves of 5 min)',
  'rules.rules.3': 'In case of a tie in knockout stage: extra time then penalties',
  'rules.rules.4': 'Stable internet connection required for online qualifiers',
  'rules.rules.5': 'Fair-play behavior required: any toxic behavior results in disqualification',
  'rules.rules.6': 'Players must use their own verified account',

  // Players
  'players.hero.badge': 'PORTRAITS',
  'players.hero.title': 'THE FINALISTS',
  'players.hero.desc': '32 players. 16 nations. Meet the ones who will represent their country in Benin.',
  'players.filter.all': 'All countries',
  'players.stats.matches': 'Matches',
  'players.stats.wins': 'Wins',
  'players.stats.goals': 'Goals',

  // Results
  'results.hero.badge': 'RESULTS & RANKINGS',
  'results.hero.title': 'LIVE BRACKET',
  'results.hero.desc': 'Follow results in real time, from group stage to the grand finale.',
  'results.groups': 'Group Stage',
  'results.bracket': 'Final Bracket',
  'results.live': 'LIVE',
  'results.upcoming': 'UPCOMING',
  'results.completed': 'COMPLETED',

  // Finale
  'finale.hero.badge': 'THE FINALE IN BENIN',
  'finale.hero.title': '14 DAYS OF INTENSITY',
  'finale.hero.desc': 'The grand finale takes place in Benin, between e-sport competition and tourism. 4 cities, 14 days of emotion.',
  'finale.program.title': '14-DAY PROGRAM',
  'finale.locations.title': 'FINALE VENUES',
  'finale.cotonou.title': 'Cotonou',
  'finale.cotonou.desc': 'The economic capital. Main competition arena, opening ceremony and grand finale.',
  'finale.ouidah.title': 'Ouidah',
  'finale.ouidah.desc': 'Historic city on the slave route. Cultural visit and documentary on Benin\'s history.',
  'finale.ganvie.title': 'Ganvié',
  'finale.ganvie.desc': 'The lake city, Africa\'s largest stilt village. Outdoor e-sport challenge on the lake.',
  'finale.portonovo.title': 'Porto-Novo',
  'finale.portonovo.desc': 'The political capital. City tour, meeting with authorities and closing ceremony.',

  // Content
  'content.hero.badge': 'CONTENT',
  'content.hero.title': 'BEHIND THE SCREENS',
  'content.hero.desc': 'Articles, videos, portraits and behind-the-scenes. Dive into the AFN eFootball Cup universe.',
  'content.filter.all': 'All',
  'content.filter.articles': 'Articles',
  'content.filter.videos': 'Videos',
  'content.filter.social': 'Social',
  'content.read': 'Read',
  'content.watch': 'Watch',

  // Partners
  'partners.hero.badge': 'PARTNERS',
  'partners.hero.title': 'TOGETHER, LET\'S BUILD THE EVENT',
  'partners.hero.desc': 'Official partners, sponsors and media partners who make this event a reality.',
  'partners.tier.title': 'Title',
  'partners.tier.premium': 'Premium',
  'partners.tier.official': 'Official',
  'partners.tier.media': 'Media',
  'partners.cta.title': 'BECOME A PARTNER',
  'partners.cta.desc': 'Associate your brand with the first pan-African eFootball tournament. Contact us to receive the partner dossier.',
  'partners.cta.button': 'Request the dossier',
  'partners.contact': 'Partnership contact',

  // Footer
  'footer.tagline': 'The first pan-African eFootball tournament. 16 nations, 32 players, 14 days in Benin.',
  'footer.nav.title': 'Navigation',
  'footer.legal.title': 'Legal',
  'footer.legal.mentions': 'Legal notice',
  'footer.legal.privacy': 'Privacy',
  'footer.legal.cgu': 'Terms of use',
  'footer.contact.title': 'Contact',
  'footer.rights': 'All rights reserved.',
  'footer.made': 'Crafted with passion for Africa',

  // Common
  'common.learnMore': 'Learn more',
  'common.comingSoon': 'Coming soon',
  'common.tba': 'TBA',
};

const dictionaries: Record<Lang, Dict> = { fr, en };

interface I18nContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: string) => string;
}

const I18nContext = createContext<I18nContextValue | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('fr');

  const t = useCallback(
    (key: string) => {
      return dictionaries[lang][key] ?? key;
    },
    [lang],
  );

  return (
    <I18nContext.Provider value={{ lang, setLang, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useI18n must be used within I18nProvider');
  return ctx;
}
