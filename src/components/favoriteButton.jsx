import { useState } from "react";
import { getFavorites, toggleFavorite } from "../services/favorites";
import { Heart, HeartPlus,  } from "lucide-react";
export default function FavoriteButton({ media, onToggle }) {
  const [isFavorite, setIsFavorite] = useState(() =>
    getFavorites().some((item) => item.id === media.id),
  );

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
      {isFavorite ? <HeartPlus/> : <Heart/>}
    </button>
  );
}
