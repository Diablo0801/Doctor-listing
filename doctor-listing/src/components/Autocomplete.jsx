import React, { useState, useEffect } from 'react';

export default function Autocomplete({ value, doctors, onChange, onSelect }) {
  const [suggestions, setSug] = useState([]);

  useEffect(() => {
    if (!value) return setSug([]);
    const q = value.toLowerCase();
    setSug(doctors.filter(d => d.name.toLowerCase().includes(q)).slice(0,3));
  }, [value, doctors]);

  return (
    <div className="autocomplete">
      <input
        data-testid="autocomplete-input"
        className="autocomplete-input"
        value={value}
        onChange={e => onChange(e.target.value)}
        onKeyDown={e => {
          if (e.key==='Enter' && suggestions[0]) {
            onSelect(suggestions[0].name);
            setSug([]);
          }
        }}
        placeholder="Search doctors..."
      />
      {suggestions.length > 0 && (
        <ul className="suggestions-list">
          {suggestions.map(d => (
            <li
              key={d.id}
              data-testid="suggestion-item"
              className="suggestion-item"
              onClick={() => { onSelect(d.name); setSug([]); }}
            >
              {d.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
