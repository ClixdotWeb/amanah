import { Clock, Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import { site } from '../data/site';
import { classNames } from '../utils/format';

const soon = <span className="soon">Coming soon</span>;

/** Contact details from site.js. Unconfirmed details show "Coming soon" rather than invented values. */
export function ContactList({ compact = false }) {
  const { email, phone, whatsapp, address, hours } = site.contact;
  const rows = [
    { icon: Mail, label: 'Email', value: email && <a href={`mailto:${email}`}>{email}</a> },
    { icon: Phone, label: 'Phone', value: phone && <a href={`tel:${phone.replace(/\s/g, '')}`}>{phone}</a> },
    {
      icon: MessageCircle,
      label: 'WhatsApp',
      value: whatsapp && (
        <a href={`https://wa.me/${whatsapp}`} target="_blank" rel="noreferrer">
          Chat with us
        </a>
      ),
    },
    { icon: MapPin, label: 'Boutique', value: address },
  ];
  if (!compact) rows.push({ icon: Clock, label: 'Hours', value: hours });

  return (
    <ul className={classNames('contact-list', compact && 'contact-list--compact')}>
      {rows.map(({ icon: Icon, label, value }) => (
        <li key={label}>
          <Icon size={compact ? 15 : 18} strokeWidth={1.2} aria-hidden="true" />
          <span>
            <span className="contact-list__label">{label}</span>
            <span className="contact-list__value">{value || soon}</span>
          </span>
        </li>
      ))}
    </ul>
  );
}

export function whatsappUrl(message) {
  if (!site.contact.whatsapp) return null;
  return `https://wa.me/${site.contact.whatsapp}${message ? `?text=${encodeURIComponent(message)}` : ''}`;
}
