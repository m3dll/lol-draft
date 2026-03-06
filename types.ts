export enum Role {
  TOP = 'Top',
  JUNGLE = 'Jungle',
  MID = 'Mid',
  ADC = 'ADC',
  SUPPORT = 'Support'
}

export interface Player {
  id: string;
  name: string;
  role?: Role;
  champion?: string;
}

export interface TeamMatchup {
  blueTeam: Player[];
  redTeam: Player[];
}

export interface Duel1v1Matchup {
  player1: Player;
  player2: Player;
}

export interface Duel2v2Matchup {
  blueTeam: Player[]; // 2 players
  redTeam: Player[]; // 2 players
}
