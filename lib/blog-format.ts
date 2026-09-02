const MONTHS = [
  "JAN",
  "FEB",
  "MAR",
  "APR",
  "MAY",
  "JUN",
  "JUL",
  "AUG",
  "SEP",
  "OCT",
  "NOV",
  "DEC",
] as const;

export function formatBlogDate(date: string): string {
  const [year, month, day] = date.split("-");
  const monthIndex = Number(month) - 1;
  if (!year || monthIndex < 0 || monthIndex > 11 || !day) return date;
  return `${MONTHS[monthIndex]} ${Number(day)}, ${year}`;
}

export function formatArticleNumber(index: number, total?: number): string {
  const num = String(index + 1).padStart(2, "0");
  if (total !== undefined) {
    return `${num} / ${String(total).padStart(2, "0")}`;
  }
  return num;
}

export function formatMetaLine(parts: string[]): string {
  return parts.filter(Boolean).join("  ·  ");
}
