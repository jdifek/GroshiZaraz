export function stripHtml(html: string, maxLength = 180) {
  if (!html) return "";

  const text = html.replace(/<[^>]*>/g, "").trim();

  return text.length > maxLength
    ? text.slice(0, maxLength) + "…"
    : text;
}
