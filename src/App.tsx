import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import LoginCard from './pages/login/sign_in';
import Dashboard from './pages/asosiy/asosiy'; 

const DashboardWrapper: React.FC = () => {
  const navigate = useNavigate();
  const loggedInEmail = localStorage.getItem('loggedInEmail');

  useEffect(() => {
    if (!loggedInEmail) {
      navigate('/', { replace: true });
    }
  }, [loggedInEmail, navigate]);

  if (!loggedInEmail) {
    return null;
  }

  return <Dashboard loggedInEmail={loggedInEmail} />;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginCard />} />
        <Route path="/dashboard/*" element={<DashboardWrapper />} />
      </Routes>
    </Router>
  );
}

export default App;