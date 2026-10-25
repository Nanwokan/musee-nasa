const STORAGE_KEY = "nasa-expositions";

export function getExpositions() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
}

function saveExpositions(expositions) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(expositions));
}

export function createExposition(title) {
  const exposition = {
    id: crypto.randomUUID(),
    title,
    description: "",
    medias: [],
  };

  const data = [...getExpositions(), exposition];
  saveExpositions(data);
  return data;
}
export function updateExposition(exposition) {
  const data = getExpositions().map((item) =>
    item.id === exposition.id ? exposition : item,
  );

  saveExpositions(data);
  return data;
}

export function deleteExposition(id) {
  const data = getExpositions().filter((item) => item.id !== id);

  saveExpositions(data);
  return data;
}
