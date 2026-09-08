export interface Country {
  name: string;
  code: string;
  flag: string; // emoji
  status: 'open' | 'qualifying' | 'closed' | 'qualified';
  players: number;
}

export interface Player {
  id: string;
  pseudo: string;
  realName: string;
  country: string;
  countryCode: string;
  flag: string;
  bio: string;
  image: string;
  stats: { matches: number; wins: number; goals: number };
}

export interface ScheduleDay {
  day: number;
  date: string;
  title: string;
  desc: string;
  location: string;
  type: 'competition' | 'cultural' | 'travel' | 'ceremony';
}

export interface ContentItem {
  id: string;
  type: 'article' | 'video' | 'social';
  title: string;
  excerpt: string;
  date: string;
  image: string;
  platform?: string;
}

export interface Partner {
  name: string;
  tier: 'title' | 'premium' | 'official' | 'media';
}

export interface GroupStanding {
  group: string;
  players: { pseudo: string; country: string; flag: string; played: number; won: number; drawn: number; lost: number; gf: number; ga: number; pts: number }[];
}

export interface BracketMatch {
  id: string;
  round: string;
  p1: { pseudo: string; country: string; flag: string } | null;
  p2: { pseudo: string; country: string; flag: string } | null;
  score1?: number;
  score2?: number;
  status: 'completed' | 'live' | 'upcoming';
}

export const countries: Country[] = [
  { name: 'Bénin', code: 'BJ', flag: '🇧🇯', status: 'qualified', players: 2 },
  { name: 'Nigeria', code: 'NG', flag: '🇳🇬', status: 'qualifying', players: 2 },
  { name: 'Sénégal', code: 'SN', flag: '🇸🇳', status: 'qualifying', players: 2 },
  { name: "Côte d'Ivoire", code: 'CI', flag: '🇨🇮', status: 'open', players: 0 },
  { name: 'Ghana', code: 'GH', flag: '🇬🇭', status: 'qualifying', players: 2 },
  { name: 'Cameroun', code: 'CM', flag: '🇨🇲', status: 'open', players: 0 },
  { name: 'Mali', code: 'ML', flag: '🇲🇱', status: 'open', players: 0 },
  { name: 'Burkina Faso', code: 'BF', flag: '🇧🇫', status: 'qualifying', players: 2 },
  { name: 'Togo', code: 'TG', flag: '🇹🇬', status: 'open', players: 0 },
  { name: 'Niger', code: 'NE', flag: '🇳🇪', status: 'open', players: 0 },
  { name: 'Guinée', code: 'GN', flag: '🇬🇳', status: 'open', players: 0 },
  { name: 'Congo', code: 'CG', flag: '🇨🇬', status: 'open', players: 0 },
  { name: 'RD Congo', code: 'CD', flag: '🇨🇩', status: 'qualifying', players: 2 },
  { name: 'Gabon', code: 'GA', flag: '🇬🇦', status: 'open', players: 0 },
  { name: 'Tchad', code: 'TD', flag: '🇹🇩', status: 'open', players: 0 },
  { name: 'Maroc', code: 'MA', flag: '🇲🇦', status: 'qualifying', players: 2 },
];

