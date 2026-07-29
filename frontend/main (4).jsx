import { useContext, useState } from 'react';
import ThemeContext from '../context/ThemeContext.jsx';
import FavoritesContext from '../context/FavoritesContext.jsx';
import QRCodeGenerator from './QRCodeGenerator.jsx';

export default function PetCard({ pet, onCardClick, onAdoptClick }) {
  const { darkMode } = useContext(ThemeContext);
  const { favorites, toggleFavorite } = useContext(FavoritesContext);
  const [hover, setHover] = useState(false);
  const isFav = favorites.includes(pet.id);
  const isAvailable = pet.status === 'Available';

  return (
    <div
      onClick={onCardClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        borderRadius: '24px', overflow: 'hidden', cursor: 'pointer', position: 'relative',
        backgroundColor: darkMode ? 'rgba(30, 30, 30, 0.7)' : 'rgba(255, 255, 255, 0.7)',
        backdropFilter: 'blur(20px)', border: '1px solid rgba(0,0,0,0.05)',
        transform: hover ? 'translateY(-6px)' : 'translateY(0)',
        boxShadow: hover ? '0 20px 40px rgba(0,0,0,0.12)' : '0 10px 20px rgba(0,0,0,0.02)',
        transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
      }}
    >
      <button
        onClick={(e) => { e.stopPropagation(); toggleFavorite(pet.id); }}
        style={{ position: 'absolute', top: '1rem', right: '1rem', zIndex: 10, background: '#fff', border: 'none', borderRadius: '50%', width: '36px', height: '36px', cursor: 'pointer', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}
      >
        <span style={{ filter: isFav ? 'none' : 'grayscale(100%)' }}>❤️</span>
      </button>

      <img src={pet.image} alt={pet.name} style={{ width: '100%', height: '220px', objectFit: 'cover' }} />

      <div style={{ padding: '1.25rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 700 }}>{pet.name}</h3>
            <p style={{ fontSize: '0.8rem', opacity: 0.6 }}>{pet.breed}</p>
          </div>
          <div style={{ transform: hover ? 'scale(1.08) rotate(4deg)' : 'scale(1)', transition: 'transform 0.3s' }}>
            <QRCodeGenerator value={pet.id} />
          </div>
        </div>
        <div style={{ display: 'flex', gap: '0.4rem', margin: '1rem 0', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '0.75rem', padding: '0.25rem 0.5rem', borderRadius: '6px', background: 'rgba(255, 107, 53, 0.1)', color: '#ff6b35', fontWeight: 600 }}>{pet.age}</span>
          <span style={{ fontSize: '0.75rem', padding: '0.25rem 0.5rem', borderRadius: '6px', background: 'rgba(0,0,0,0.05)' }}>{pet.gender}</span>
          <span style={{ fontSize: '0.75rem', padding: '0.25rem 0.5rem', borderRadius: '6px', background: pet.status === 'Available' ? 'rgba(40,167,69,0.15)' : '#eee', color: pet.status === 'Available' ? '#28a745' : '#777' }}>{pet.status}</span>
        </div>
        <button
          onClick={(e) => { e.stopPropagation(); onAdoptClick(pet); }}
          disabled={!isAvailable}
          style={{
            width: '100%', padding: '0.75rem', borderRadius: '12px', border: 'none', fontWeight: 600, fontSize: '0.85rem',
            background: isAvailable ? 'linear-gradient(135deg, #ff6b35 0%, #e0531a 100%)' : '#ccc',
            color: '#fff', cursor: isAvailable ? 'pointer' : 'not-allowed'
          }}
        >
          {isAvailable ? 'Interested in Adoption' : 'Adopted'}
        </button>
      </div>
    </div>
  );
}
