export interface BracketSeed {
  round: number;
  slot: number;
  player1_id: number | null;
  player2_id: number | null;
  winner_id: number | null;
}

/**
 * Builds a single-elimination bracket from an ordered list of player ids.
 * Pads to the next power of 2 with byes (null). A bye is resolved immediately
 * (winner = the real player), and that resolution cascades into later rounds
 * at generation time — only "real" matches (both sides filled, no winner yet)
 * are left for the admin to score.
 */
export function generateBracketSeeds(playerIds: (number | null)[]): BracketSeed[] {
  let size = 1;
  while (size < playerIds.length) size *= 2;
  const padded: (number | null)[] = [...playerIds];
  while (padded.length < size) padded.push(null);

  const seeds: BracketSeed[] = [];
  let currentRound = padded;
  let round = 1;

  while (currentRound.length > 1) {
    const nextRound: (number | null)[] = [];
    for (let slot = 0; slot < currentRound.length / 2; slot++) {
      const p1 = currentRound[slot * 2];
      const p2 = currentRound[slot * 2 + 1];
      let winner: number | null = null;
      if (p1 !== null && p2 === null) winner = p1;
      else if (p2 !== null && p1 === null) winner = p2;
      seeds.push({ round, slot, player1_id: p1, player2_id: p2, winner_id: winner });
      nextRound.push(winner);
    }
    currentRound = nextRound;
    round += 1;
  }

  return seeds;
}
