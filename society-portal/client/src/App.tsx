import React, { useState, useEffect } from 'react';
import { AuthGateway } from './components/auth/AuthGateway';
import { ResidentDashboard } from './components/resident/ResidentDashboard';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { UserRole } from './types/portal';

export function App() {
  const [currentRole, setCurrentRole] = useState<'guest' | UserRole>(() => {
    const saved = localStorage.getItem('courtyard_user_role');
    return saved === 'resident' || saved === 'admin' ? saved : 'guest';
  });

  const handleLogin = (role: UserRole) => {
    setCurrentRole(role);
    localStorage.setItem('courtyard_user_role', role);
  };

  const handleLogout = () => {
    setCurrentRole('guest');
    localStorage.removeItem('courtyard_user_role');
  };

  return (
    <div className="w-full min-h-screen bg-[#0d0e12] text-white">
      {currentRole === 'guest' && <AuthGateway onLogin={handleLogin} />}
      {currentRole === 'resident' && <ResidentDashboard onLogout={handleLogout} />}
      {currentRole === 'admin' && <AdminDashboard onLogout={handleLogout} />}
    </div>
  );
}

export default App;
