export function formatDate(fullDateString: string) {
  const [yearString, monthString, dateString] = fullDateString.split('-');

  const date = new Date();
  date.setFullYear(Number(yearString));
  date.setMonth(Number(monthString) - 1);
  date.setDate(Number(dateString));

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

export function formatDateString(date: Date) {
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
}
