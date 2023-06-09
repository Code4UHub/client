export function formatPoints(points: number) {
  const numberString = points.toString();
  const regex = /\B(?=(\d{3})+(?!\d))/g;
  return numberString.replace(regex, ',');
}
