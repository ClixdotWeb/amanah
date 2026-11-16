import { site } from '../data/site';
import { classNames } from '../utils/format';

const icons = {
  instagram: (
    <>
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="0.6" fill="currentColor" />
    </>
  ),
  facebook: <path d="M14.5 8.5h2V5h-2.4C11.6 5 10.5 6.5 10.5 8.8V11H8v3.3h2.5V21h3.4v-6.7h2.4l.4-3.3h-2.8V9.3c0-.5.3-.8.6-.8Z" />,
  pinterest: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M11 9.5c.4-1.2 2.6-1.6 3.6-.4.9 1.1.4 3.6-1.4 4-1 .2-1.7-.4-1.7-.4L10 20" />
    </>
  ),
  youtube: (
    <>
      <rect x="3" y="6" width="18" height="12" rx="3.5" />
      <path d="M10.5 9.5v5l4-2.5-4-2.5Z" fill="currentColor" />
    </>
  ),
};

const names = { instagram: 'Instagram', facebook: 'Facebook', pinterest: 'Pinterest', youtube: 'YouTube' };

/** Networks with no URL in site.js render as dimmed "coming soon" marks, never dead links. */
export default function SocialLinks({ className, variant = 'light' }) {
  return (
    <ul className={classNames('social', `social--${variant}`, className)}>
      {Object.keys(icons).map((key) => {
        const url = site.social[key];
        const svg = (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            {icons[key]}
          </svg>
        );
        return (
          <li key={key}>
            {url ? (
              <a href={url} target="_blank" rel="noreferrer" aria-label={names[key]} className="social__item">
                {svg}
              </a>
            ) : (
              <span className="social__item is-disabled" title={`${names[key]}: coming soon`} role="img" aria-label={`${names[key]}, coming soon`}>
                {svg}
              </span>
            )}
          </li>
        );
      })}
    </ul>
  );
}
