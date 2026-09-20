const API_KEY = import.meta.env.VITE_GEOAPIFY_API_KEY;

export const fetchNearbyRestaurants = async (lat, lon) => {
  const radius = 5000;

  const url = `https://api.geoapify.com/v2/places?categories=catering.restaurant&filter=circle:${lon},${lat},${radius}&limit=20&apiKey=${API_KEY}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch restaurants");
  }

  const data = await response.json();

  return data.features;
};