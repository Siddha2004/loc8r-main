const API_BASE_URL = '/api';

export const fetchPlaces = async (lng: number, lat: number, maxDistance: number) => {
  const response = await fetch(
    `${API_BASE_URL}/places?lng=${lng}&lat=${lat}&maxDistance=${maxDistance}`
  );
  
  if (!response.ok) {
    throw new Error('Failed to fetch places');
  }
  
  return response.json();
};

export const createPlace = async (placeData: any) => {
  const response = await fetch(`${API_BASE_URL}/places`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(placeData),
  });
  
  if (!response.ok) {
    throw new Error('Failed to create place');
  }
  
  return response.json();
};

export const getPlace = async (id: string) => {
  const response = await fetch(`${API_BASE_URL}/places/${id}`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch place');
  }
  
  return response.json();
};

export const updatePlace = async (id: string, placeData: any) => {
  const response = await fetch(`${API_BASE_URL}/places/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(placeData),
  });
  
  if (!response.ok) {
    throw new Error('Failed to update place');
  }
  
  return response.json();
};

export const deletePlace = async (id: string) => {
  const response = await fetch(`${API_BASE_URL}/places/${id}`, {
    method: 'DELETE',
  });
  
  if (!response.ok) {
    throw new Error('Failed to delete place');
  }
  
  return response.json();
};