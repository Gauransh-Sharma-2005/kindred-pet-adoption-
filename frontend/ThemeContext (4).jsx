import { useEffect, useState, useCallback } from 'react';
import ThemeContext from './context/ThemeContext.jsx';
import FavoritesContext from './context/FavoritesContext.jsx';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import SearchBar from './components/SearchBar.jsx';
import SkeletonCard from './components/SkeletonCard.jsx';
import PetCard from './components/PetCard.jsx';
import PetDetails from './components/PetDetails.jsx';
import AdoptionModal from './components/AdoptionModal.jsx';
import PetFormModal from './components/PetFormModal.jsx';
import SuccessModal from './components/SuccessModal.jsx';
import Footer from './components/Footer.jsx';
import { fetchPets, fetchPet, submitAdoption, fetchFavorites, saveFavorites, createPet, updatePet, deletePet } from './api.js';

// Stable anonymous id so favorites persist for this browser across visits,
// without requiring a login system.
function getSessionId() {
  let id = localStorage.getItem('k-session');
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem('k-session', id);
  }
  return id;
}

export default function App() {
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('k-dark') === 'true');
  const [favorites, setFavorites] = useState([]);
  const [filters, setFilters] = useState({ query: '', species: 'All', gender: 'All' });
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPetId, setSelectedPetId] = useState(null);
  const [currentPet, setCurrentPet] = useState(null);
  const [activePetForModal, setActivePetForModal] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [sessionId] = useState(getSessionId);
  // null = closed; 'new' = create form; a pet object = edit form
  const [petFormTarget, setPetFormTarget] = useState(null);

  useEffect(() => localStorage.setItem('k-dark', darkMode), [darkMode]);

  // Load this browser's saved favorites from the backend on first mount.
  useEffect(() => {
    fetchFavorites(sessionId).then(setFavorites).catch(() => setFavorites([]));
  }, [sessionId]);

  // Re-fetch the pet list whenever a filter changes.
  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    const timeout = setTimeout(() => {
      fetchPets(filters)
        .then(data => { if (!cancelled) setPets(data); })
        .catch(() => { if (!cancelled) setPets([]); })
        .finally(() => { if (!cancelled) setLoading(false); });
    }, 200); // small debounce so typing in search doesn't spam the API
    return () => { cancelled = true; clearTimeout(timeout); };
  }, [filters]);

  // Load full details for whichever pet the user has selected.
  useEffect(() => {
    if (!selectedPetId) { setCurrentPet(null); return; }
    fetchPet(selectedPetId).then(setCurrentPet).catch(() => setCurrentPet(null));
  }, [selectedPetId]);

  const toggleFavorite = useCallback((id) => {
    setFavorites(prev => {
      const next = prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id];
      saveFavorites(sessionId, next).catch(() => {});
      return next;
    });
  }, [sessionId]);

  const handleAdoptionSubmit = async (formData) => {
    await submitAdoption(formData);
    setActivePetForModal(null);
    setShowSuccess(true);
    // The pet's status just flipped to "Reserved" on the backend; refresh views.
    fetchPets(filters).then(setPets).catch(() => {});
    if (selectedPetId === formData.petId) {
      fetchPet(formData.petId).then(setCurrentPet).catch(() => {});
    }
  };

  const handlePetFormSubmit = async (payload) => {
    if (petFormTarget && petFormTarget !== 'new') {
      const updated = await updatePet(petFormTarget.id, payload);
      if (selectedPetId === updated.id) setCurrentPet(updated);
    } else {
      await createPet(payload);
    }
    setPetFormTarget(null);
    fetchPets(filters).then(setPets).catch(() => {});
  };

  const handleDeletePet = async (pet) => {
    if (!window.confirm(`Delete ${pet.name}? This also removes any adoption applications and favorites for this pet. This can't be undone.`)) {
      return;
    }
    await deletePet(pet.id);
    setSelectedPetId(null);
    fetchPets(filters).then(setPets).catch(() => {});
  };

  return (
    <ThemeContext.Provider value={{ darkMode, setDarkMode }}>
      <FavoritesContext.Provider value={{ favorites, toggleFavorite }}>
        <div style={{
          backgroundColor: darkMode ? '#121212' : '#fdfbf7',
          color: darkMode ? '#e5e5e5' : '#2d251e',
          minHeight: '100vh', transition: 'background-color 0.3s'
        }}>
          <Navbar onNavigateHome={() => setSelectedPetId(null)} favoritesCount={favorites.length} onAddPetClick={() => setPetFormTarget('new')} />

          {selectedPetId ? (
            <PetDetails
              pet={currentPet}
              onBackHome={() => setSelectedPetId(null)}
              onAdoptClick={setActivePetForModal}
              onEditClick={setPetFormTarget}
              onDeleteClick={handleDeletePet}
            />
          ) : (
            <>
              <Hero onExploreClick={() => document.getElementById('gallery').scrollIntoView({ behavior: 'smooth' })} />
              <div id="gallery" style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 1.5rem 4rem 1.5rem' }}>
                <SearchBar filters={filters} setFilters={setFilters} />
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '2rem' }}>
                  {loading
                    ? Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
                    : pets.map(pet => (
                        <PetCard key={pet.id} pet={pet} onCardClick={() => setSelectedPetId(pet.id)} onAdoptClick={setActivePetForModal} />
                      ))
                  }
                  {!loading && pets.length === 0 && (
                    <p style={{ opacity: 0.6, gridColumn: '1 / -1', textAlign: 'center', padding: '2rem' }}>
                      No pets match those filters yet — try widening your search.
                    </p>
                  )}
                </div>
              </div>
            </>
          )}
          <Footer />
          {activePetForModal && (
            <AdoptionModal
              pet={activePetForModal}
              onClose={() => setActivePetForModal(null)}
              onSubmit={handleAdoptionSubmit}
            />
          )}
          {showSuccess && <SuccessModal onClose={() => setShowSuccess(false)} />}
          {petFormTarget && (
            <PetFormModal
              pet={petFormTarget === 'new' ? null : petFormTarget}
              onClose={() => setPetFormTarget(null)}
              onSubmit={handlePetFormSubmit}
            />
          )}
        </div>
      </FavoritesContext.Provider>
    </ThemeContext.Provider>
  );
}
