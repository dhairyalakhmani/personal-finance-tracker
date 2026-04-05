import { useState, useEffect, useRef } from 'react';
import { FiChevronDown } from 'react-icons/fi';

// eslint-disable-next-line react-refresh/only-export-components
export const getFlagEmoji = (currencyCode) => {
  if (!currencyCode || typeof currencyCode !== 'string' || currencyCode.length < 2) {
    return '🏳️';
  }
  
  const specialCases = { EUR: 'EU', XOF: 'SN', XAF: 'CM', XCD: 'AG', XPF: 'PF', BTC: 'UN' };
  let countryCode = specialCases[currencyCode] || currencyCode.substring(0, 2);

  if (!/^[a-zA-Z]{2}$/.test(countryCode)) {
    return '🏳️';
  }

  return countryCode
    .toUpperCase()
    .split('')
    .map(char => String.fromCodePoint(char.charCodeAt(0) + 127397))
    .join('');
};

export default function CurrencyDropdown({ label, value, onChange, options }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedOption = options.find(opt => opt[0] === value) || [value, value];

  return (
    <div className="relative" ref={dropdownRef}>
      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">{label}</label>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-3 py-2.5 bg-gray-50 dark:bg-slate-800/50 border border-gray-200 dark:border-navy-border rounded-lg focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 transition-all dark:text-slate-100"
      >
        <span className="truncate">
          {getFlagEmoji(selectedOption[0])} {selectedOption[0]} - {selectedOption[1]}
        </span>
        <FiChevronDown className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <ul className="absolute z-10 w-full mt-1 bg-white dark:bg-slate-800 border border-gray-200 dark:border-navy-border rounded-lg shadow-xl max-h-48 overflow-y-auto custom-scrollbar animate-fade-in">
          {options.map(([code, name]) => (
            <li
              key={code}
              onClick={() => {
                onChange(code);
                setIsOpen(false);
              }}
              className="px-3 py-2 text-sm hover:bg-indigo-50 dark:hover:bg-slate-700 cursor-pointer text-slate-700 dark:text-slate-200 transition-colors"
            >
              {getFlagEmoji(code)} {code} - {name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}