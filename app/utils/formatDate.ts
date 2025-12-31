export const formatDate = (dateString: string, lang: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString(lang === "uk" ? "uk-UA" : "ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};