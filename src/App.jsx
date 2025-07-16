import Beranda from './pages/Beranda';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import ListBeasiswa from './pages/ListBeasiswa';
import DetailBeasiswa from './pages/DetailBeasiswa';
import DashboardAdmin from './pages/DashboardAdmin';
import KelolaBeasiswa from './pages/KelolaBeasiswa';
import AdminDetailBeasiswa from './pages/AdminDetailBeasiswa';
import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute';
import EditBeasiswa from './pages/EditBeasiswa';
import AddBeasiswa from './pages/AddBeasiswa';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Notfound from './pages/Notfound';
import BookmarkPages from './pages/BookmarkPage';
import KelolaUser from './pages/KelolaUser';

function App() {
  return (
    <div className="App overflow-x-hidden overflow-y-hidden">
      <Navbar />
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
      <Footer />
    </div>
  );
}

export default App;