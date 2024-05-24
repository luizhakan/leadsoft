const Header = () => {
    const handleLogout = () => {
      localStorage.removeItem('isLoggedIn');
      window.location.href = '/login';
    }

  return (
    <header style={{ backgroundColor: '#383837', padding: '16px' }}>
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ color: '#10D1E9', fontSize: '1.125rem', fontWeight: 'bold' }}>LeadSoft</div>
        <div style={{ display: 'flex', gap: '16px' }}>
          <a href="/items" style={{ backgroundColor: '#145EF4', color: '#fff', padding: '8px 16px', borderRadius: '4px', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>Items</a>
          <a href="/users" style={{ backgroundColor: '#145EF4', color: '#fff', padding: '8px 16px', borderRadius: '4px', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>Users</a>
          <button style={{ backgroundColor: '#145EF4', color: '#fff', padding: '8px 16px', borderRadius: '4px', border: 'none', cursor: 'pointer' }} onClick={handleLogout}>Logout</button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
