import Beranda from './pages/Beranda';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import ListBeasiswa from './pages/ListBeasiswa';
import DetailBeasiswa from './pages/DetailBeasiswa';
import BerandaAdmin from './pages/BerandaAdmin';
import AdminDetailBeasiswa from './pages/AdminDetailBeasiswa';
import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute';
import EditBeasiswa from './pages/EditBeasiswa';
import AddBeasiswa from './pages/AddBeasiswa';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Beranda />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Rute yang hanya dapat diakses setelah user login */}
        <Route element={<PrivateRoute />}>
          <Route path="/list-beasiswa" element={<ListBeasiswa />} />
          <Route path="/detail-beasiswa/:id" element={<DetailBeasiswa />} />
        </Route>

        {/* Rute yang hanya dapat diakses setelah admin login */}
        <Route element={<AdminRoute />}>
          <Route path="/beranda-admin" element={<BerandaAdmin />} />
          <Route path="/admin-detail-beasiswa/:id" element={<AdminDetailBeasiswa />} />
          <Route path="/edit-beasiswa/:id" element={<EditBeasiswa />} />
          <Route path="/add-beasiswa" element={<AddBeasiswa />} />
        </Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;