const STORAGE_KEY = "nasa-favorites";

// Lit les favoris sauvegardés dans le navigateur.
export function getFavorites() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
}

// Ajoute le média s'il n'est pas favori, ou le retire s'il l'est déjà.
export function toggleFavorite(media) {
  const favorites = getFavorites();
  const updated = favorites.some((item) => item.id === media.id)
    ? favorites.filter((item) => item.id !== media.id)
    : [...favorites, media];

  // Sauvegarde la nouvelle liste pour la conserver après fermeture du navigateur.
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  return updated;
}
