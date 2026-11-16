import { useState } from 'react';
import { ArrowRight, Loader2 } from 'lucide-react';
import { subscribeNewsletter, NotConfiguredError } from '../utils/api';
import { classNames, isValidEmail } from '../utils/format';

/** Email sign-up. Reports honestly when no newsletter service is connected yet. */
export default function NewsletterForm({ variant = 'light', id = 'newsletter' }) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState({ state: 'idle', message: '' });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!isValidEmail(email)) {
      setStatus({ state: 'error', message: 'Please enter a valid email address.' });
      return;
    }
    setStatus({ state: 'loading', message: '' });
    try {
      await subscribeNewsletter(email.trim());
      setStatus({ state: 'success', message: 'Thank you. You are now on the Amanah list.' });
      setEmail('');
    } catch (err) {
      if (err instanceof NotConfiguredError) {
        setStatus({ state: 'info', message: 'Newsletter sign-up opens soon. Your email has not been stored.' });
      } else {
        setStatus({ state: 'error', message: err.message || 'Something went wrong. Please try again.' });
      }
    }
  };

  return (
    <form className={classNames('nl-form', `nl-form--${variant}`)} onSubmit={onSubmit} noValidate>
      <label htmlFor={id} className="sr-only">
        Email address
      </label>
      <div className="nl-form__row">
        <input
          id={id}
          type="email"
          inputMode="email"
          autoComplete="email"
          placeholder="Your email address"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (status.state === 'error') setStatus({ state: 'idle', message: '' });
          }}
          aria-invalid={status.state === 'error'}
          aria-describedby={`${id}-msg`}
        />
        <button type="submit" disabled={status.state === 'loading'} aria-label="Subscribe">
          {status.state === 'loading' ? <Loader2 size={18} className="spin" /> : variant === 'pill' ? <span className="nl-form__label">Subscribe <ArrowRight size={15} strokeWidth={1.4} /></span> : <ArrowRight size={18} strokeWidth={1.3} />}
        </button>
      </div>
      <p id={`${id}-msg`} className={classNames('nl-form__msg', `is-${status.state}`)} role="status">
        {status.message}
      </p>
    </form>
  );
}
