import { useContext } from 'react';
import ThemeContext from '../context/ThemeContext.jsx';

export default function SearchBar({ filters, setFilters }) {
  const { darkMode } = useContext(ThemeContext);

  const inputStyle = {
    padding: '0.75rem 1rem', borderRadius: '12px', fontSize: '0.9rem', outline: 'none',
    border: darkMode ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.1)',
    backgroundColor: darkMode ? '#1e1e1e' : '#ffffff', color: darkMode ? '#ffffff' : '#2d251e',
  };

  return (
    <div style={{
      display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem',
      padding: '1.5rem', borderRadius: '20px', marginBottom: '3rem',
      backgroundColor: darkMode ? 'rgba(30, 30, 30, 0.6)' : 'rgba(255, 255, 255, 0.6)',
      backdropFilter: 'blur(20px)', border: '1px solid rgba(0,0,0,0.05)'
    }}>
      <input
        type="text" placeholder="Search name or breed..." value={filters.query}
        onChange={e => setFilters(p => ({ ...p, query: e.target.value }))} style={{ ...inputStyle, gridColumn: 'span 2' }}
      />
      <select value={filters.species} onChange={e => setFilters(p => ({ ...p, species: e.target.value }))} style={inputStyle}>
        <option value="All">All Species</option>
        <option value="Dog">Dog</option>
        <option value="Cat">Cat</option>
        <option value="Rabbit">Rabbit</option>
        <option value="Bird">Bird</option>
        <option value="Hamster">Hamster</option>
      </select>
      <select value={filters.gender} onChange={e => setFilters(p => ({ ...p, gender: e.target.value }))} style={inputStyle}>
        <option value="All">Any Gender</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
      </select>
    </div>
  );
}
