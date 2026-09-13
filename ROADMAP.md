# KarreX — Roadmap fonctionnelle (user + admin)

Basé sur l'analyse de `projet_tournoi_panafricain_efootball.pdf` (document de cadrage stratégique) et l'état actuel du code.

## 1. Ce que dit le document de cadrage

Résumé des éléments structurants qui doivent piloter le développement :

- **Format sportif** : 16 pays, jusqu'à 64 joueurs inscrits par pays → 8 groupes de 8 → élimination directe → 2 qualifiés par pays (un "duo national") → 32 finalistes au Bénin.
- **Deux titres additionnels** : RELAIS (format équipe/duo, 500 000 FCFA, *mécanique encore à fixer dans le règlement*) et BATTLE (1v1, 1 000 000 FCFA).
- **Finale de 14 jours au Bénin** : programme jour par jour (arrivées, découverte du pays, tirage, phases éliminatoires, grande finale, clôture) avec 4 lieux (Cotonou, Ouidah, Porto-Novo, Ganvié).
- **Volet média/télé-réalité** : portraits, coulisses, défis, contenu destination, matchs, confessionnal — diffusés sur TikTok/Instagram, YouTube, Facebook, site officiel, médias partenaires.
- **Communication en 3 phases** : lancement → qualifications → grande finale, avec des indicateurs à suivre (inscriptions/pays, engagement, audience, valeur partenaires).
- **Partenariats** : 8 catégories (techno, télécom, compagnie aérienne, hébergement, restauration, boissons, institutions, médias).
- **10 décisions à verrouiller avant d'aller plus loin** (p.14) — plusieurs bloquent directement le développement (voir §4).

## 2. Ce qui existe déjà dans le code

| Élément | État |
|---|---|
| Auth joueur (signup/login/logout) + session cookie | ✅ fait |
| Formulaire d'inscription joueur (pays, pseudo, nom, tél, niveau, message) | ✅ fait, lié à un compte |
| Profil joueur éditable + statut de candidature (pending/accepted/rejected) | ✅ fait (`AccountPage`) |
| Compte admin + liste des candidatures + changement de statut | ✅ fait (`AdminPage`) |
| Pages vitrine (accueil, concept, règlement, finale, partenaires...) | ✅ fait, **contenu 100% statique** (`src/data.ts`) |
| Liste des pays (16), joueurs, classements de groupes, bracket, planning, contenus, partenaires | ⚠️ **tout est codé en dur dans `data.ts`**, aucune de ces données ne vient de la base |
| Formats RELAIS / BATTLE | ❌ pas modélisés du tout |
| Emails (confirmation, changement de statut) | ❌ pas fait |
| Upload de photo/avatar joueur | ❌ pas fait |

Autrement dit : le squelette compte-joueur/admin-candidatures est solide, mais **tout le reste du site (pays, joueurs qualifiés, résultats, planning, contenus, partenaires) est une maquette figée** — rien n'est piloté depuis la base ni depuis l'admin.

## 3. Partie USER (joueur / public)

### 3.1 Compte joueur — à compléter
- [x] Email de confirmation à l'inscription (Resend)
- [x] Email automatique quand l'admin change le statut (acceptée / refusée)
- [ ] Upload de photo de profil (nécessaire pour les "portraits" — axe média du document)
- [ ] Champ réseaux sociaux (pour les liens vers contenus/portraits)
- [ ] Réinitialisation de mot de passe ("mot de passe oublié")
- [ ] Affichage, une fois accepté, du **groupe de qualification** et du **calendrier des matchs** du joueur (dépend de 3.2)

### 3.2 Pays & qualifications nationales (actuellement statique → à rendre dynamique)
- [x] Table `countries` en base (liste officielle des 16 pays, statut : ouvert / en cours / clos / qualifié)
- [x] `CountriesPage` lit la vraie liste + nombre d'inscrits réel par pays (au lieu du chiffre en dur)
- [x] Groupes de qualification (nombre adaptatif, assignation manuelle) + classement par groupe, alimentés par l'admin
- [x] Bracket national à élimination directe par pays (après la phase de groupes), alimenté par l'admin
- [x] Duo national (2 finalistes) marqué automatiquement (`is_finalist`) quand la finale nationale est jouée, pays passe en statut "qualifié"
- [ ] Page pays publique : liste des joueurs inscrits/qualifiés + groupes/bracket pour ce pays (actuellement admin-only)
- [ ] `PlayersPage` : n'affiche que les joueurs au statut `accepted` (aujourd'hui : liste `players` fictive dans `data.ts`)

### 3.3 Finale panafricaine (32 joueurs)
- [ ] Bracket international 32 joueurs (actuellement `bracketMatches` fictif dans `data.ts`)
- [ ] Planning des 14 jours piloté depuis l'admin (actuellement `schedule` en dur)
- [ ] Pages/sections pour les titres **RELAIS** et **BATTLE** (classement, résultats, vainqueurs, dotations) — *bloqué tant que la mécanique de jeu n'est pas fixée, voir §4*

### 3.4 Contenu & télé-réalité
- [x] `ContentPage` : les articles/vidéos/posts viennent de l'admin plutôt que de `data.ts`
- [x] Lien externe cliquable vers la plateforme de diffusion (TikTok/Instagram, YouTube, Facebook) par contenu
- [ ] Catégorisation plus fine par type (portraits, coulisses, défis, destination, matchs, confessionnal) — actuellement juste article/vidéo/réseaux

