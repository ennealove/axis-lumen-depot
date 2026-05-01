export const $ = (s) => document.querySelector(s);
export const $$ = (s) => Array.from(document.querySelectorAll(s)); export function escapeHtml(value) { return String(value) .replaceAll('&', '&amp;') .replaceAll('<', '&lt;') .replaceAll('>', '&gt;') .replaceAll('"', '&quot;') .replaceAll("'", '&#39;'); }
