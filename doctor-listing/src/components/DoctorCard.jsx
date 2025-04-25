// src/components/DoctorCard.jsx
import React from 'react';

export default function DoctorCard({ doctor }) {
  return (
    <div data-testid="doctor-card" className="card">
      <img
        src={doctor.image}            
        alt={doctor.name}
        className="card-img"
      />
      <div className="card-details">
        <h3 data-testid="doctor-name">{doctor.name}</h3>
        <p data-testid="doctor-specialty">{doctor.speciality}</p>
        <p data-testid="doctor-experience">{doctor.experience} yrs exp.</p>
      </div>
      <div className="card-action">
        <div data-testid="doctor-fee" className="card-fee">₹{doctor.fees}</div>
        <button className="book-btn">Book Appointment</button>
      </div>
    </div>
  );
}