### 3.5 Partenaires
- [x] `PartnersPage` alimentée par l'admin (logos, tiers, catégorie) au lieu de la liste `partners` en dur
- [ ] Formulaire "devenir partenaire" → table de leads partenaires (distincte des candidatures joueurs)

### 3.6 Hors périmètre web immédiat (mentionné dans le document mais pas prioritaire)
- Billetterie de la finale physique
- Merchandising
- Programme social "KARRE-X WOMEN" (actuellement une simple section sur `ProjectPage`) — à voir si ça doit devenir un formulaire d'inscription séparé

## 4. Partie ADMIN

### 4.1 Déjà fait
- [x] Auth admin
- [x] Liste des candidatures + changement de statut (pending/accepted/rejected)

### 4.2 Gestion des pays
- [x] CRUD des 16 pays (nom, code, drapeau, statut de qualification)
- [x] Vue "inscriptions par pays" dans l'onglet Pays (qualifiés + total d'inscriptions)

### 4.3 Gestion des qualifications nationales
- [x] Création de groupes par pays (nombre libre, pas figé à 8) à partir des candidatures acceptées
- [x] Assignation manuelle des joueurs aux groupes (choix retenu : pas d'aléatoire)
- [x] Génération automatique des matchs round-robin dès qu'un joueur rejoint un groupe
- [x] Saisie des scores par l'admin (seul habilité, choix retenu) → classement calculé automatiquement (Pts/V/N/D/Diff)
- [x] Sélection manuelle des joueurs (checkbox dans les classements) → génération du bracket national à élimination directe
- [x] Avancement automatique des vainqueurs round par round, gestion des byes si effectif impair
- [x] Les 2 finalistes de la finale nationale marqués automatiquement (`is_finalist`), pays passé en statut "qualifié", visibles dans le nouvel onglet **Finalistes** (récupération pour la phase au Bénin)

### 4.4 Gestion de la finale
- [ ] Bracket international 32 joueurs (saisie des scores, avancement automatique des vainqueurs)
- [ ] Édition du planning des 14 jours (lieu, type de journée, description)
- [ ] Gestion des titres RELAIS et BATTLE (participants, résultats, vainqueurs)

### 4.5 Gestion de contenu (mini-CMS)
- [x] Ajout + suppression des articles/vidéos/posts (`ContentPage`) — pas encore d'édition inline
- [ ] Upload d'images (pour l'instant : URL externe à coller, pas d'upload direct)

### 4.6 Gestion des partenaires
- [x] Ajout + suppression des partenaires (nom, logo, tier) — pas encore d'édition inline
- [ ] Liste des leads reçus via le formulaire "devenir partenaire" (voir 3.5)

### 4.7 Dashboard / indicateurs
Le document liste explicitement des indicateurs à suivre (p.9) — proposition d'un tableau de bord admin reprenant ceux qui sont mesurables depuis le site :
- [x] Inscriptions par pays + évolution sur 14 jours
- [ ] Taux de remplissage par pays (inscrits / 64 max) — actuellement on affiche juste le nombre brut, pas le %
- [x] Répartition par niveau déclaré (amateur/semi-pro/pro)
- [x] Statut des candidatures (pending/accepted/rejected) en un coup d'œil (onglet Dashboard, par défaut à la connexion admin)

### 4.8 Rôles admin (à discuter)
Le document mentionne une équipe projet avec des rôles distincts (direction, production, e-sport, logistique, communication, contenu, partenariat...). Pour l'instant il n'y a qu'un seul rôle `admin` unique.
- [ ] Décider si un seul rôle admin suffit pour le pilote, ou s'il faut des sous-rôles (ex. "gestion contenu" vs "gestion candidatures") dès maintenant

## 5. Décisions à prendre avant de coder certaines parties

Le document liste 10 décisions à verrouiller (p.14). Certaines bloquent directement des choix techniques :

| # | Décision (document) | Impact technique |
|---|---|---|
| 2 | Liste définitive des 16 pays | Bloque la table `countries` — la liste actuelle dans `data.ts` est un exemple, pas la liste officielle |
| 3 | Plateforme de jeu, matériel, règlement sportif | Bloque le modèle de données des matchs (format, durée, tie-break) |
| 4 | ✅ Tranché : nombre de groupes adaptatif (pas figé à 64/8), assignation manuelle par l'admin, saisie des scores admin-only | Codé (voir §4.3) |
| 7 | Dotations RELAIS / BATTLE + mécanique précise du RELAIS | Le document dit lui-même *"mécanique précise à fixer dans le règlement"* — impossible de modéliser RELAIS sans ça |

**Recommandation** : je peux commencer dès maintenant sur les parties qui ne dépendent d'aucune décision en attente (pays dynamiques, gestion de contenu, gestion partenaires, dashboard, emails), et mettre en pause RELAIS/BATTLE + qualifications tant que le règlement sportif n'est pas figé.

## 6. Proposition de priorisation

1. ✅ **Pays dynamiques** (`countries` en base + CRUD admin + pages publiques branchées)
2. ✅ **Emails transactionnels** (confirmation inscription, changement de statut) — via Resend
3. ✅ **Mini-CMS contenu + partenaires** — remplace le contenu statique par du contenu piloté par l'admin
4. ✅ **Dashboard admin** (indicateurs du document)
5. ✅ **Qualifications nationales complètes** (groupes + classements + bracket à élimination directe + récupération automatique des 2 finalistes par pays)
6. **Finale internationale (32 joueurs) + RELAIS/BATTLE** — une fois le règlement sportif figé — prochaine étape

---

Dis-moi par quoi tu veux commencer, ou si tu veux qu'on tranche d'abord les décisions bloquantes du §5.
