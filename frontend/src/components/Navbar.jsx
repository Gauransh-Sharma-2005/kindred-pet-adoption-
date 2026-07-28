import { useContext } from 'react';
import ThemeContext from '../context/ThemeContext.jsx';

export default function Navbar({ onNavigateHome, favoritesCount, onAddPetClick }) {
  const { darkMode, setDarkMode } = useContext(ThemeContext);

  return (
    <nav style={{
      position: 'sticky', top: 0, zIndex: 100, backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
      backgroundColor: darkMode ? 'rgba(18, 18, 18, 0.8)' : 'rgba(253, 251, 247, 0.85)',
      borderBottom: darkMode ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid rgba(45, 37, 30, 0.08)',
      padding: '1rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', transition: 'all 0.3s'
    }}>
      <div onClick={onNavigateHome} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <span style={{ fontSize: '1.5rem' }}>🐾</span>
        <span style={{ fontSize: '1.4rem', fontWeight: 800, letterSpacing: '-0.03em', color: darkMode ? '#ffffff' : '#2d251e' }}>
          kindred<span style={{ color: '#ff6b35' }}>.</span>
        </span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
        <button
          onClick={onAddPetClick}
          style={{ background: '#ff6b35', color: '#fff', border: 'none', borderRadius: '99px', padding: '0.5rem 1.1rem', fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer' }}
        >
          + Add Pet
        </button>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.9rem', fontWeight: 600 }}>
          <span style={{ color: '#ff6b35' }}>❤️</span>
          <span>{favoritesCount} Saved</span>
        </div>
        <button
          onClick={() => setDarkMode(!darkMode)}
          style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.3rem' }}
        >
          {darkMode ? '☀️' : '🌙'}
        </button>
      </div>
    </nav>
  );
}
