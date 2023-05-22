export function formatDate(date: Date) {
  const day = new Intl.DateTimeFormat('es-ES', { weekday: 'long' }).format(
    date
  );

  const capitalDay = day.charAt(0).toUpperCase() + day.slice(1);

  const month = new Intl.DateTimeFormat('es-ES', { month: 'long' }).format(
    date
  );

  const dayNumber = date.getDate();

  return `${capitalDay}, ${dayNumber} de ${month}`;
}