export const players: Player[] = [
  {
    id: 'p1',
    pseudo: 'KingBj',
    realName: 'Koffi Adjovi',
    country: 'Bénin',
    countryCode: 'BJ',
    flag: '🇧🇯',
    bio: 'Champion national 2025, invaincu depuis 18 mois',
    image: 'https://images.pexels.com/photos/35406693/pexels-photo-35406693.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    stats: { matches: 24, wins: 21, goals: 67 },
  },
  {
    id: 'p2',
    pseudo: 'BeninStorm',
    realName: 'Yassin Dossou',
    country: 'Bénin',
    countryCode: 'BJ',
    flag: '🇧🇯',
    bio: 'Spécialiste du format relais, vision de jeu unique',
    image: 'https://images.pexels.com/photos/35844066/pexels-photo-35844066.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    stats: { matches: 18, wins: 14, goals: 52 },
  },
  {
    id: 'p3',
    pseudo: 'NaijaPrime',
    realName: 'Emeka Okafor',
    country: 'Nigeria',
    countryCode: 'NG',
    flag: '🇳🇬',
    bio: 'Le prodige de Lagos, 19 ans, précision chirurgicale',
    image: 'https://images.pexels.com/photos/6322948/pexels-photo-6322948.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    stats: { matches: 22, wins: 19, goals: 71 },
  },
  {
    id: 'p4',
    pseudo: 'LagosBlaze',
    realName: 'Tunde Bello',
    country: 'Nigeria',
    countryCode: 'NG',
    flag: '🇳🇬',
    bio: 'Vice-champion d\'Afrique de l\'Ouest 2024',
    image: 'https://images.pexels.com/photos/12257911/pexels-photo-12257911.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    stats: { matches: 20, wins: 15, goals: 58 },
  },
  {
    id: 'p5',
    pseudo: 'TerangaX',
    realName: 'Mamadou Diop',
    country: 'Sénégal',
    countryCode: 'SN',
    flag: '🇸🇳',
    bio: 'La teranga sur et hors du terrain, favori du public',
    image: 'https://images.pexels.com/photos/35237196/pexels-photo-35237196.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    stats: { matches: 19, wins: 16, goals: 60 },
  },
  {
    id: 'p6',
    pseudo: 'DakarForce',
    realName: 'Cheikh Ndiaye',
    country: 'Sénégal',
    countryCode: 'SN',
    flag: '🇸🇳',
    bio: 'Stratège hors pair, maître du format battle',
    image: 'https://images.pexels.com/photos/15895254/pexels-photo-15895254.png?auto=compress&cs=tinysrgb&h=650&w=940',
    stats: { matches: 17, wins: 13, goals: 49 },
  },
  {
    id: 'p7',
    pseudo: 'AccraKing',
    realName: 'Kwame Asante',
    country: 'Ghana',
    countryCode: 'GH',
    flag: '🇬🇭',
    bio: 'Le roi d\'Accra, imbattable en phase de groupe',
    image: 'https://images.pexels.com/photos/6616678/pexels-photo-6616678.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    stats: { matches: 21, wins: 17, goals: 63 },
  },
  {
    id: 'p8',
    pseudo: 'OuagaStorm',
    realName: 'Ibrahim Ouédraogo',
    country: 'Burkina Faso',
    countryCode: 'BF',
    flag: '🇧🇫',
    bio: 'La révélation de l\'année, 17 ans, talent brut',
    image: 'https://images.pexels.com/photos/6150694/pexels-photo-6150694.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    stats: { matches: 15, wins: 11, goals: 41 },
  },
  {
    id: 'p9',
    pseudo: 'KinshasaPro',
    realName: 'Patrick Mbumba',
    country: 'RD Congo',
    countryCode: 'CD',
    flag: '🇨🇩',
    bio: 'Le veteran, 10 ans de compétition, leader d\'équipe',
    image: 'https://images.pexels.com/photos/12257911/pexels-photo-12257911.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    stats: { matches: 28, wins: 23, goals: 82 },
  },
  {
    id: 'p10',
    pseudo: 'CasaLegend',
    realName: 'Youssef El Amrani',
    country: 'Maroc',
    countryCode: 'MA',
    flag: '🇲🇦',
    bio: 'Champion d\'Afrique du Nord, style offensif flamboyant',
    image: 'https://images.pexels.com/photos/35406693/pexels-photo-35406693.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    stats: { matches: 23, wins: 20, goals: 75 },
  },
];

