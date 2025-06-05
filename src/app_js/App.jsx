import React from 'react';
import '../index.css';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import ManagersPage from '../components/ManagersPage';

function App() {
  return (
    <div className="app-container">
      <Sidebar />
      <div className="main-content">
        <Header />
        <div className="page-content">
          <ManagersPage />
        </div>
      </div>
    </div>
  );
}

export default App;