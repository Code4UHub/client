import { Leaderboard } from 'types/GroupGraph/GroupGraphType';

export const arrangeLeaderboard = (
  completeLeadeboard: Leaderboard[],
  studentId: string
) => {
  const foundIndex = completeLeadeboard.findIndex(
    ({ student }) => student === studentId
  );

  if (foundIndex === -1) {
    return {
      podium: [],
      position: [],
    };
  }

  // Student is in podium
  if (foundIndex <= 3) {
    const podium = completeLeadeboard.filter((_, i) => i <= 4);
    const position: Leaderboard[] = [];
    return {
      podium,
      position,
    };
  }
  const isNeighbor = (index: number) =>
    index === foundIndex - 1 || index === foundIndex + 1;
  // Student is not in podium
  const podium = completeLeadeboard.filter((_, i) => i <= 2);
  const position = completeLeadeboard.filter(
    (_, i) => isNeighbor(i) || i === foundIndex
  );
  return {
    podium,
    position,
  };
};

/* 
LOGIC BEHIND arrangeLeaderboard

Case student is podium
    Present podium and next 2 students
    Congrats message for being on podium

Case student is 4th
Since student abode is in the podium, display this student in the podium section
    PODIUM
        First
        Second
        Third
        Fourth (YOU!)
        Fifth

Case student is 5th or below
There is a distinction between the podium snd your position
    PODIUM
        First
        Second
        Third
    YOUR POSITION
        Forth
        Fifth (YOU!)
        Sixth

    PODIUM
        First
        Second
        Third
    YOUR POSITION
        Seventh
        Eigth (YOU!)
        Nineth

*/
