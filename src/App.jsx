import { Routes, Route } from 'react-router-dom';
import Beranda from './pages/Beranda';
import Login from './pages/Login';
import Register from './pages/Register';
import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Notfound from './pages/Notfound';
import { useEffect } from 'react';

import DashboardAdmin from './pages/admin/DashboardAdmin';
import AdminDetailBeasiswa from './pages/admin/AdminDetailBeasiswa';
import KelolaBeasiswa from './pages/admin/KelolaBeasiswa';
import EditBeasiswa from './pages/admin/EditBeasiswa';
import AddBeasiswa from './pages/admin/AddBeasiswa';
import KelolaUser from './pages/admin/KelolaUser';

import ListBeasiswa from './pages/users/ListBeasiswa';
import DetailBeasiswa from './pages/users/DetailBeasiswa';
import BookmarkPages from './pages/users/BookmarkPage';

function App() {

  return (
    <div className="App overflow-x-hidden overflow-y-hidden">
      <Navbar />
      <div>
        <Routes>
          <Route path="/" element={<Beranda />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Notfound />} />

          {/* Rute yang hanya dapat diakses setelah user login */}
          <Route element={<PrivateRoute />}>
            <Route path="/list-beasiswa" element={<ListBeasiswa />} />
            <Route path="/detail-beasiswa/:id" element={<DetailBeasiswa />} />
            <Route path="/list-bookmark" element={<BookmarkPages />} />
          </Route>

          {/* Rute yang hanya dapat diakses setelah admin login */}
          <Route element={<AdminRoute />}>
            <Route path="/beranda-admin" element={<DashboardAdmin />} />
            <Route path="/kelola-beasiswa" element={<KelolaBeasiswa />} />
            <Route path="/kelola-user" element={<KelolaUser />} />
            <Route path="/admin-detail-beasiswa/:id" element={<AdminDetailBeasiswa />} />
            <Route path="/edit-beasiswa/:id" element={<EditBeasiswa />} />
            <Route path="/add-beasiswa" element={<AddBeasiswa />} />
          </Route>
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;