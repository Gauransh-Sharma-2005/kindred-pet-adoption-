import { useState } from 'react';

export default function AdoptionModal({ pet, onClose, onSubmit }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [livingEnvironment, setLivingEnvironment] = useState('Apartment Complex');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      await onSubmit({ petId: pet.id, name, phone, livingEnvironment });
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', zIndex: 1000, padding: '1rem', justifyContent: 'center' }}>
      <div style={{ background: '#fff', color: '#000', padding: '2rem', borderRadius: '24px', width: '100%', maxWidth: '480px', boxShadow: '0 20px 40px rgba(0,0,0,0.2)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
          <h3>Adoption Application</h3>
          <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: '1.2rem', cursor: 'pointer' }}>×</button>
        </div>
        <div style={{ background: '#ff6b35', color: '#fff', padding: '0.75rem', borderRadius: '12px', fontSize: '0.8rem', fontWeight: 600, marginBottom: '1rem' }}>
          Target Profile: {pet.name} ({pet.id}) • Fee: {pet.fee}
        </div>
        {error && (
          <div style={{ background: '#fdecea', color: '#c0392b', padding: '0.6rem 0.8rem', borderRadius: '8px', fontSize: '0.8rem', marginBottom: '1rem' }}>
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <label style={{ fontSize: '0.8rem', fontWeight: 600, display: 'block', marginBottom: '0.25rem' }}>Full Name</label>
          <input type="text" required value={name} onChange={e => setName(e.target.value)} style={{ width: '100%', padding: '0.6rem', borderRadius: '8px', border: '1px solid #ccc', marginBottom: '1rem' }} />

          <label style={{ fontSize: '0.8rem', fontWeight: 600, display: 'block', marginBottom: '0.25rem' }}>Phone Number</label>
          <input type="tel" required value={phone} onChange={e => setPhone(e.target.value)} style={{ width: '100%', padding: '0.6rem', borderRadius: '8px', border: '1px solid #ccc', marginBottom: '1rem' }} />

          <label style={{ fontSize: '0.8rem', fontWeight: 600, display: 'block', marginBottom: '0.25rem' }}>Living Environment</label>
          <select value={livingEnvironment} onChange={e => setLivingEnvironment(e.target.value)} style={{ width: '100%', padding: '0.6rem', borderRadius: '8px', border: '1px solid #ccc', marginBottom: '1.5rem' }}>
            <option>Apartment Complex</option>
            <option>Independent Suburban Estate</option>
            <option>Rural Open Farm</option>
          </select>
          <button type="submit" disabled={submitting} style={{ width: '100%', padding: '0.8rem', borderRadius: '12px', border: 'none', background: '#ff6b35', color: '#fff', fontWeight: 700, cursor: submitting ? 'default' : 'pointer', opacity: submitting ? 0.7 : 1 }}>
            {submitting ? 'Submitting...' : 'Submit Formal Request'}
          </button>
        </form>
      </div>
    </div>
  );
}
