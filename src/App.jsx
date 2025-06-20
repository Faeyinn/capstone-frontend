import './index.css'
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Beranda from './pages/Beranda.jsx';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Beranda />} />
    </Routes>
  );
}

export default App;