export function formatDate(date: string) {
  const timeZoneOffset = new Date(date).getTimezoneOffset() / 60;

  return new Date(
    new Date(date).setHours(new Date(date).getHours() + timeZoneOffset),
  ).toLocaleString();
}
