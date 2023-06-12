import { LeaderboardList } from 'types/Leaderboard/Leaderboard';

export function formatStudentLeaderboard(
  leaderboardList: LeaderboardList,
  student_id: string
) {
  const studentIndex = leaderboardList.findIndex(
    (position) => position.student === student_id
  );

  if (studentIndex !== -1) {
    let up = 0;

    if (studentIndex - 1 >= 0) {
      up =
        leaderboardList[studentIndex - 1].score -
        leaderboardList[studentIndex].score;
    }

    let down = 0;
    if (studentIndex + 1 < leaderboardList.length) {
      down =
        leaderboardList[studentIndex].score -
        leaderboardList[studentIndex + 1].score;
    }

    return {
      up,
      down,
      position: leaderboardList[studentIndex].position,
      score: leaderboardList[studentIndex].score,
    };
  }

  return undefined;
}
