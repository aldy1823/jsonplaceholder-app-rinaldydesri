export function highlightRerum(text) {
  return text.replace(/(rerum)/gi, '<mark class="bg-yellow-200">$1</mark>');
}
