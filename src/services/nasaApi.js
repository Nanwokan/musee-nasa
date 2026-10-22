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

export function getMediasFromNASA(
  query = "apollo",
  type = "",
  startYear = "1900",
  endYear = "2026",
) {
  const params = new URLSearchParams({
    q: query,
    year_start: startYear,
    year_end: endYear,
  });
  if(type) {params.set("media_type", type)}
  return fetch(`${BASE_URL}/search?${params}`)
    .then((res) => {
      if (!res.ok) throw new Error(`Erreur HTTP : ${res.status}`);
      return res.json();
    })
    .then((data) => {
      return data.collection.items.map((item) => normalizeMedia(item));
    });
}

export function getMediaById(id) {
  return fetch(`${BASE_URL}/search?nasa_id=${id}`)
    .then((res) => res.json())
    .then((data) => {
      const item = data.collection.items[0];
      return item ? normalizeMedia(item) : null;
    })
    .catch((error) => {
      console.error("Erreur lors de la requete NASA :", error);
    });
}

export function getAssetMedia(media) {
  return fetch(`${BASE_URL}/asset/${encodeURIComponent(media.id)}`)
    .then((res) => {
      if (!res.ok) {
        throw new Error(`Erreur HTTP : ${res.status}`);
      }

      return res.json();
    })
    .then((data) => {
      const files = (data.collection?.items || [])
        .map((item) => item.href)
        .filter((href) => {
          return href && /\.(jpg|jpeg|png)$/i.test(href.split("?")[0]);
        });

      const largeImage = files.find((href) => href.includes("~large."));
      const mediumImage = files.find((href) => href.includes("~medium."));

      return largeImage || mediumImage || media.thumbUrl;
    });
}

// Récupère l'adresse du fichier audio ou vidéo associé au média.
export function getPlayableMediaUrl(media) {

  // L'API NASA renvoie les fichiers disponibles pour cet identifiant de média.
  return fetch(`${BASE_URL}/asset/${encodeURIComponent(media.id)}`)
    .then((res) => {
      if (!res.ok) throw new Error(`Erreur HTTP : ${res.status}`);
      return res.json();
    })
    .then((data) => {
      const isVideo = media.mediaType === "video";
      const extension = isVideo ? /\.mp4$/i : /\.(mp3|m4a|wav|ogg)$/i;
      // Garde seulement les fichiers que le lecteur vidéo ou audio peut utiliser.
      const files = (data.collection?.items || [])
        .map((item) => item.href)
        .filter((href) => href && extension.test(href.split("?")[0]));

      // Privilégie une version légère pour que la lecture démarre plus vite.
      const preferredVersions = isVideo ? ["~small.", "~medium."] : ["~64k.", "~128k."];
      const file = preferredVersions
        .map((version) => files.find((href) => href.includes(version)))
        .find(Boolean) || files[0];

      if (!file) throw new Error("Aucun fichier audio ou vidéo disponible.");
      // Convertit les liens HTTP en HTTPS pour la lecture dans l'application.
      return file.startsWith("http://")
        ? file.replace("http://", "https://")
        : file;
    });
}
