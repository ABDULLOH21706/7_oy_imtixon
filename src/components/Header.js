import React from 'react';
import { FaUserCircle, FaCog, FaSun } from 'react-icons/fa';

function Header() {
  return (
    <div className="header">
      <div className="breadcrumb">
        Asosiy &gt; <span>Menejerlar</span>
      </div>
      <div className="user-info">
        <FaSun className="settings-icon" title="Temani almashtirish" />
        <div>
          <div className="username">Usern88 Usern88</div>
          <div className="role">Manager</div>
        </div>
        <FaUserCircle className="user-icon" title="Profil" />
      </div>
    </div>
  );
}

export default Header;
