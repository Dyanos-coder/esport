export interface MatchRow {
  id: number;
  player1_id: number;
  player2_id: number;
  score1: number | null;
  score2: number | null;
}

export interface StandingRow {
  id: number;
  pseudo: string;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  gf: number;
  ga: number;
  pts: number;
}

export function computeStandings(players: { id: number; pseudo: string }[], matches: MatchRow[]): StandingRow[] {
  const table = new Map<number, StandingRow>(
    players.map((p) => [p.id, { id: p.id, pseudo: p.pseudo, played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, pts: 0 }]),
  );

  for (const m of matches) {
    if (m.score1 == null || m.score2 == null) continue;
    const p1 = table.get(m.player1_id);
    const p2 = table.get(m.player2_id);
    if (!p1 || !p2) continue;

    p1.played += 1;
    p2.played += 1;
    p1.gf += m.score1;
    p1.ga += m.score2;
    p2.gf += m.score2;
    p2.ga += m.score1;

    if (m.score1 > m.score2) {
      p1.won += 1;
      p1.pts += 3;
      p2.lost += 1;
    } else if (m.score1 < m.score2) {
      p2.won += 1;
      p2.pts += 3;
      p1.lost += 1;
    } else {
      p1.drawn += 1;
      p2.drawn += 1;
      p1.pts += 1;
      p2.pts += 1;
    }
  }

  return [...table.values()].sort((a, b) => b.pts - a.pts || (b.gf - b.ga) - (a.gf - a.ga) || b.gf - a.gf);
}
