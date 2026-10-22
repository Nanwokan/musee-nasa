import { useState } from "react";
import { getFavorites, toggleFavorite } from "../services/favorites";
import { Heart, HeartPlus,  } from "lucide-react";

export default function FavoriteButton({ media, onToggle }) {
  // Vérifie si ce média est déjà enregistré comme favori.
  const [isFavorite, setIsFavorite] = useState(() =>
    getFavorites().some((item) => item.id === media.id),
  );

  // Inverse l'état du favori et informe la page si elle doit actualiser sa liste.
  function handleClick() {
    const favorites = toggleFavorite(media);
    setIsFavorite(favorites.some((item) => item.id === media.id));
    onToggle?.(favorites);
  }

  return (
    <button
      className="btn btn-ghost"
      type="button"
      aria-pressed={isFavorite}
      onClick={handleClick}
    >
      {/* L'icône change selon que le média est favori ou non. */}
      {isFavorite ? <HeartPlus/> : <Heart/>}
    </button>
  );
}
