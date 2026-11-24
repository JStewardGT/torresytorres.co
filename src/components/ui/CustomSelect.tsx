import React, { useState, useRef, useEffect, useId } from 'react';
import { ChevronDown, Check } from 'lucide-react';

export interface SelectOption {
  value: string;
  label: string;
  badge?: string;
}

interface CustomSelectProps {
  id?: string;
  name?: string;
  options: SelectOption[];
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  placeholder?: string;
  className?: string;
}

export default function CustomSelect({
  id,
  name,
  options,
  value,
  onChange,
  required = false,
  placeholder = 'Seleccione un área de práctica...',
  className = '',
}: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const listboxRef = useRef<HTMLUListElement>(null);
  const generatedId = useId();
  const selectId = id || generatedId;

  const selectedOption = options.find((opt) => opt.value === value);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent | TouchEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isOpen]);

  // Handle native wheel scrolling & ensure Lenis does not block listbox scroll
  useEffect(() => {
    const listbox = listboxRef.current;
    if (!isOpen || !listbox) return;

    const handleWheel = (e: WheelEvent) => {
      e.stopPropagation();
      listbox.scrollTop += e.deltaY;
    };

    listbox.addEventListener('wheel', handleWheel, { passive: false });

    // Scroll active item into view on open
    const selectedEl = listbox.querySelector('[aria-selected="true"]');
    if (selectedEl) {
      (selectedEl as HTMLElement).scrollIntoView({ block: 'nearest' });
    }

    return () => {
      listbox.removeEventListener('wheel', handleWheel);
    };
  }, [isOpen]);

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsOpen(false);
      return;
    }

    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setIsOpen((prev) => !prev);
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (!isOpen) {
        setIsOpen(true);
        return;
      }
      const currentIndex = options.findIndex((opt) => opt.value === value);
      const nextIndex = (currentIndex + 1) % options.length;
      onChange(options[nextIndex].value);
    }

    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (!isOpen) {
        setIsOpen(true);
        return;
      }
      const currentIndex = options.findIndex((opt) => opt.value === value);
      const prevIndex = (currentIndex - 1 + options.length) % options.length;
      onChange(options[prevIndex].value);
    }
  };

  const handleSelect = (val: string) => {
    onChange(val);
    setIsOpen(false);
  };

  return (
    <div ref={containerRef} className={`relative w-full ${className}`}>
      {/* Hidden native input for form compatibility & validation */}
      <input
        type="hidden"
        name={name}
        value={value}
        required={required}
      />

      {/* Custom Trigger Button - Clean single line with full title visibility */}
      <button
        type="button"
        id={selectId}
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={`${selectId}-listbox`}
        onClick={() => setIsOpen((prev) => !prev)}
        onKeyDown={handleKeyDown}
        className={`w-full px-4 py-3 rounded-xl bg-primary-dark/90 border text-left text-xs sm:text-sm font-sans flex items-center justify-between transition-colors cursor-pointer focus:outline-none ${
          isOpen
            ? 'border-accent-gold shadow-glow-gold/20'
            : 'border-accent-ice/15 hover:border-accent-ice/30'
        }`}
      >
        <span className="truncate pr-3 text-primary-light font-normal text-xs sm:text-sm">
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown
          className={`w-4 h-4 text-accent-ice/60 shrink-0 transition-transform duration-300 ${
            isOpen ? 'rotate-180 text-accent-gold' : ''
          }`}
        />
      </button>

      {/* Luxury Styled Dropdown Menu - Stacked 2-line layout for full readability */}
      {isOpen && (
        <ul
          id={`${selectId}-listbox`}
          ref={listboxRef}
          role="listbox"
          tabIndex={-1}
          data-lenis-prevent
          data-lenis-prevent-wheel
          data-lenis-prevent-touch
          style={{
            scrollbarWidth: 'thin',
            scrollbarColor: 'rgba(200, 169, 107, 0.4) transparent',
          }}
          onWheel={(e) => {
            e.stopPropagation();
          }}
          className="absolute z-50 left-0 right-0 mt-2 rounded-2xl bg-[#0D1C39] border border-accent-ice/25 p-2 shadow-2xl backdrop-blur-xl max-h-72 overflow-y-auto overscroll-contain space-y-1.5 animate-in fade-in slide-in-from-top-2 duration-200"
        >
          {options.map((option) => {
            const isSelected = option.value === value;
            return (
              <li
                key={option.value}
                role="option"
                aria-selected={isSelected}
                onClick={() => handleSelect(option.value)}
                className={`px-3.5 py-2.5 rounded-xl cursor-pointer text-left transition-all flex items-center justify-between ${
                  isSelected
                    ? 'bg-accent-ice/15 border border-accent-gold/40 text-primary-light'
                    : 'hover:bg-primary-dark/80 text-accent-ice/85 border border-transparent'
                }`}
              >
                <div className="flex flex-col flex-1 min-w-0 pr-3">
                  <span
                    className={`text-xs sm:text-sm leading-snug ${
                      isSelected
                        ? 'font-semibold text-accent-gold'
                        : 'font-medium text-primary-light'
                    }`}
                  >
                    {option.label}
                  </span>
                  {option.badge && (
                    <span className="text-[11px] font-mono text-accent-ice/60 tracking-wider mt-0.5">
                      {option.badge}
                    </span>
                  )}
                </div>
                {isSelected && (
                  <Check className="w-4 h-4 text-accent-gold shrink-0 ml-2" />
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
