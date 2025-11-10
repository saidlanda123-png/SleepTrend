import React from 'react';

export type ChallengeDifficulty = 'Fácil' | 'Intermedio' | 'Difícil';

export interface Challenge {
  id: string;
  title: string;
  description: string;
  icon: React.FC<{ className?: string }>;
  badgeTitle: string;
  badgeColor: string;
  badgeAchievement: string;
  difficulty: ChallengeDifficulty;
}

export interface Rank {
  name: string;
  color: string;
  threshold: number;
}