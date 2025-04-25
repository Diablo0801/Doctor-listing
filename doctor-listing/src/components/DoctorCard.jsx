// src/components/DoctorCard.jsx
import React from 'react';

export default function DoctorCard({ doctor }) {
  // pick the real image field (fallback to placeholder)
  const imgSrc =
    doctor.image ||
    doctor.photo ||
    doctor.profileImage ||
    doctor.avatarUrl ||
    'https://via.placeholder.com/72';

  // pick the real speciality field
  const speciality =
    (Array.isArray(doctor.specialities)
      ? doctor.specialities.join(', ')
      : doctor.speciality) || '—';

  return (
    <div data-testid="doctor-card" className="card">
      <img src={imgSrc} alt={doctor.name} className="card-img" />

      <div className="card-details">
        <h3 data-testid="doctor-name">{doctor.name}</h3>
        <p data-testid="doctor-specialty">{speciality}</p>
        <p data-testid="doctor-experience">
          {doctor.experience} yrs exp.
        </p>
      </div>

      <div className="card-action">
        <div data-testid="doctor-fee" className="card-fee">
          ₹{doctor.fees}
        </div>
        <button className="book-btn">Book Appointment</button>
      </div>
    </div>
  );
}
