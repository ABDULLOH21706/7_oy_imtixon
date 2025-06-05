import React, { useState, useEffect } from 'react';
import AdminsPage from '../adminlar/adminlar.tsx';
import TeachersPage from '../ustozlar/ustozlar.tsx'
import { useNavigate, Routes, Route, Link, useLocation } from 'react-router-dom'; // Link va useLocation ni import qiling
import {
  FaHome, FaUserTie, FaUserCog, FaChalkboardTeacher, FaUserGraduate,
  FaUsers, FaBook, FaCreditCard, FaCog, FaUserCircle, FaSignOutAlt, FaSun,
  FaMoon
} from 'react-icons/fa';

import DashboardHome from '../asosiy/DashboardHome';
import ManagersPage from '../menejerlar/menejerlar.tsx';

interface Asosiy {
  loggedInEmail: string;
}






const Dashboard: React.FC<Asosiy> = ({ loggedInEmail }) => {


const [isDarkMode, setIsDarkMode] = useState(true);


useEffect(() => {
  const root = window.document.documentElement;
  if (isDarkMode) {
    root.classList.add('dark');
  } else {
    root.classList.remove('dark');
  }
}, [isDarkMode]);

const toggleDarkMode = () => setIsDarkMode(!isDarkMode);





  const navigate = useNavigate();
  const MyComponent = () => {
    const location = useLocation();
    return <div>{location.pathname}</div>;
  };

  const handleLogout = () => {
    localStorage.removeItem('loggedInEmail');
    navigate('/');
  };

  const isActiveLink = (path) => location.pathname === path;

  const menuItems = [
    { id: 'Asosiy', icon: FaHome, label: 'Asosiy', path: '/dashboard' },
    { id: 'Menejerlar', icon: FaUserTie, label: 'Menejerlar', path: '/dashboard/managers' },
    { id: 'Adminlar', icon: FaUserCog, label: 'Adminlar', path: '/dashboard/admins' },
    { id: 'Ustozlar', icon: FaChalkboardTeacher, label: 'Ustozlar', path: '/dashboard/teachers' },
    { id: 'Studentlar', icon: FaUserGraduate, label: 'Studentlar', path: '/dashboard/students' },
    { id: 'Guruhlar', icon: FaUsers, label: 'Guruhlar', path: '/dashboard/groups' },
    { id: 'Kurslar', icon: FaBook, label: 'Kurslar', path: '/dashboard/courses' },
    { id: 'Payment', icon: FaCreditCard, label: 'Payment', path: '/dashboard/payment' },
  ];

  const otherItems = [
    { id: 'Sozlamalar', icon: FaCog, label: 'Sozlamalar', path: '/dashboard/settings' },
    { id: 'Profile', icon: FaUserCircle, label: 'Profile', path: '/dashboard/profile' },
  ];

  const getCurrentBreadcrumb = () => {
    const currentPath = location.pathname;
    const foundItem = [...menuItems, ...otherItems].find(item => item.path === currentPath);
    return foundItem ? foundItem.label : 'Dashboard';
  };

  return (
    <div className="flex min-h-screen bg-neutral-950 text-white">

      <aside className="w-64 bg-neutral-900 p-6 flex flex-col justify-between border-r border-neutral-800 shadow-lg">
        <div>
          <div className="text-2xl font-bold mb-8 text-white">Admin CRM</div>
          <nav>
            <ul className="space-y-2">
              <li className="text-gray-400 text-sm mb-2 uppercase tracking-wide">Menu</li>
              {menuItems.map((item) => (
                <li key={item.id}>
                  <Link
                    to={item.path}
                    className={`flex items-center p-3 rounded-lg transition-colors duration-200
                      ${isActiveLink(item.path)
                        ? 'bg-neutral-800 text-white'
                        : 'text-gray-300 hover:bg-neutral-800 hover:text-white'
                      }`}
                  >
                    <item.icon className="mr-3 text-lg" />
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
              <li className="text-gray-400 text-sm mt-6 mb-2 uppercase tracking-wide">Boshqalar</li>
              {otherItems.map((item) => (
                <li key={item.id}>
                  <Link
                    to={item.path}
                    className={`flex items-center p-3 rounded-lg transition-colors duration-200
                      ${isActiveLink(item.path)
                        ? 'bg-neutral-800 text-white'
                        : 'text-gray-300 hover:bg-neutral-800 hover:text-white'
                      }`}
                  >
                    <item.icon className="mr-3 text-lg" />
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div>
          <button
            onClick={handleLogout}
            className="flex items-center p-3 rounded-lg w-full text-left transition-colors duration-200 text-red-400 hover:bg-neutral-800 hover:text-red-300"
          >
            <FaSignOutAlt className="mr-3 text-lg" />
            <span>Tizimdan chiqish</span>
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col">
        <header className="bg-neutral-900 p-4 flex items-center justify-between border-b border-neutral-800 shadow-md">
          <div className="flex items-center">
            <span className="text-gray-400 mr-2">
              <FaHome className="inline-block mr-1" /> Asosiy
            </span>
            <span className="text-gray-500">/ {getCurrentBreadcrumb()}</span>
          </div>
          <div className="flex items-center space-x-4">
            {isDarkMode ? (
              <FaSun onClick={toggleDarkMode} className="text-yellow-400 text-xl cursor-pointer hover:text-white" />
            ) : (
              <FaMoon onClick={toggleDarkMode} className="text-gray-500 text-xl cursor-pointer hover:text-white" />
            )}

            <div className="flex items-center space-x-2 cursor-pointer">
              <FaUserCircle className="text-3xl text-gray-400" />
              <div>
                <p className="text-white font-medium">{loggedInEmail}</p>
                <p className="text-gray-400 text-sm">Foydalanuvchi</p>
              </div>
            </div>
            <FaCog className="text-gray-400 text-xl cursor-pointer hover:text-white" />
          </div>
        </header>

        <main className="flex-1 p-8 overflow-auto bg-neutral-950">
          <Routes>
            <Route index element={<DashboardHome loggedInEmail={loggedInEmail} />} />
            <Route path="managers" element={<ManagersPage />} />
            <Route path="admins" element={<AdminsPage />} />
            <Route path="teachers" element={<TeachersPage />} />
            <Route path="students" element={<h2 className="text-white text-2xl">Studentlar Sahifasi</h2>} />
            <Route path="groups" element={<h2 className="text-white text-2xl">Guruhlar Sahifasi</h2>} />
            <Route path="courses" element={<h2 className="text-white text-2xl">Kurslar Sahifasi</h2>} />
            <Route path="payment" element={<h2 className="text-white text-2xl">Payment Sahifasi</h2>} />
            <Route path="settings" element={<h2 className="text-white text-2xl">Sozlamalar Sahifasi</h2>} />
            <Route path="profile" element={<h2 className="text-white text-2xl">Profil Sahifasi</h2>} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;