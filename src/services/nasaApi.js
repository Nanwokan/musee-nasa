const BASE_URL = "https://images-api.nasa.gov";

// Palier 1 : Normalisation de la réponse brute de l'API de la NASA en un objet simple
// Aucun composant d'affichage ne manipule collection.items[0].data[0]
export function normalizeMedia(rawItem) {
  const data = rawItem.data?.[0] || {};
  // On recherche en priorité le lien d'aperçu (rel="preview"), sinon le premier lien disponible
  const previewLink = rawItem.links?.find((l) => l.rel === "preview") || rawItem.links?.[0] || {};
  
  // Convertir http:// en https:// pour éviter les erreurs de contenu mixte sur le web
  const rawThumb = previewLink.href || "";
  const thumbUrl = rawThumb.startsWith("http://") ? rawThumb.replace("http://", "https://") : rawThumb;

  return {
    id: data.nasa_id || "",
    title: data.title || "Sans titre",
    description: data.description || "",
    // Formatage propre de la date (AAAA-MM-JJ)
    date: data.date_created ? data.date_created.slice(0, 10) : "Date inconnue",
    mediaType: data.media_type || "image",
    center: data.center || "NASA",
    keywords: data.keywords || [],
    thumbUrl: thumbUrl,
  };
}

// Palier 1 : Recherche dans la photothèque de la NASA avec gestion des erreurs
export function getMediasFromNASA(query = "apollo") {
  // Sécurisation du terme recherché pour éviter les caractères spéciaux non encodés
  const searchTerm = encodeURIComponent((query || "").trim() || "apollo");

  return fetch(`${BASE_URL}/search?q=${searchTerm}`)
    .then((res) => {
      // Si la réponse HTTP n'est pas OK (404, 500, etc.), on déclenche une erreur
      if (!res.ok) {
        throw new Error(`Erreur HTTP : ${res.status}`);
      }
      return res.json();
    })
    .then((data) => {
      // Vérification que les items existent bien dans la collection
      const items = data.collection?.items || [];
      return items.map((item) => normalizeMedia(item));
    })
    .catch((error) => {
      console.error("Erreur lors de la requête NASA :", error);
      // On propage l'erreur pour que les composants puissent afficher le message d'erreur à l'utilisateur
      throw error;
    });
}

export function getMediaById(id) {
  return fetch(`${BASE_URL}/search?nasa_id=${encodeURIComponent(id)}`)
    .then((res) => res.json())
    .then((data) => {
      const item = data.collection.items[0] 
      return item ? normalizeMedia(item) : null;
    })
    .catch((error) => {
      console.error("Erreur lors de la requete NASA :", error);
    });
}