export const schedule: ScheduleDay[] = [
  { day: 1, date: 'J1', title: 'Cérémonie d\'ouverture', desc: 'Arrivée des délégations, cérémonie d\'ouverture et tirage au sort des groupes', location: 'Cotonou', type: 'ceremony' },
  { day: 2, date: 'J2', title: 'Phase de groupes — Journée 1', desc: '16 matchs de poules, découverte des premiers qualifiés', location: 'Cotonou', type: 'competition' },
  { day: 3, date: 'J3', title: 'Phase de groupes — Journée 2', desc: 'Suite et fin des matchs aller', location: 'Cotonou', type: 'competition' },
  { day: 4, date: 'J4', title: 'Découverte — Route des esclaves', desc: 'Visite culturelle d\'Ouidah, tournage documentaire', location: 'Ouidah', type: 'cultural' },
  { day: 5, date: 'J5', title: 'Phase de groupes — Journée 3', desc: 'Matchs retour, qualification pour les huitièmes', location: 'Cotonou', type: 'competition' },
  { day: 6, date: 'J6', title: 'Défi Ganvié', desc: 'Défi e-sport en plein air sur la cité lacustre', location: 'Ganvié', type: 'competition' },
  { day: 7, date: 'J7', title: 'Rest day & Portraits', desc: 'Journée de repos, tournage des portraits et interviews', location: 'Cotonou', type: 'cultural' },
  { day: 8, date: 'J8', title: 'Huitièmes de finale', desc: '8 matchs à élimination directe, format battle', location: 'Cotonou', type: 'competition' },
  { day: 9, date: 'J9', title: 'Quarts de finale', desc: 'Les 8 survivants s\'affrontent, format relais et battle', location: 'Cotonou', type: 'competition' },
  { day: 10, date: 'J10', title: 'Découverte — Porto-Novo', desc: 'Visite de la capitale politique, rencontre avec les autorités', location: 'Porto-Novo', type: 'travel' },
  { day: 11, date: 'J11', title: 'Demi-finales', desc: 'Les 4 meilleurs s\'affrontent pour une place en finale', location: 'Cotonou', type: 'competition' },
  { day: 12, date: 'J12', title: 'Petite finale', desc: 'Match pour la 3e place, célébration des finalistes', location: 'Cotonou', type: 'competition' },
  { day: 13, date: 'J13', title: 'Grande Finale', desc: 'Le match ultime, couronnement du champion panafricain', location: 'Cotonou', type: 'competition' },
  { day: 14, date: 'J14', title: 'Cérémonie de clôture', desc: 'Remise des prix, cérémonie de clôture et gala de fin', location: 'Porto-Novo', type: 'ceremony' },
];

export const contentItems: ContentItem[] = [
  {
    id: 'c1',
    type: 'video',
    title: 'Les qualifications au Nigeria : 5000 candidats pour 2 places',
    excerpt: 'Plongée dans la compétition la plus féroce du continent. Reportage exclusif sur les qualifiers nigérians.',
    date: '2026-08-15',
    image: 'https://images.pexels.com/photos/9072317/pexels-photo-9072317.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    platform: 'YouTube',
  },
  {
    id: 'c2',
    type: 'article',
    title: 'Portrait : KingBj, l\'invaincu de Cotonou',
    excerpt: 'Comment Koffi Adjovi est devenu le joueur le plus redouté du Bénin et prétend au titre panafricain.',
    date: '2026-08-20',
    image: 'https://images.pexels.com/photos/35406693/pexels-photo-35406693.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    id: 'c3',
    type: 'social',
    title: 'Le défi Ganvié : jouer sur l\'eau',
    excerpt: 'Une installation e-sport sur la cité lacustre. Un moment inédit qui a fait le buzz sur TikTok.',
    date: '2026-08-25',
    image: 'https://images.pexels.com/photos/8655016/pexels-photo-8655016.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    platform: 'TikTok',
  },
  {
    id: 'c4',
    type: 'video',
    title: 'Coulisses : la préparation des 32 finalistes',
    excerpt: 'Camp d\'entraînement, stratégie mentale, nutrition gaming. Tout ce qui se passe avant le tournoi.',
    date: '2026-08-28',
    image: 'https://images.pexels.com/photos/9072216/pexels-photo-9072216.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    platform: 'YouTube',
  },
  {
    id: 'c5',
    type: 'article',
    title: 'eFootball en Afrique : l\'essor d\'une nouvelle discipline',
    excerpt: 'Analyse du boom du gaming compétitif sur le continent et du rôle de l\'AFN eFootball Cup.',
    date: '2026-09-01',
    image: 'https://images.pexels.com/photos/7862381/pexels-photo-7862381.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    id: 'c6',
    type: 'social',
    title: 'Top 10 des plus beaux buts des qualifications',
    excerpt: 'Compilation virale des meilleurs moments des qualifications nationales. 2M de vues en 48h.',
    date: '2026-09-03',
    image: 'https://images.pexels.com/photos/30707345/pexels-photo-30707345.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    platform: 'Instagram',
  },
];

