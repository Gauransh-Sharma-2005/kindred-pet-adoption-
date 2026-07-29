import { useContext } from 'react';
import ThemeContext from '../context/ThemeContext.jsx';
import QRCodeGenerator from './QRCodeGenerator.jsx';

export default function PetDetails({ pet, onBackHome, onAdoptClick, onEditClick, onDeleteClick }) {
  const { darkMode } = useContext(ThemeContext);

  if (!pet) return null;

  return (
    <div style={{ maxWidth: '1000px', margin: '2rem auto', padding: '0 1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <button onClick={onBackHome} style={{ background: 'none', border: 'none', color: '#ff6b35', cursor: 'pointer', fontWeight: 600 }}>← Back to Showcase Hub</button>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button onClick={() => onEditClick(pet)} style={{ background: 'none', border: '1px solid #ff6b35', color: '#ff6b35', borderRadius: '99px', padding: '0.4rem 1rem', fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer' }}>
            Edit
          </button>
          <button onClick={() => onDeleteClick(pet)} style={{ background: 'none', border: '1px solid #c0392b', color: '#c0392b', borderRadius: '99px', padding: '0.4rem 1rem', fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer' }}>
            Delete
          </button>
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2.5rem' }}>
        <div>
          <img src={pet.image} alt={pet.name} style={{ width: '100%', height: '400px', objectFit: 'cover', borderRadius: '24px', boxShadow: '0 15px 30px rgba(0,0,0,0.1)' }} />
          <div style={{ marginTop: '1.5rem', padding: '1.5rem', borderRadius: '20px', background: 'rgba(255,107,53,0.05)', border: '1px dashed #ff6b35', textAlign: 'center' }}>
            <span style={{ fontSize: '1.2rem' }}>📹 Virtual Reality Interaction Stream Enabled</span>
          </div>
        </div>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 800 }}>{pet.name}</h2>
            <QRCodeGenerator value={pet.id} />
          </div>
          <p style={{ color: '#ff6b35', fontWeight: 600, marginBottom: '1.5rem' }}>{pet.breed} • {pet.id}</p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
            <div style={{ padding: '0.75rem', background: 'rgba(0,0,0,0.03)', borderRadius: '12px' }}><strong>Age:</strong> {pet.age}</div>
            <div style={{ padding: '0.75rem', background: 'rgba(0,0,0,0.03)', borderRadius: '12px' }}><strong>Weight:</strong> {pet.weight}</div>
            <div style={{ padding: '0.75rem', background: 'rgba(0,0,0,0.03)', borderRadius: '12px' }}><strong>Energy:</strong> {pet.energyLevel}</div>
            <div style={{ padding: '0.75rem', background: 'rgba(0,0,0,0.03)', borderRadius: '12px' }}><strong>Training:</strong> {pet.trainingLevel}</div>
          </div>
          <p style={{ lineHeight: 1.6, marginBottom: '1.5rem', opacity: 0.9 }}>{pet.description}</p>
          <h4 style={{ marginBottom: '0.5rem' }}>Rescue Narrative</h4>
          <p style={{ fontStyle: 'italic', opacity: 0.7, marginBottom: '2rem' }}>"{pet.rescueStory}"</p>
          <div style={{ padding: '1.2rem', borderRadius: '16px', background: darkMode ? '#2a2a2a' : '#fff9f3', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div><span style={{ fontSize: '0.8rem', opacity: 0.6 }}>Adoption Fee</span><h3 style={{ color: '#ff6b35', fontWeight: 800 }}>{pet.fee}</h3></div>
            <button
              onClick={() => onAdoptClick(pet)} disabled={pet.status !== 'Available'}
              style={{ padding: '0.75rem 2rem', borderRadius: '12px', border: 'none', background: 'linear-gradient(135deg, #ff6b35 0%, #e0531a 100%)', color: '#fff', fontWeight: 700, cursor: 'pointer' }}
            >
              Apply Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
