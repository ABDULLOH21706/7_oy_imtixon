import React, { useState, useEffect } from 'react';

function ManagersPage() {
  const [managers, setManagers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchManagers = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/managers');
        if (!response.ok) {
          throw new Error(`HTTP xatosi! Status: ${response.status}`);
        }
        const data = await response.json();
        setManagers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchManagers();
  }, []);

  if (loading) {
    return <div className="loading-message">Yuklanmoqda...</div>;
  }

  if (error) {
    return <div className="error-message">Ma'lumotlarni yuklashda xato yuz berdi: {error}</div>;
  }

  return (
    <div className="managers-page">
      <h2>Foydalanuvchilar ro'yxati</h2>
      <div className="managers-table-container">
        <table className="managers-table">
          <thead>
            <tr>
              <th>Ism</th>
              <th>Familiya</th>
              <th>Email</th>
              <th>Rol</th>
              <th>Holat</th>
              <th>Amallar</th>
            </tr>
          </thead>
          <tbody>
            {managers.map((manager) => (
              <tr key={manager.id}>
                <td>{manager.ism}</td>
                <td>{manager.familiya}</td>
                <td>{manager.email}</td>
                <td>{manager.rol}</td>
                <td>{manager.holat}</td>
                <td className="actions-cell">...</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ManagersPage;