// src/components/FilterPanel.jsx
import React, { useState } from 'react';

const SPECIALTIES = [
  "General Physician","Dentist","Dermatologist","Paediatrician","Gynaecologist",
  "ENT","Diabetologist","Cardiologist","Physiotherapist","Endocrinologist",
  "Orthopaedic","Ophthalmologist","Gastroenterologist","Pulmonologist",
  "Psychiatrist","Urologist","Dietitian/Nutritionist","Psychologist",
  "Sexologist","Nephrologist","Neurologist","Oncologist","Ayurveda","Homeopath"
];

export default function FilterPanel({ filters, onChange, onClear }) {
  const [openSort, setOpenSort] = useState(true);
  const [openFilters, setOpenFilters] = useState(true);
  const [specSearch, setSpecSearch] = useState('');

  const visibleSpecs = SPECIALTIES.filter(s =>
    s.toLowerCase().includes(specSearch.toLowerCase())
  );

  return (
    <>
      {/* Sort Panel */}
      <div className="panel">
        <div className="panel-header" onClick={()=>setOpenSort(o=>!o)}>
          <span>Sort by</span>
          <span className="toggle">{openSort ? '▲' : '▼'}</span>
        </div>
        {openSort && (
          <div className="panel-body">
            <label>
              <input
                data-testid="sort-fees"
                type="radio" name="sort"
                checked={filters.sort==='fees'}
                onChange={()=> onChange(f=>({...f, sort:'fees'}))}
              />
              Price: Low-High
            </label>
            <label>
              <input
                data-testid="sort-experience"
                type="radio" name="sort"
                checked={filters.sort==='experience'}
                onChange={()=> onChange(f=>({...f, sort:'experience'}))}
              />
              Experience: Most Experience first
            </label>
          </div>
        )}
      </div>

      {/* Filters Panel */}
      <div className="panel">
        <div className="panel-header">
          <span>Filters</span>
          <button
            className="clear-all"
            onClick={onClear}
          >Clear All</button>
        </div>
        {openFilters && (
          <div className="panel-body">
            {/* Specialities */}
            <div className="filter-group">
              <div className="filter-title" data-testid="filter-header-speciality">
                Specialities
              </div>
              <input
                type="text"
                className="filter-search"
                placeholder="Search..."
                value={specSearch}
                onChange={e=>setSpecSearch(e.target.value)}
              />
              {visibleSpecs.map(spec => (
                <label key={spec}>
                  <input
                    data-testid={'filter-specialty-'+spec.replace(/\s|\/+/g,'-')}
                    type="checkbox"
                    checked={filters.specialties.includes(spec)}
                    onChange={()=>{
                      const next = filters.specialties.includes(spec)
                        ? filters.specialties.filter(s=>s!==spec)
                        : [...filters.specialties, spec];
                      onChange(f=>({...f, specialties: next}));
                    }}
                  />
                  {spec}
                </label>
              ))}
            </div>

            {/* Consultation Mode */}
            <div className="filter-group">
              <div className="filter-title" data-testid="filter-header-moc">
                Mode of consultation
              </div>
              <label>
                <input
                  data-testid="filter-video-consult"
                  type="radio" name="moc"
                  checked={filters.consultation==='Video Consult'}
                  onChange={()=>onChange(f=>({...f, consultation:'Video Consult'}))}
                />
                Video Consultation
              </label>
              <label>
                <input
                  data-testid="filter-in-clinic"
                  type="radio" name="moc"
                  checked={filters.consultation==='In Clinic'}
                  onChange={()=>onChange(f=>({...f, consultation:'In Clinic'}))}
                />
                In‐clinic Consultation
              </label>
              <label>
                <input
                  type="radio" name="moc"
                  checked={filters.consultation==='' }
                  onChange={()=>onChange(f=>({...f, consultation:''}))}
                />
                All
              </label>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
