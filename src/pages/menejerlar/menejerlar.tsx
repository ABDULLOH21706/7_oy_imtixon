import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { FaSearch } from 'react-icons/fa';
import '../../index.css'


interface Manager {
  id: number;
  ism: string;
  familiya: string;
  email: string;
  rol: string;
  holat: string;
}

function MenejerlarPage() {
  const [managers, setManagers] = useState<Manager[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'faol' | 'ishdan bo\'shatilgan'>('all');
  const [editingManager, setEditingManager] = useState<Manager | null>(null);
  const [formData, setFormData] = useState({
    ism: '',
    familiya: '',
    email: '',
    rol: '',
    holat: 'faol',
  });



  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  const handleFilterClick = (filter: 'all' | 'faol' | 'ishdan bo\'shatilgan') => {
    setActiveFilter(filter);
  };
  const handleAddAdminClick = () => {
    alert("Manager qo'shish funksiyasi hali yozilmagan.");
  };

  const filteredManagers = managers.filter((manager) => {
    const holat = manager.holat.trim().toLowerCase();
    const matchesFilter = activeFilter === 'all' || holat === activeFilter;

    const searchLower = searchTerm.toLowerCase();
    const matchesSearch =
      manager.ism.toLowerCase().includes(searchLower) ||
      manager.familiya.toLowerCase().includes(searchLower) ||
      manager.email.toLowerCase().includes(searchLower);

    return matchesFilter && matchesSearch;
  });















  useEffect(() => {
    const fetchManagers = async () => {
      try {
        const response = await fetch('http://localhost:7070/api/staff/all-managers');
        if (!response.ok) throw new Error(`HTTP xatosi! Status: ${response.status}`);
        const data = await response.json();
        setManagers(data);
        setEditingManager(null);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchManagers();
  }, []);

  const handleDelete = async (id: number) => {
    if (!window.confirm("Rostdan o'chirmoqchimisiz?")) return;

    try {
      const response = await fetch(`http://localhost:7070/api/staff/all-managers/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error("O'chirishda xatolik yuz berdi");
      setManagers(prev => prev.filter(m => m.id !== id));
    } catch (error: any) {
      alert(error.message || 'Xatolik yuz berdi');
    }
  };

  const openEditModal = (manager: Manager) => {
    setEditingManager(manager);
    setFormData({
      ism: manager.ism,
      familiya: manager.familiya,
      email: manager.email,
      rol: manager.rol,
      holat: manager.holat,
    });
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!editingManager) return;

    try {
      const response = await fetch(`http://localhost:7070/api/staff/all-managers/${editingManager.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!response.ok) throw new Error('Tahrirlashda xatolik');
      const updatedManager = await response.json();
      setManagers(prev =>
        prev.map(m => (m.id === updatedManager.updatedManager.id ? updatedManager.updatedManager : m))
      );
      setEditingManager(null);
    } catch (err: any) {
      alert(err.message);
    }
  };

  if (loading) return <div className="loading-message">Menejerlar ro'yxati yuklanmoqda...</div>;
  if (error) return <div className="error-message">Ma'lumotlarni yuklashda xato yuz berdi: {error}</div>;


  return (
    <div className="managers-page">
      <div className="flex items-center justify-between w-[100%]">
        <h2 className="text-white text-2xl font-semibold mb-6">Menejerlar ro'yxati</h2>
        <div className="flex items-center justify-center bg-neutral-800 rounded px-3 py-2 w-full sm:w-[300px]">
          <FaSearch className="text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Qidirish..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="bg-transparent outline-none text-white w-full"
          />
        </div>
      </div>
      <div className="p-[10px]">
        {['all', 'faol', "ishdan bo'shatilgan"].map((filter) => (
          <button
            key={filter}
            onClick={() => handleFilterClick(filter as 'all' | 'faol' | "ishdan bo'shatilgan")}
            className={`
      px-4 py-2 text-sm font-medium rounded-t-lg
      ${activeFilter === filter
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-gray-600 hover:text-blue-600 hover:border-blue-600 border-b-2 border-transparent'}
      whitespace-nowrap transition-colors duration-200
    `}
          >
            {{
              all: 'Hammasi',
              faol: 'Faol',
              "ishdan bo'shatilgan": "Ishdan bo'shatilgan"
            }[filter]}
          </button>
        ))}
      </div>

      <div className="managers-table-container overflow-x-auto rounded-lg shadow-md">
        <table className="managers-table w-full border-collapse ">
          <thead>
            <tr className="bg-neutral-800 text-gray-300 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">ID</th>
              <th className="py-3 px-6 text-left">Ism</th>
              <th className="py-3 px-6 text-left">Familiya</th>
              <th className="py-3 px-6 text-left">Email</th>
              <th className="py-3 px-6 text-left">Rol</th>
              <th className="py-3 px-6 text-left">Holat</th>
              <th className="py-3 px-6 text-center">Amallar</th>
            </tr>
          </thead>
          <tbody className="text-gray-200 text-sm font-light">
            {filteredManagers.map(manager => (
              <tr key={manager.id} className="border-b border-neutral-700 hover:bg-neutral-800">
                <td className="py-3 px-6 text-left whitespace-nowrap">{manager.id}</td>
                <td className="py-3 px-6 text-left">{manager.ism}</td>
                <td className="py-3 px-6 text-left">{manager.familiya}</td>
                <td className="py-3 px-6 text-left">{manager.email}</td>
                <td className="py-3 px-6 text-left">{manager.rol}</td>
                <td className="py-3 px-6 text-left">
                  <span
                    className={`py-1 px-3 rounded-full text-xs font-semibold ${manager.holat === 'faol'
                      ? 'bg-green-600 text-green-100'
                      : 'bg-red-600 text-red-100'
                      }`}
                  >
                    {manager.holat}
                  </span>
                </td>
                <td className="py-3 px-6 text-center">
                  <button
                    className="text-yellow-400 hover:text-yellow-300 font-medium px-2"
                    onClick={() => openEditModal(manager)}
                  >
                    Tahrirlash
                  </button>
                  <button
                    className="text-red-400 hover:text-red-300 font-medium px-2"
                    onClick={() => handleDelete(manager.id)}
                  >
                    O'chirish
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editingManager && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-neutral-900 text-white p-6 rounded-xl shadow-xl w-full max-w-md">
            <h3 className="text-xl font-semibold mb-4">Menejerni tahrirlash</h3>
            <form onSubmit={handleFormSubmit} className="space-y-3">
              <input
                name="ism"
                value={formData.ism}
                onChange={handleInputChange}
                placeholder="Ism"
                className="w-full px-4 py-2 bg-neutral-800 rounded"
                required
              />
              <input
                name="familiya"
                value={formData.familiya}
                onChange={handleInputChange}
                placeholder="Familiya"
                className="w-full px-4 py-2 bg-neutral-800 rounded"
                required
              />
              <input
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Email"
                type="email"
                className="w-full px-4 py-2 bg-neutral-800 rounded"
                required
              />
              <input
                name="rol"
                value={formData.rol}
                onChange={handleInputChange}
                placeholder="Rol"
                className="w-full px-4 py-2 bg-neutral-800 rounded"
                required
              />
              <select
                name="holat"
                value={formData.holat}
                onChange={handleInputChange}
                className="w-full px-4 py-2 bg-neutral-800 rounded"
              >
                <option value="faol">Faol</option>
                <option value="ishdan bo'shatilgan">Ishdan bo'shatilgan</option>
              </select>

              <div className="flex justify-end space-x-3 pt-3">
                <button
                  type="button"
                  onClick={() => setEditingManager(null)}
                  className="px-4 py-2 bg-red-600 rounded hover:bg-red-500"
                >
                  Bekor qilish
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-600 rounded hover:bg-green-500"
                >
                  Saqlash
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default MenejerlarPage;