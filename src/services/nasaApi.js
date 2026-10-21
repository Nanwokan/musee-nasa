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

export function getMediasFromNASA() {
  fetch(`${BASE_URL}/search?media_type=image,video,audio`)
    .then((res) => res.json())
    .then((data) => {
        return data.collection.items.map((item) => {
            normalizeMedia(item)
        })
    })
    .catch((error) => {
      console.error("NASA API request failed:", error);
    });
}