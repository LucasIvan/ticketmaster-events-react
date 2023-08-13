import { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { Link } from 'react-router-dom';

const Navbar = forwardRef(({ onSearch }, ref) => {
  const [search, setSearch] = useState('');

  useImperativeHandle(ref, () => ({
    search,
  }));

  const handleInputChange = (event) => {
    setSearch(event.target.value);
  };

  const handleInputKeyDown = (event) => {
    if (event.key === 'Enter') {
      onSearch(search);
    }
  };

  return (
    <div ref={ref} style={{
      marginBottom: 14,
      width: '100%',
      display: 'flex'
    }}>
      <div style={{ flex: 1, display: 'flex' }}>
        <p style={{
          fontSize: 24,
          fontWeight: 'bold'
        }}>Navbar</p>
      </div>
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
        <input
          placeholder='Busca tu evento favorito'
          onChange={handleInputChange}
          onKeyDown={handleInputKeyDown}
          value={search}
          style={{
            fontSize: 16,
            padding: '6px 12px',
            border: 'none',
            borderRadius: 4,
            width: 200,
          }}
        />
        <Link to={'/profile/my-info'} style={{
          marginLeft: 24,
          color: '#FFF',
          textDecoration: 'none',

        }}>Mi Perfil</Link>
      </div>
    </div>
  );
});

Navbar.displayName = 'Navbar';

export default Navbar;