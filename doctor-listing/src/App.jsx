import React from 'react';
import { Routes, Route } from 'react-router-dom';
import DoctorListPage from './pages/DoctorListPage';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<DoctorListPage />} />
    </Routes>
  );
}
