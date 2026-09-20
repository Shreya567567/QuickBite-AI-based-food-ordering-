const API_KEY = import.meta.env.VITE_GEOAPIFY_API_KEY;

export const searchRestaurants = async (searchText) => {

  if (!searchText.trim()) return [];

  const url = `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(
    searchText
  )}&filter=countrycode:in&limit=5&apiKey=${API_KEY}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to search restaurant");
  }

  const data = await response.json();

  return data.features;
};