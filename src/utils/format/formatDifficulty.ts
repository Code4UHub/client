const DIFFICULTIES = {
  EASY: 'Fácil',
  MEDIUM: 'Media',
  HARD: 'Difícil',
};

export function formatDifficulty(difficulty: 1 | 2 | 3) {
  switch (difficulty) {
    case 1:
      return DIFFICULTIES.EASY;
    case 2:
      return DIFFICULTIES.MEDIUM;
    default:
      return DIFFICULTIES.HARD;
  }
}
