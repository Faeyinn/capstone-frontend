import Beranda from './pages/Beranda';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import ListBeasiswa from './pages/ListBeasiswa';
import DetailBeasiswa from './pages/DetailBeasiswa';
import BerandaAdmin from './pages/BerandaAdmin';
import AdminDetailBeasiswa from './pages/AdminDetailBeasiswa';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Beranda />} />
      </Routes>
      <Routes>
        <Route path="/login" element={<Login />} />
      </Routes>
      <Routes>
        <Route path="/register" element={<Register />} />
      </Routes>
      <Routes>
        <Route path="/list-beasiswa" element={<ListBeasiswa />} />
      </Routes>
      <Routes>
        <Route path="/detail-beasiswa/:id" element={<DetailBeasiswa />} />
      </Routes>
      <Routes>
        <Route path="/beranda-admin" element={<BerandaAdmin />} />
      </Routes>
      <Routes>
        <Route path="/admin-detail-beasiswa/:id" element={<AdminDetailBeasiswa />} />
      </Routes>
    </div>
  );
}

export default App;