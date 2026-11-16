// Thin line drawings shown on image placeholders.
const paths = {
  ring: (
    <>
      <circle cx="50" cy="60" r="22" />
      <circle cx="50" cy="60" r="18.5" />
      <path d="M43 39 L50 29 L57 39 L50 44 Z" />
      <path d="M43 39 H57" />
    </>
  ),
  necklace: (
    <>
      <path d="M18 18 C 22 62, 78 62, 82 18" />
      <path d="M23 19 C 28 55, 72 55, 77 19" />
      <path d="M50 54 V60" />
      <path d="M50 60 L57 69 L50 81 L43 69 Z" />
    </>
  ),
  pendant: (
    <>
      <path d="M30 14 L50 46 L70 14" />
      <circle cx="50" cy="50" r="3.5" />
      <path d="M50 54 C 38 64, 40 80, 50 84 C 60 80, 62 64, 50 54 Z" />
    </>
  ),
  earrings: (
    <>
      <path d="M33 22 a6 6 0 1 1 6 6 v9" />
      <circle cx="39" cy="40" r="3" />
      <path d="M39 43 C 30 56, 32 70, 39 72 C 46 70, 48 56, 39 43 Z" />
      <path d="M61 22 a6 6 0 1 1 6 6 v9" />
      <circle cx="67" cy="40" r="3" />
      <path d="M67 43 C 58 56, 60 70, 67 72 C 74 70, 76 56, 67 43 Z" />
    </>
  ),
  bracelet: (
    <>
      <ellipse cx="50" cy="56" rx="32" ry="15" />
      <ellipse cx="50" cy="56" rx="27.5" ry="11" />
      <circle cx="50" cy="71" r="3" />
      <circle cx="30" cy="67.5" r="2.4" />
      <circle cx="70" cy="67.5" r="2.4" />
    </>
  ),
  designer: (
    <>
      <path d="M26 74 C 26 34, 74 34, 74 74" />
      <path d="M32 74 C 32 42, 68 42, 68 74" />
      <path d="M50 22 L58 32 L50 42 L42 32 Z" />
      <path d="M42 32 H58" />
    </>
  ),
  monogram: (
    <>
      <circle cx="50" cy="50" r="34" />
      <circle cx="50" cy="50" r="30" />
      <path d="M36 68 L50 30 L64 68" />
      <path d="M41.5 55 H58.5" />
    </>
  ),
};

export default function Motif({ name = 'monogram', className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 100 100"
      fill="none"
      stroke="currentColor"
      strokeWidth="0.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name] ?? paths.monogram}
    </svg>
  );
}
