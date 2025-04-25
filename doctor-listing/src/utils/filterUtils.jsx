export function applyFilters(doctors, { name, consultation, specialties, sort }) {
    let res = [...doctors];
  
    if (name) {
      const q = name.toLowerCase();
      res = res.filter(d => d.name.toLowerCase().includes(q));
    }
    if (consultation) {
      res = res.filter(d => d.consultation === consultation);
    }
    if (specialties.length) {
           res = res.filter(d =>
            specialties.every(s => d.specialties.includes(s))
          );
         }
        //  if (specialties.length) {
        //    // doctor.speciality is a string
        //    res = res.filter(d => specialties.includes(d.speciality));
        //  }
    if (sort === 'fees') {
      res.sort((a,b) => a.fees - b.fees);
    } else if (sort === 'experience') {
      res.sort((a,b) => b.experience - a.experience);
    }
  
    return res;
  }
  