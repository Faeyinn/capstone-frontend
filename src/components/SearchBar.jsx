import { useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [keyword, setKeyword] = useState("");
  const [jenjang, setJenjang] = useState("");
  const [lokasi, setLokasi] = useState("");
  const [deadline, setDeadline] = useState("");
  const [bidang, setBidang] = useState("");

  const handleSearch = () => {
    onSearch({ keyword, jenjang, lokasi, deadline, bidang });
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow-md w-full max-w-5xl mx-auto text-black">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        {/* Input Keyword */}
        <input
          type="text"
          placeholder="Cari beasiswa..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          className="w-full md:w-1/3 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        {/* Filter Dropdown */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4 w-full">
          {/* Jenjang */}
          <select
            value={jenjang}
            onChange={(e) => setJenjang(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="">Pilih Jenjang</option>
            <option value="SMA">SMA</option>
            <option value="S1">S1</option>
            <option value="S2">S2</option>
            <option value="S3">S3</option>
          </select>

          {/* Lokasi */}
          <select
            value={lokasi}
            onChange={(e) => setLokasi(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="">Pilih Lokasi</option>
            <option value="Indonesia">Indonesia</option>
            <option value="Luar Negeri">Luar Negeri</option>
          </select>

          {/* Deadline */}
          <select
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="">Deadline</option>
            <option value="Terdekat">Terdekat</option>
            <option value="Bulan Ini">Bulan Ini</option>
            <option value="Tahun Ini">Tahun Ini</option>
          </select>

          {/* Bidang Studi */}
          <select
            value={bidang}
            onChange={(e) => setBidang(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="">Bidang Studi</option>
            <option value="Teknik">Teknik</option>
            <option value="Sains">Sains</option>
            <option value="Sosial">Sosial</option>
            <option value="Kedokteran">Kedokteran</option>
          </select>
        </div>
      </div>

      {/* Tombol Cari */}
      <div className="mt-4 text-right">
        <button
          onClick={handleSearch}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-2 rounded-lg"
        >
          Cari
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
