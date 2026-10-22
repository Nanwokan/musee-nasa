const BASE_URL = "https://images-api.nasa.gov";

export function normalizeMedia(rawItem) {
  const data = rawItem.data?.[0] || {};
  const link = rawItem.links?.[0] || {};

  return {
    id: data.nasa_id || "",
    title: data.title || "Sans titre",
    description: data.description || "",
    date: data.date_created ? data.date_created.slice(0, 10) : "Date inconnue",
    mediaType: data.media_type || "image",
    center: data.center || "NASA",
    keywords: data.keywords || [],
    thumbUrl: link.href || "",
  };
}

export function getMediasFromNASA(query="apollo") {
  return fetch(`${BASE_URL}/search?q=${query}`)
    .then((res) => res.json())
    .then((data) => {
      return data.collection.items.map((item) => normalizeMedia(item));
    })
    .catch((error) => {
      console.error("Erreur lors de la requete NASA :", error);
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
