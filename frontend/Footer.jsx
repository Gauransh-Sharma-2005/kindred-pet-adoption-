import { useContext } from 'react';
import ThemeContext from '../context/ThemeContext.jsx';

export default function Hero({ onExploreClick }) {
  const { darkMode } = useContext(ThemeContext);

  return (
    <div style={{ padding: '5rem 2rem 3rem 2rem', textAlign: 'center', maxWidth: '900px', margin: '0 auto' }}>
      <h1 style={{
        fontSize: 'clamp(2.5rem, 5vw, 4.2rem)', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1.1, marginBottom: '1.5rem',
        color: darkMode ? '#ffffff' : '#2d251e'
      }}>
        Find Your <span style={{ background: 'linear-gradient(135deg, #ff6b35 0%, #ff9f1c 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Forever Friend</span>
      </h1>
      <p style={{ fontSize: 'clamp(1.1rem, 2vw, 1.25rem)', fontWeight: 400, marginBottom: '2.5rem', opacity: 0.8, lineHeight: 1.5 }}>
        Every pet has a structural story. Meet them, know them, provide them a home.
      </p>
      <button
        onClick={onExploreClick}
        style={{
          background: 'linear-gradient(135deg, #ff6b35 0%, #e0531a 100%)', color: '#fff', border: 'none',
          padding: '1rem 2.5rem', borderRadius: '99px', fontSize: '1rem', fontWeight: 600, cursor: 'pointer',
          boxShadow: '0 10px 25px rgba(255, 107, 53, 0.25)', transition: 'transform 0.2s'
        }}
        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.03)'}
        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
      >
        Explore Adoptable Pets
      </button>
    </div>
  );
}
