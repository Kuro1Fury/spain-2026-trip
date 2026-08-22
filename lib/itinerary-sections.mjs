export function extractSection(markdown, startPrefix, endPrefix) {
  const lines = markdown.split("\n");
  const startIndex = lines.findIndex((line) => line.startsWith(startPrefix));
  if (startIndex < 0) return "";

  const relativeEnd = endPrefix
    ? lines.slice(startIndex + 1).findIndex((line) => line.startsWith(endPrefix))
    : -1;
  const endIndex = relativeEnd < 0 ? lines.length : startIndex + 1 + relativeEnd;

  return lines.slice(startIndex, endIndex).join("\n").trim();
}
