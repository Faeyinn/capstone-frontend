import './index.css'
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HeroSection from './pages/HeroSection';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HeroSection />} />
    </Routes>
  );
}

export default App;