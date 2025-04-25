// src/utils/filterUtils.js

/**
 * Filters & sorts an array of doctor objects based on:
 *  - name substring
 *  - consultation mode (video or in-clinic)
 *  - list of specialty names
 *  - sort by fees or experience
 */
export function applyFilters(doctors, { name, consultation, specialties, sort }) {
    let res = [...doctors];
  
    // 1) Filter by name (case-insensitive substring)
    if (name) {
      const q = name.toLowerCase();
      res = res.filter(d => d.name.toLowerCase().includes(q));
    }
  
    // 2) Filter by consultation mode
    if (consultation === 'Video Consult') {
      res = res.filter(d => d.video_consult);
    } else if (consultation === 'In Clinic') {
      res = res.filter(d => d.in_clinic);
    }
  
    // 3) Filter by specialty names
    if (specialties.length) {
      res = res.filter(d => {
        // extract an array of strings from d.specialities (API field)
        const docSpecs = Array.isArray(d.specialities)
          ? d.specialities.map(s => s.name)
          : [];
        // keep only if every selected filter is present
        return specialties.every(spec => docSpecs.includes(spec));
      });
    }
  
    // 4) Sort
    if (sort === 'fees') {
      res.sort((a, b) => {
        const fa = parseFloat(a.fees.replace(/[^\d.]/g, '')) || 0;
        const fb = parseFloat(b.fees.replace(/[^\d.]/g, '')) || 0;
        return fa - fb;
      });
    } else if (sort === 'experience') {
      res.sort((a, b) => {
        const ea = parseInt(a.experience, 10) || 0;
        const eb = parseInt(b.experience, 10) || 0;
        return eb - ea;
      });
    }
  
    return res;
  }
  