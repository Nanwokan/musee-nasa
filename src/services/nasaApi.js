const BASE_URL="https://images-api.nasa.gov";

// Transforme un item complexe de la NASA en un objet simple
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
    thumbUrl: link.href || ""
  };
}

export async function getMediasFromNASA(){
    fetch(`${BASE_URL}/search?q=apollo`)
    .then((res)=>res.json())
    .then((data))
    .catch((err)=>console.log(err))
}