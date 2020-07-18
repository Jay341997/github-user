export const formatDate = (date: string) => {
  const purchaseTime = new Date(date);
  const formatter = new Intl.DateTimeFormat("en-us", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: false
  });
  const dateParts = formatter.formatToParts(purchaseTime);

  return `${dateParts[4].value} ${dateParts[2].value.substring(0, 3)} ${dateParts[6].value}`;
};