/**
 * Film grain overlay. CSS-only — safe to render server-side.
 * Respects prefers-reduced-motion (handled in CSS).
 * Pointer-events disabled so it never blocks interaction.
 */
export function FilmGrain() {
  return <div className="film-grain" aria-hidden="true" />;
}
