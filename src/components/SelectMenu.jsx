import { useEffect, useId, useRef, useState } from 'react';
import { Check, ChevronDown } from 'lucide-react';
import { classNames } from '../utils/format';

/**
 * Custom dropdown in brand styling (replaces the native <select>, whose open
 * list can't be styled). Keyboard: Enter/Space/Arrows open, Arrows move,
 * Enter selects, Escape or Tab closes.
 */
export default function SelectMenu({ label, value, options, onChange, className }) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const rootRef = useRef(null);
  const buttonRef = useRef(null);
  const listRef = useRef(null);
  const id = useId();
  const current = options.find((o) => o.id === value) ?? options[0];

  // Close on outside click.
  useEffect(() => {
    if (!open) return undefined;
    const onDown = (e) => {
      if (!rootRef.current?.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', onDown);
    return () => document.removeEventListener('mousedown', onDown);
  }, [open]);

  useEffect(() => {
    if (open) {
      setActive(Math.max(0, options.findIndex((o) => o.id === value)));
      listRef.current?.focus();
    }
  }, [open]); // eslint-disable-line react-hooks/exhaustive-deps

  const choose = (opt) => {
    onChange(opt.id);
    setOpen(false);
    buttonRef.current?.focus();
  };

  const onButtonKey = (e) => {
    if (['ArrowDown', 'ArrowUp', 'Enter', ' '].includes(e.key)) {
      e.preventDefault();
      setOpen(true);
    }
  };

  const onListKey = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActive((a) => Math.min(options.length - 1, a + 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActive((a) => Math.max(0, a - 1));
    } else if (e.key === 'Home') {
      e.preventDefault();
      setActive(0);
    } else if (e.key === 'End') {
      e.preventDefault();
      setActive(options.length - 1);
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      choose(options[active]);
    } else if (e.key === 'Escape') {
      e.preventDefault();
      setOpen(false);
      buttonRef.current?.focus();
    } else if (e.key === 'Tab') {
      setOpen(false);
    }
  };

  return (
    <div className={classNames('selectmenu', open && 'is-open', className)} ref={rootRef}>
      {label && (
        <span className="selectmenu__label" id={`${id}-label`}>
          {label}
        </span>
      )}
      <button
        type="button"
        ref={buttonRef}
        className="selectmenu__button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-labelledby={label ? `${id}-label ${id}-value` : undefined}
        onClick={() => setOpen((o) => !o)}
        onKeyDown={onButtonKey}
      >
        <span id={`${id}-value`}>{current.label}</span>
        <ChevronDown size={16} strokeWidth={1.4} className="selectmenu__chev" />
      </button>

      {open && (
        <ul
          ref={listRef}
          className="selectmenu__list"
          role="listbox"
          tabIndex={-1}
          aria-labelledby={label ? `${id}-label` : undefined}
          aria-activedescendant={`${id}-opt-${active}`}
          onKeyDown={onListKey}
        >
          {options.map((o, i) => {
            const selected = o.id === value;
            return (
              <li
                key={o.id}
                id={`${id}-opt-${i}`}
                role="option"
                aria-selected={selected}
                className={classNames('selectmenu__option', i === active && 'is-active', selected && 'is-selected')}
                onMouseEnter={() => setActive(i)}
                onClick={() => choose(o)}
              >
                <span>{o.label}</span>
                {selected && <Check size={15} strokeWidth={1.6} />}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
