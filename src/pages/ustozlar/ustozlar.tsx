import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { FaSearch } from 'react-icons/fa';
import '../../index.css';

interface Ustoz {
    id: number;
    ism: string;
    familiya: string;
    email: string;
    fan: string;
    holat: string;
}

function UstozlarPage() {
    const [ustozlar, setUstozlar] = useState<Ustoz[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [showAddModal, setShowAddModal] = useState(false);
    const [activeFilter, setActiveFilter] = useState<'all' | 'faol' | 'ishdan bo\'shatilgan'>('all');
    const [editingUstoz, setEditingUstoz] = useState<Ustoz | null>(null);

    const initialFormState = {
        ism: '',
        familiya: '',
        email: '',
        fan: '',
        holat: 'faol',
    };

    const [formData, setFormData] = useState(initialFormState);

    useEffect(() => {
        const fetchUstozlar = async () => {
            try {
                const response = await fetch('http://localhost:7070/api/teacher/all-teacher');
                if (!response.ok) throw new Error(`HTTP xatosi: ${response.status}`);
                const data = await response.json();
                setUstozlar(data);
                setEditingUstoz(null);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchUstozlar();
    }, []);

    const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    const handleFilterClick = (filter: 'all' | 'faol' | 'ishdan bo\'shatilgan') => {
        setActiveFilter(filter);
    };

    const filteredUstozlar = ustozlar.filter((ustoz) => {
        const holat = ustoz.holat.trim().toLowerCase();
        const matchesSearch = (
            ustoz.ism.toLowerCase().includes(searchTerm.toLowerCase()) ||
            ustoz.familiya.toLowerCase().includes(searchTerm.toLowerCase()) ||
            ustoz.email.toLowerCase().includes(searchTerm.toLowerCase())
        );
        if (activeFilter === 'all') return matchesSearch;
        return holat === activeFilter && matchesSearch;
    });

    const handleAddUstozClick = () => {
        setShowAddModal(true);
        setFormData(initialFormState);
        setEditingUstoz(null);
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };



    const handleAddFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:7070/api/teacher/all-teacher', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            if (!response.ok) throw new Error('Qo‘shishda xatolik');
            const result = await response.json();
            const newUstoz = result.newUstoz || result;
            setUstozlar((prev) => [...prev, newUstoz]);
            setShowAddModal(false);
            setFormData(initialFormState);
        } catch (err: any) {
            alert(err.message || 'Qo‘shishda xatolik yuz berdi');
        }
    };

    const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!editingUstoz) return;

        try {
            const response = await fetch(`http://localhost:7070/api/teacher/all-teacher/${editingUstoz.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (!response.ok) throw new Error('Tahrirlashda xatolik');

            const updatedUstoz = await response.json();
            setUstozlar((prev) =>
                prev.map((u) => (u.id === updatedUstoz.updatedUstoz.id ? updatedUstoz.updatedUstoz : u))
            );
            setEditingUstoz(null);
        } catch (err: any) {
            alert(err.message);
        }
    };

    const handleDelete = async (id: number) => {
        if (!window.confirm("Rostdan o'chirmoqchimisiz?")) return;

        try {
            const response = await fetch(`http://localhost:7070/api/teacher/all-teacher/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) throw new Error("O'chirishda xatolik yuz berdi");
            setUstozlar((prev) => prev.filter((u) => u.id !== id));
        } catch (error: any) {
            alert(error.message || 'Xatolik yuz berdi');
        }
    };

    const openEditModal = (ustoz: Ustoz) => {
        setEditingUstoz(ustoz);
        setFormData({
            ism: ustoz.ism,
            familiya: ustoz.familiya,
            email: ustoz.email,
            fan: ustoz.fan,
            holat: ustoz.holat,
        });
        setShowAddModal(true);
    };

    if (loading) return <div className="text-white">Ustozlar ro'yxati yuklanmoqda...</div>;
    if (error) return <div className="text-red-500">Xatolik: {error}</div>;

    return (
        <div className="teachers-page text-white">
            <div className="flex justify-between items-center w-[100%]">
                <h2 className="text-white text-2xl font-semibold mb-6">Ustozlar ro'yxati</h2>
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
                        onClick={handleAddUstozClick}
                        className="flex items-center justify-center gap-[6px] cursor-pointer w-full sm:w-auto px-5 py-1 bg-blue-600 text-white font-medium rounded-md hover:bg-[#D1CFCE] hover:text-black transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <p className='text-[22px]'>+</p> Ustoz Qo‘shish
                    </button>
                </div>
            </div>

            <div className="py-[10px]">
                {['all', 'faol', "ishdan bo'shatilgan"].map((filter) => (
                    <button
                        key={filter}
                        onClick={() => handleFilterClick(filter as any)}
                        className={`px-4 py-2 text-sm font-medium rounded-t-lg ${activeFilter === filter ? 'border-b-2 border-blue-500 text-blue-400' : 'text-gray-400'}`}
                    >
                        {{
                            all: 'Hammasi',
                            faol: 'Faol',
                            "ishdan bo'shatilgan": "Ishdan bo'shatilgan"
                        }[filter]}
                    </button>
                ))}
            </div>

            <div className="teachers-table-container overflow-x-auto rounded-lg shadow-md">
                <table className="teachers-table w-full border-collapse">
                    <thead>
                        <tr className="bg-neutral-800 text-gray-300 uppercase text-sm leading-normal">
                            <th className="py-3 px-6 text-left">ID</th>
                            <th className="py-3 px-6 text-left">Ism</th>
                            <th className="py-3 px-6 text-left">Familiya</th>
                            <th className="py-3 px-6 text-left">Email</th>
                            <th className="py-3 px-6 text-left">Fan</th>
                            <th className="py-3 px-6 text-left">Holat</th>
                            <th className="py-3 px-6 text-center">Amallar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUstozlar.map((ustoz) => (
                            <tr key={ustoz.id} className="border-b border-neutral-700">
                                <td className="py-3 px-6 whitespace-nowrap">{ustoz.id}</td>
                                <td className="py-3 px-6">{ustoz.ism}</td>
                                <td className="py-3 px-6">{ustoz.familiya}</td>
                                <td className="py-3 px-6">{ustoz.email}</td>
                                <td className="py-3 px-6">{ustoz.fan}</td>
                                <td className="py-3 px-6">
                                    <span
                                        className={`py-1 px-3 rounded-full text-xs font-semibold ${ustoz.holat === 'faol' ? 'bg-green-600 text-green-100' : 'bg-red-600 text-red-100'
                                            }`}
                                    >
                                        {ustoz.holat}
                                    </span>
                                </td>
                                <td className="py-3 px-6 text-center space-x-2">
                                    <button
                                        className="text-yellow-400 hover:text-yellow-300 font-medium px-2"
                                        onClick={() => openEditModal(ustoz)}
                                    >
                                        Tahrirlash
                                    </button>
                                    <button
                                        className="text-red-400 hover:text-red-300 font-medium px-2"
                                        onClick={() => handleDelete(ustoz.id)}
                                    >
                                        O'chirish
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {(showAddModal || editingUstoz) && (
                <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
                    <div className="bg-neutral-900 p-6 rounded-xl shadow-xl w-full max-w-md text-white">
                        <h3 className="text-2xl font-semibold mb-5">
                            {editingUstoz ? 'Ustozni tahrirlash' : 'Yangi ustoz qo‘shish'}
                        </h3>
                        <form onSubmit={editingUstoz ? handleFormSubmit : handleAddFormSubmit} className="space-y-4">
                            <input name="ism" value={formData.ism} onChange={handleInputChange} className="w-full p-2 rounded bg-neutral-800" placeholder="Ism" required />
                            <input name="familiya" value={formData.familiya} onChange={handleInputChange} className="w-full p-2 rounded bg-neutral-800" placeholder="Familiya" required />
                            <input name="email" value={formData.email} onChange={handleInputChange} className="w-full p-2 rounded bg-neutral-800" placeholder="Email" type="email" required />
                            <input name="fan" value={formData.fan} onChange={handleInputChange} className="w-full p-2 rounded bg-neutral-800" placeholder="Fan" required />
                            <select name="holat" value={formData.holat} onChange={handleInputChange} className="w-full p-2 rounded bg-neutral-800">
                                <option value="faol">Faol</option>
                                <option value="ishdan bo'shatilgan">Ishdan bo'shatilgan</option>
                            </select>
                            <div className="flex justify-end gap-4 pt-4">
                                <button type="button" onClick={() => { setEditingUstoz(null); setShowAddModal(false); }} className="bg-red-600 px-4 py-2 rounded">Bekor qilish</button>
                                <button type="submit" className="bg-green-600 px-4 py-2 rounded">{editingUstoz ? 'Saqlash' : 'Qo‘shish'}</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default UstozlarPage;