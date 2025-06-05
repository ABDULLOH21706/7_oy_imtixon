import React from 'react';

interface DashboardHomeProps {
  loggedInEmail: string;
}

const DashboardHome: React.FC<DashboardHomeProps> = ({ loggedInEmail }) => {
  return (
    <div className="">
      <p>Asosiy</p>
    </div>
  );
};

export default DashboardHome;