export const partners: Partner[] = [
  { name: 'AfriBet', tier: 'title' },
  { name: 'Orange Africa', tier: 'title' },
  { name: 'Canal+ Sport', tier: 'premium' },
  { name: 'Puma Gaming', tier: 'premium' },
  { name: 'Red Bull Africa', tier: 'premium' },
  { name: 'MTN Group', tier: 'official' },
  { name: 'Visa', tier: 'official' },
  { name: 'Ecobank', tier: 'official' },
  { name: 'Air Cotonou', tier: 'official' },
  { name: 'GameOne', tier: 'media' },
  { name: 'Africa News 24', tier: 'media' },
  { name: 'Jeune Afrique', tier: 'media' },
];

export const groupStandings: GroupStanding[] = [
  {
    group: 'Groupe A',
    players: [
      { pseudo: 'KingBj', country: 'Bénin', flag: '🇧🇯', played: 3, won: 3, drawn: 0, lost: 0, gf: 12, ga: 3, pts: 9 },
      { pseudo: 'NaijaPrime', country: 'Nigeria', flag: '🇳🇬', played: 3, won: 2, drawn: 0, lost: 1, gf: 8, ga: 5, pts: 6 },
      { pseudo: 'OuagaStorm', country: 'Burkina Faso', flag: '🇧🇫', played: 3, won: 1, drawn: 0, lost: 2, gf: 4, ga: 9, pts: 3 },
      { pseudo: 'NigerEagle', country: 'Niger', flag: '🇳🇪', played: 3, won: 0, drawn: 0, lost: 3, gf: 2, ga: 9, pts: 0 },
    ],
  },
  {
    group: 'Groupe B',
    players: [
      { pseudo: 'TerangaX', country: 'Sénégal', flag: '🇸🇳', played: 3, won: 2, drawn: 1, lost: 0, gf: 10, ga: 4, pts: 7 },
      { pseudo: 'CasaLegend', country: 'Maroc', flag: '🇲🇦', played: 3, won: 2, drawn: 1, lost: 0, gf: 9, ga: 4, pts: 7 },
      { pseudo: 'AccraKing', country: 'Ghana', flag: '🇬🇭', played: 3, won: 1, drawn: 0, lost: 2, gf: 5, ga: 8, pts: 3 },
      { pseudo: 'LomeStar', country: 'Togo', flag: '🇹🇬', played: 3, won: 0, drawn: 1, lost: 2, gf: 3, ga: 11, pts: 1 },
    ],
  },
  {
    group: 'Groupe C',
    players: [
      { pseudo: 'KinshasaPro', country: 'RD Congo', flag: '🇨🇩', played: 3, won: 3, drawn: 0, lost: 0, gf: 14, ga: 2, pts: 9 },
      { pseudo: 'BeninStorm', country: 'Bénin', flag: '🇧🇯', played: 3, won: 2, drawn: 0, lost: 1, gf: 7, ga: 5, pts: 6 },
      { pseudo: 'AbidjanX', country: "Côte d'Ivoire", flag: '🇨🇮', played: 3, won: 1, drawn: 0, lost: 2, gf: 4, ga: 10, pts: 3 },
      { pseudo: 'LibreVilleFC', country: 'Congo', flag: '🇨🇬', played: 3, won: 0, drawn: 0, lost: 3, gf: 1, ga: 9, pts: 0 },
    ],
  },
  {
    group: 'Groupe D',
    players: [
      { pseudo: 'DakarForce', country: 'Sénégal', flag: '🇸🇳', played: 3, won: 2, drawn: 1, lost: 0, gf: 8, ga: 3, pts: 7 },
      { pseudo: 'LagosBlaze', country: 'Nigeria', flag: '🇳🇬', played: 3, won: 2, drawn: 1, lost: 0, gf: 7, ga: 3, pts: 7 },
      { pseudo: 'BamakoBoy', country: 'Mali', flag: '🇲🇱', played: 3, won: 1, drawn: 0, lost: 2, gf: 4, ga: 8, pts: 3 },
      { pseudo: 'NdjamenaPro', country: 'Tchad', flag: '🇹🇩', played: 3, won: 0, drawn: 0, lost: 3, gf: 2, ga: 7, pts: 0 },
    ],
  },
];

