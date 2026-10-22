const STORAGE_KEY = "nasa-favorites";

export function getFavorites() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
}

export function toggleFavorite(media) {
  const favorites = getFavorites();
  const updated = favorites.some((item) => item.id === media.id)
    ? favorites.filter((item) => item.id !== media.id)
    : [...favorites, media];

  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  return updated;
}
