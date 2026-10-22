import { useState } from "react";
import Galerie from "../components/galerie";
import { getFavorites } from "../services/favorites";

export default function Favoris() {
  const [favorites, setFavorites] = useState(getFavorites);

  return (
    <>
      <h1>Mes favoris</h1>
      {favorites.length ? (
        <Galerie medias={favorites} onFavoriteChange={setFavorites} />
      ) : (
        <p>Vous n’avez pas encore de favoris.</p>
      )}
    </>
  );
}