export const bracketMatches: BracketMatch[] = [
  // Round of 16
  { id: 'r16-1', round: 'Huitièmes', p1: { pseudo: 'KingBj', country: 'Bénin', flag: '🇧🇯' }, p2: { pseudo: 'DakarForce', country: 'Sénégal', flag: '🇸🇳' }, score1: 3, score2: 1, status: 'completed' },
  { id: 'r16-2', round: 'Huitièmes', p1: { pseudo: 'NaijaPrime', country: 'Nigeria', flag: '🇳🇬' }, p2: { pseudo: 'BeninStorm', country: 'Bénin', flag: '🇧🇯' }, score1: 2, score2: 2, status: 'live' },
  { id: 'r16-3', round: 'Huitièmes', p1: { pseudo: 'TerangaX', country: 'Sénégal', flag: '🇸🇳' }, p2: { pseudo: 'KinshasaPro', country: 'RD Congo', flag: '🇨🇩' }, score1: 1, score2: 3, status: 'completed' },
  { id: 'r16-4', round: 'Huitièmes', p1: { pseudo: 'CasaLegend', country: 'Maroc', flag: '🇲🇦' }, p2: { pseudo: 'LagosBlaze', country: 'Nigeria', flag: '🇳🇬' }, status: 'upcoming' },
  { id: 'r16-5', round: 'Huitièmes', p1: { pseudo: 'AccraKing', country: 'Ghana', flag: '🇬🇭' }, p2: { pseudo: 'OuagaStorm', country: 'Burkina Faso', flag: '🇧🇫' }, status: 'upcoming' },
  { id: 'r16-6', round: 'Huitièmes', p1: null, p2: null, status: 'upcoming' },
  { id: 'r16-7', round: 'Huitièmes', p1: null, p2: null, status: 'upcoming' },
  { id: 'r16-8', round: 'Huitièmes', p1: null, p2: null, status: 'upcoming' },
  // Quarterfinals
  { id: 'qf-1', round: 'Quarts', p1: { pseudo: 'KingBj', country: 'Bénin', flag: '🇧🇯' }, p2: null, status: 'upcoming' },
  { id: 'qf-2', round: 'Quarts', p1: { pseudo: 'KinshasaPro', country: 'RD Congo', flag: '🇨🇩' }, p2: null, status: 'upcoming' },
  { id: 'qf-3', round: 'Quarts', p1: null, p2: null, status: 'upcoming' },
  { id: 'qf-4', round: 'Quarts', p1: null, p2: null, status: 'upcoming' },
  // Semifinals
  { id: 'sf-1', round: 'Demi-finales', p1: null, p2: null, status: 'upcoming' },
  { id: 'sf-2', round: 'Demi-finales', p1: null, p2: null, status: 'upcoming' },
  // Final
  { id: 'final', round: 'Finale', p1: null, p2: null, status: 'upcoming' },
];

export const heroImage = 'https://images.pexels.com/photos/14266493/pexels-photo-14266493.jpeg?auto=compress&cs=tinysrgb&h=650&w=940';
export const heroImage2 = 'https://images.pexels.com/photos/9072317/pexels-photo-9072317.jpeg?auto=compress&cs=tinysrgb&h=650&w=940';
export const gamingSetupImage = 'https://images.pexels.com/photos/9072216/pexels-photo-9072216.jpeg?auto=compress&cs=tinysrgb&h=650&w=940';
export const beninImage = 'https://images.pexels.com/photos/8655016/pexels-photo-8655016.jpeg?auto=compress&cs=tinysrgb&h=650&w=940';
export const beninImage2 = 'https://images.pexels.com/photos/8657935/pexels-photo-8657935.jpeg?auto=compress&cs=tinysrgb&h=650&w=940';
export const cultureImage = 'https://images.pexels.com/photos/25703722/pexels-photo-25703722.jpeg?auto=compress&cs=tinysrgb&h=650&w=940';
export const cultureImage2 = 'https://images.pexels.com/photos/34309308/pexels-photo-34309308.jpeg?auto=compress&cs=tinysrgb&h=650&w=940';
export const footballImage = 'https://images.pexels.com/photos/38602682/pexels-photo-38602682.jpeg?auto=compress&cs=tinysrgb&h=650&w=940';
