import React from 'react';

const Layout = ({ children }) => (
  <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #fff 60%, #ff4500 100%)' }}>
    <main className="container py-4">
      {children}
    </main>
  </div>
);

export default Layout;
