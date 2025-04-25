import React from 'react';

export default function Header({ value, onChange, onKeyDown }) {
  return (
    <header className="header">
      <div className="search-container">
        <input
          data-testid="autocomplete-input"
          type="text"
          className="search-input"
          value={value}
          onChange={e => onChange(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder="Search Symptoms, Doctors, Specialists, Clinics"
        />
        <span className="search-icon">🔍</span>
      </div>
    </header>
  );
}
