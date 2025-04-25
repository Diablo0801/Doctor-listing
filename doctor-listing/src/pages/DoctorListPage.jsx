// src/pages/DoctorListPage.jsx
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Header from '../components/Header';
import FilterPanel from '../components/Filterpanel';
import DoctorCard from '../components/DoctorCard';
import { applyFilters } from '../utils/filterUtils';

export default function DoctorListPage() {
  const [allDoctors, setAllDoctors] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [filters, setFilters] = useState({
    name: '',
    consultation: '',
    specialties: [],
    sort: '',
  });
  const [searchParams, setSearchParams] = useSearchParams();

  // 1. Fetch data once
  useEffect(() => {
    fetch('https://srijandubey.github.io/campus-api-mock/SRM-C1-25.json')
      .then(r => r.json())
      .then(data => setAllDoctors(data));
  }, []);

  // 2. On mount (or back/forward), read URL → filters
  useEffect(() => {
    const params = Object.fromEntries([...searchParams]);
    setFilters({
      name: params.name || '',
      consultation: params.consultation || '',
      specialties: params.specialties ? params.specialties.split(',') : [],
      sort: params.sort || '',
    });
  }, []);

  // 3. Apply filters whenever data or filters change, then sync URL
  useEffect(() => {
    setFiltered(applyFilters(allDoctors, filters));

    const qp = {};
    if (filters.name) qp.name = filters.name;
    if (filters.consultation) qp.consultation = filters.consultation;
    if (filters.specialties.length) qp.specialties = filters.specialties.join(',');
    if (filters.sort) qp.sort = filters.sort;
    setSearchParams(qp, { replace: true });
  }, [allDoctors, filters]);

  // 4. Clear All handler
  const handleClearAll = () => {
    setFilters({ name: '', consultation: '', specialties: [], sort: '' });
  };

  return (
    <>
      {/* HEADER WITH SEARCH */}
      <Header
        value={filters.name}
        onChange={name => setFilters(f => ({ ...f, name }))}
        onKeyDown={e => {
          if (e.key === 'Enter') setFilters(f => ({ ...f, name: filters.name }));
        }}
      />

      <div className="layout">
        {/* SIDEBAR WITH SORT & FILTERS */}
        <aside className="sidebar">
          <FilterPanel
            filters={filters}
            onChange={setFilters}
            onClear={handleClearAll}
          />
        </aside>

        {/* MAIN CONTENT: DOCTOR CARDS */}
        <main className="content">
          {filtered.map(doctor => (
            <DoctorCard key={doctor.id} doctor={doctor} />
          ))}
        </main>
      </div>
    </>
  );
}
