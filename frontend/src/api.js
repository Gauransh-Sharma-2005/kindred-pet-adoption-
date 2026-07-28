// Base URL is empty by default because Vite's dev server proxies /api -> the
// Express backend (see vite.config.js). Set VITE_API_URL to point elsewhere
// (e.g. a deployed backend) for production builds.
const BASE_URL = "https://kindred-pet-adoption.vercel.app/";

async function request(path, options = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || `Request failed: ${res.status}`);
  }
  return res.json();
}

export function fetchPets({ query = '', species = 'All', gender = 'All' } = {}) {
  const params = new URLSearchParams({ query, species, gender });
  return request(`/api/pets?${params.toString()}`);
}

export function fetchPet(id) {
  return request(`/api/pets/${id}`);
}

export function createPet(pet) {
  return request('/api/pets', {
    method: 'POST',
    body: JSON.stringify(pet),
  });
}

export function updatePet(id, pet) {
  return request(`/api/pets/${id}`, {
    method: 'PUT',
    body: JSON.stringify(pet),
  });
}

export async function deletePet(id) {
  const res = await fetch(`${BASE_URL}/api/pets/${id}`, { method: 'DELETE' });
  if (!res.ok && res.status !== 204) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || `Request failed: ${res.status}`);
  }
}

export function submitAdoption({ petId, name, phone, livingEnvironment }) {
  return request('/api/adoptions', {
    method: 'POST',
    body: JSON.stringify({ petId, name, phone, livingEnvironment }),
  });
}

export function fetchFavorites(sessionId) {
  return request(`/api/favorites/${sessionId}`);
}

export function saveFavorites(sessionId, petIds) {
  return request(`/api/favorites/${sessionId}`, {
    method: 'PUT',
    body: JSON.stringify({ petIds }),
  });
}
