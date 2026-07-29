import { useState } from 'react';

const SPECIES_OPTIONS = ['Dog', 'Cat', 'Rabbit', 'Bird', 'Hamster'];
const EMPTY_FORM = {
  name: '', species: 'Dog', breed: '', age: '', ageGroup: 'Young', gender: 'Male',
  location: '', status: 'Available', description: '', fee: '', image: '',
  weight: '', color: '', vaccinated: false, sterilized: false, medicalStatus: '',
  temperament: '', favoriteFood: '', favoriteToy: '', likesText: '', dislikesText: '',
  energyLevel: 'Medium', trainingLevel: 'Basic', shelterName: '', rescueStory: '', routine: '',
};

// `pet` present => editing; absent => creating a new one.
export default function PetFormModal({ pet, onClose, onSubmit }) {
  const [form, setForm] = useState(() => pet
    ? {
        ...EMPTY_FORM,
        ...pet,
        likesText: (pet.likes || []).join(', '),
        dislikesText: (pet.dislikes || []).join(', '),
      }
    : EMPTY_FORM
  );
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const set = (field) => (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const { likesText, dislikesText, ...rest } = form;
      const payload = {
        ...rest,
        likes: likesText.split(',').map(s => s.trim()).filter(Boolean),
        dislikes: dislikesText.split(',').map(s => s.trim()).filter(Boolean),
      };
      await onSubmit(payload);
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const inputStyle = { width: '100%', padding: '0.55rem', borderRadius: '8px', border: '1px solid #ccc', marginBottom: '0.9rem', fontSize: '0.9rem' };
  const labelStyle = { fontSize: '0.78rem', fontWeight: 600, display: 'block', marginBottom: '0.25rem', opacity: 0.75 };
  const row2 = { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' };

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '1rem' }}>
      <div style={{ background: '#fff', color: '#000', padding: '2rem', borderRadius: '24px', width: '100%', maxWidth: '560px', maxHeight: '88vh', overflowY: 'auto', boxShadow: '0 20px 40px rgba(0,0,0,0.2)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
          <h3>{pet ? `Edit ${pet.name}` : 'Add a New Pet'}</h3>
          <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: '1.2rem', cursor: 'pointer' }}>×</button>
        </div>
        {error && (
          <div style={{ background: '#fdecea', color: '#c0392b', padding: '0.6rem 0.8rem', borderRadius: '8px', fontSize: '0.8rem', marginBottom: '1rem' }}>
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div style={row2}>
            <div>
              <label style={labelStyle}>Name *</label>
              <input style={inputStyle} required value={form.name} onChange={set('name')} />
            </div>
            <div>
              <label style={labelStyle}>Species *</label>
              <select style={inputStyle} value={form.species} onChange={set('species')}>
                {SPECIES_OPTIONS.map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
          </div>

          <div style={row2}>
            <div>
              <label style={labelStyle}>Breed</label>
              <input style={inputStyle} value={form.breed} onChange={set('breed')} />
            </div>
            <div>
              <label style={labelStyle}>Age (e.g. "2 years")</label>
              <input style={inputStyle} value={form.age} onChange={set('age')} />
            </div>
          </div>

          <div style={row2}>
            <div>
              <label style={labelStyle}>Age Group</label>
              <select style={inputStyle} value={form.ageGroup} onChange={set('ageGroup')}>
                <option>Puppy/Kitten</option><option>Young</option><option>Adult</option><option>Mature</option>
              </select>
            </div>
            <div>
              <label style={labelStyle}>Gender</label>
              <select style={inputStyle} value={form.gender} onChange={set('gender')}>
                <option>Male</option><option>Female</option>
              </select>
            </div>
          </div>

          <div style={row2}>
            <div>
              <label style={labelStyle}>Location</label>
              <input style={inputStyle} value={form.location} onChange={set('location')} />
            </div>
            <div>
              <label style={labelStyle}>Adoption Fee</label>
              <input style={inputStyle} placeholder="$150" value={form.fee} onChange={set('fee')} />
            </div>
          </div>

          <label style={labelStyle}>Photo URL</label>
          <input style={inputStyle} placeholder="https://..." value={form.image} onChange={set('image')} />

          <label style={labelStyle}>Description</label>
          <textarea style={{ ...inputStyle, minHeight: '60px' }} value={form.description} onChange={set('description')} />

          <div style={row2}>
            <div>
              <label style={labelStyle}>Weight</label>
              <input style={inputStyle} value={form.weight} onChange={set('weight')} />
            </div>
            <div>
              <label style={labelStyle}>Color</label>
              <input style={inputStyle} value={form.color} onChange={set('color')} />
            </div>
          </div>

          <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '0.9rem' }}>
            <label style={{ fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <input type="checkbox" checked={form.vaccinated} onChange={set('vaccinated')} /> Vaccinated
            </label>
            <label style={{ fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <input type="checkbox" checked={form.sterilized} onChange={set('sterilized')} /> Sterilized
            </label>
          </div>

          <label style={labelStyle}>Medical Status</label>
          <input style={inputStyle} value={form.medicalStatus} onChange={set('medicalStatus')} />

          <label style={labelStyle}>Temperament</label>
          <input style={inputStyle} value={form.temperament} onChange={set('temperament')} />

          <div style={row2}>
            <div>
              <label style={labelStyle}>Energy Level</label>
              <select style={inputStyle} value={form.energyLevel} onChange={set('energyLevel')}>
                <option>Low</option><option>Medium</option><option>High</option><option>Very High</option><option>Extreme</option>
              </select>
            </div>
            <div>
              <label style={labelStyle}>Training Level</label>
              <input style={inputStyle} value={form.trainingLevel} onChange={set('trainingLevel')} />
            </div>
          </div>

          <label style={labelStyle}>Likes (comma-separated)</label>
          <input style={inputStyle} value={form.likesText} onChange={set('likesText')} />

          <label style={labelStyle}>Dislikes (comma-separated)</label>
          <input style={inputStyle} value={form.dislikesText} onChange={set('dislikesText')} />

          <label style={labelStyle}>Shelter Name</label>
          <input style={inputStyle} value={form.shelterName} onChange={set('shelterName')} />

          <label style={labelStyle}>Rescue Story</label>
          <textarea style={{ ...inputStyle, minHeight: '60px' }} value={form.rescueStory} onChange={set('rescueStory')} />

          <label style={labelStyle}>Daily Routine</label>
          <textarea style={{ ...inputStyle, minHeight: '60px' }} value={form.routine} onChange={set('routine')} />

          {pet && (
            <>
              <label style={labelStyle}>Status</label>
              <select style={inputStyle} value={form.status} onChange={set('status')}>
                <option>Available</option><option>Reserved</option><option>Adopted</option>
              </select>
            </>
          )}

          <button type="submit" disabled={submitting} style={{ width: '100%', padding: '0.8rem', borderRadius: '12px', border: 'none', background: '#ff6b35', color: '#fff', fontWeight: 700, cursor: submitting ? 'default' : 'pointer', opacity: submitting ? 0.7 : 1, marginTop: '0.5rem' }}>
            {submitting ? 'Saving...' : pet ? 'Save Changes' : 'Add Pet'}
          </button>
        </form>
      </div>
    </div>
  );
}
