import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { FaSearch } from 'react-icons/fa';
import '../../index.css';

interface Admin {
  id: number;
  ism: string;
  familiya: string;
  email: string;
  rol: string;
  holat: string;
}


function AdminlarPage() {
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');







  const [showAddModal, setShowAddModal] = useState(false); // Admin zapchast

  const [activeFilter, setActiveFilter] = useState<'all' | 'faol' | 'ishdan bo\'shatilgan'>('all');
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  const handleFilterClick = (filter: 'all' | 'faol' | 'ishdan bo\'shatilgan') => {
    setActiveFilter(filter);
  };
  const filteredAdmins = admins.filter((admin) => {
    const holat = admin.holat.trim().toLowerCase();
    const matchesSearch = (
      admin.ism.toLowerCase().includes(searchTerm.toLowerCase()) ||
      admin.familiya.toLowerCase().includes(searchTerm.toLowerCase()) ||
      admin.email.toLowerCase().includes(searchTerm.toLowerCase())
    );


    if (activeFilter === 'all') return matchesSearch;
    return holat === activeFilter && matchesSearch;
  });

  const handleAddFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:7070/api/staff/all-admins', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Qo‘shishda xatolik');

      const result = await response.json();

      // Ehtimoliy formatga qarab `newAdmin` ni aniqlash
      const newAdmin = result.newAdmin || result;

      setAdmins((prev) => [...prev, newAdmin]);
      setShowAddModal(false);
      setFormData(initialFormState); // formani tozalash
    } catch (err: any) {
      alert(err.message || 'Qo‘shishda xatolik yuz berdi');
    }
  };
  const initialFormState = {
    ism: '',
    familiya: '',
    email: '',
    rol: '',
    holat: 'faol',
  };
  const [formData, setFormData] = useState(initialFormState);

  const handleAddAdminClick = () => {
    setShowAddModal(true);
    setFormData(initialFormState);
    setEditingAdmin(null);
  };










  const [editingAdmin, setEditingAdmin] = useState<Admin | null>(null);



  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const response = await fetch('http://localhost:7070/api/staff/all-admins');
        if (!response.ok) throw new Error(`HTTP xatosi! Status: ${response.status}`);
        const data = await response.json();
        setAdmins(data);
        setEditingAdmin(null);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchAdmins();
  }, []);

  const handleDelete = async (id: number) => {
    if (!window.confirm("Rostdan o'chirmoqchimisiz?")) return;

    try {
      const response = await fetch(`http://localhost:7070/api/staff/all-admins/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error("O'chirishda xatolik yuz berdi");
      setAdmins((prev) => prev.filter((a) => a.id !== id));
    } catch (error: any) {
      alert(error.message || 'Xatolik yuz berdi');
    }
  };
  const openEditModal = (admin: Admin) => {
    setEditingAdmin(admin);
    setFormData({
      ism: admin.ism,
      familiya: admin.familiya,
      email: admin.email,
      rol: admin.rol,
      holat: admin.holat,
    });
  };
  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editingAdmin) return;

    try {
      const response = await fetch(`http://localhost:7070/api/staff/all-admins/${editingAdmin.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Tahrirlashda xatolik');

      const updatedAdmin = await response.json();

      // updatedAdmin javob formatiga qarab o'zgartirish mumkin
      setAdmins((prev) =>
        prev.map((a) => (a.id === updatedAdmin.updatedAdmin.id ? updatedAdmin.updatedAdmin : a))
      );

      setEditingAdmin(null);
    } catch (err: any) {
      alert(err.message);
    }
  };




  if (loading) return <div className="loading-message text-white">Adminlar ro'yxati yuklanmoqda...</div>;
  if (error) return <div className="error-message text-red-500">Ma'lumotlarni yuklashda xato yuz berdi: {error}</div>;





  return (
    <div className="admins-page">
      <div className="flex items-center justify-between w-[100%]">
        <h2 className="text-white text-2xl font-semibold mb-6">Adminlar ro'yxati</h2>
        <div className="flex items-center justify-center gap-[10px]">
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
          <button
            onClick={handleAddAdminClick}
            className="flex items-center justify-center gap-[6px] cursor-pointer w-full sm:w-auto px-5 py-1 bg-blue-600 text-white font-medium rounded-md hover:bg-[#D1CFCE] hover:text-black transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <p className='text-[22px]'>+</p> Admin Qo'shish
          </button>
        </div>
        {showAddModal && (
          <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
            <div className="bg-neutral-900 p-6 rounded-xl shadow-xl w-full max-w-md text-white">
              <h3 className="text-2xl font-semibold mb-5">Yangi admin qo‘shish</h3>
              <form onSubmit={handleAddFormSubmit} className="space-y-4">
                <input
                  name="ism"
                  value={formData.ism}
                  onChange={handleInputChange}
                  placeholder="Ism"
                  className="w-full px-4 py-2 bg-neutral-800 rounded text-white"
                  required
                />
                <input
                  name="familiya"
                  value={formData.familiya}
                  onChange={handleInputChange}
                  placeholder="Familiya"
                  className="w-full px-4 py-2 bg-neutral-800 rounded text-white"
                  required
                />
                <input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Email"
                  className="w-full px-4 py-2 bg-neutral-800 rounded text-white"
                  required
                />
                <input
                  name="rol"
                  value={formData.rol}
                  onChange={handleInputChange}
                  placeholder="Rol"
                  className="w-full px-4 py-2 bg-neutral-800 rounded text-white"
                  required
                />
                <select
                  name="holat"
                  value={formData.holat}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-neutral-800 rounded text-white"
                >
                  <option value="faol">Faol</option>
                  <option value="ishdan bo'shatilgan">Ishdan bo'shatilgan</option>
                </select>

                <div className="flex justify-end space-x-4 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="bg-red-600 hover:bg-red-500 px-5 py-2 rounded transition-colors"
                  >
                    Bekor qilish
                  </button>
                  <button
                    type="submit"
                    className="bg-green-600 hover:bg-green-500 px-5 py-2 rounded transition-colors"
                  >
                    Qo‘shish
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

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

      <div className="admins-table-container overflow-x-auto rounded-lg shadow-md">
        <table className="admins-table w-full border-collapse">
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
            {filteredAdmins.map((admin) => (
              <tr
                key={admin.id}
                className="border-b border-neutral-700 hover:bg-neutral-900 transition-colors duration-200"
              >
                <td className="py-3 px-6 whitespace-nowrap">{admin.id}</td>
                <td className="py-3 px-6">{admin.ism}</td>
                <td className="py-3 px-6">{admin.familiya}</td>
                <td className="py-3 px-6">{admin.email}</td>
                <td className="py-3 px-6">{admin.rol}</td>
                <td className="py-3 px-6">
                  <span
                    className={`py-1 px-3 rounded-full text-xs font-semibold ${admin.holat === 'faol' ? 'bg-green-600 text-green-100' : 'bg-red-600 text-red-100'
                      }`}
                  >
                    {admin.holat}
                  </span>
                </td>
                <td className="py-3 px-6 text-center space-x-2">
                  <button
                    className="text-yellow-400 hover:text-yellow-300 font-medium px-2"
                    onClick={() => openEditModal(admin)}
                  >
                    Tahrirlash
                  </button>
                  <button
                    className="text-red-400 hover:text-red-300 font-medium px-2"
                    onClick={() => handleDelete(admin.id)}
                  >
                    O'chirish
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editingAdmin && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-neutral-900 p-6 rounded-xl shadow-xl w-full max-w-md text-white">
            <h3 className="text-2xl font-semibold mb-5">Adminni tahrirlash</h3>
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <input
                name="ism"
                value={formData.ism}
                onChange={handleInputChange}
                placeholder="Ism"
                className="w-full px-4 py-2 bg-neutral-800 rounded text-white"
                required
              />
              <input
                name="familiya"
                value={formData.familiya}
                onChange={handleInputChange}
                placeholder="Familiya"
                className="w-full px-4 py-2 bg-neutral-800 rounded text-white"
                required
              />
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Email"
                className="w-full px-4 py-2 bg-neutral-800 rounded text-white"
                required
              />
              <input
                name="rol"
                value={formData.rol}
                onChange={handleInputChange}
                placeholder="Rol"
                className="w-full px-4 py-2 bg-neutral-800 rounded text-white"
                required
              />
              <select
                name="holat"
                value={formData.holat}
                onChange={handleInputChange}
                className="w-full px-4 py-2 bg-neutral-800 rounded text-white"
              >
                <option value="faol">Faol</option>
                <option value="ishdan bo'shatilgan">Ishdan bo'shatilgan</option>
              </select>

              <div className="flex justify-end space-x-4 pt-4">
                <button
                  type="button"
                  onClick={() => setEditingAdmin(null)}
                  className="bg-red-600 hover:bg-red-500 px-5 py-2 rounded transition-colors"
                >
                  Bekor qilish
                </button>
                <button
                  type="submit"
                  className="bg-green-600 hover:bg-green-500 px-5 py-2 rounded transition-colors"
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

export default AdminlarPage;