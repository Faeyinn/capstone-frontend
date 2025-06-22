import Beranda from './pages/Beranda';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Beranda />} />
        {/* Tambahkan rute lain di sini jika diperlukan */}
      </Routes>
    </div>
  );
}

export default App;