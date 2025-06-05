import React from 'react';
import { FaHome, FaUserTie, FaUsers, FaChalkboardTeacher, FaUserGraduate, FaLayerGroup, FaBook, FaCreditCard, FaCog, FaUserCircle, FaSignOutAlt } from 'react-icons/fa';

function Sidebar() {
  return (
    <div className="sidebar">
      <h3>Admin CRM</h3>
      <ul>
        <li>
          <a href="#" className="active">
            <FaHome className="icon" /> Asosiy
          </a>
        </li>
        <li>
          <a href="#" className="active">
            <FaUserTie className="icon" /> Menejerlar
          </a>
        </li>
        <li>
          <a href="#">
            <FaUsers className="icon" /> Adminlar
          </a>
        </li>
        <li>
          <a href="#">
            <FaChalkboardTeacher className="icon" /> Ustozlar
          </a>
        </li>
        <li>
          <a href="#">
            <FaUserGraduate className="icon" /> Studentlar
          </a>
        </li>
        <li>
          <a href="#">
            <FaLayerGroup className="icon" /> Guruhlar
          </a>
        </li>
        <li>
          <a href="#">
            <FaBook className="icon" /> Kurslar
          </a>
        </li>
        <li>
          <a href="#">
            <FaCreditCard className="icon" /> Payment
          </a>
        </li>
        <li>
          <a href="#">
            <FaCog className="icon" /> Boshqalar
          </a>
        </li>
        <li>
          <a href="#">
            <FaCog className="icon" /> Sozlamalar
          </a>
        </li>
        <li>
          <a href="#">
            <FaUserCircle className="icon" /> Profile
          </a>
        </li>
        <li className="logout-link">
          <a href="#">
            <FaSignOutAlt className="icon" /> Chiqish
          </a>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
