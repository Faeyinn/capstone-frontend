import Beranda from './pages/Beranda';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import ListBeasiswa from './pages/ListBeasiswa';

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
    </div>
  );
}

export default App;