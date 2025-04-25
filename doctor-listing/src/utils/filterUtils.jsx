// src/utils/filterUtils.js

/**
 * Filters and sorts an array of doctor objects according to the given criteria.
 *
 * @param {Array} doctors      - Array of doctor objects fetched from the API.
 * @param {Object} filters     - An object with:
 *   name: string,
 *   consultation: string,
 *   specialties: string[],
 *   sort: 'fees'|'experience'
 * @returns {Array}
 */
export function applyFilters(doctors, { name, consultation, specialties, sort }) {
    let res = [...doctors];
  
    // 1) Filter by name substring
    if (name) {
      const q = name.toLowerCase();
      res = res.filter(d => d.name.toLowerCase().includes(q));
    }
  
    // 2) Filter by consultation mode
    if (consultation) {
      res = res.filter(d => d.consultation === consultation);
    }
  
    // 3) Filter by specialties (handles either `speciality` string or `specialities` array)
    if (specialties.length) {
      res = res.filter(d => {
        const docSpecs = Array.isArray(d.specialities)
          ? d.specialities
          : d.speciality
          ? [d.speciality]
          : [];
        return specialties.every(spec => docSpecs.includes(spec));
      });
    }
  
    // 4) Sort
    if (sort === 'fees') {
      res.sort((a, b) => a.fees - b.fees);
    } else if (sort === 'experience') {
      res.sort((a, b) => b.experience - a.experience);
    }
  
    return res;
  }
  