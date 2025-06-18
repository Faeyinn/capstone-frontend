import './index.css'
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HeroSection from './pages/HeroSection';

function App() {
  return (
    <Routes>
      <Route path="/" component={HeroSection} />
    </Routes>
  );
}

export default App;