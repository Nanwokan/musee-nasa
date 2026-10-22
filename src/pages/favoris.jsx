import { useState } from "react";
import Galerie from "../components/galerie";
import { getFavorites } from "../services/favorites";

export default function Favoris() {
  // Récupère les favoris enregistrés dans le navigateur à l'ouverture de la page.
  const [favorites, setFavorites] = useState(getFavorites);

  return (
    <>
      <h1>Mes favoris</h1>
      {/* Affiche la galerie si des favoris existent, sinon un message vide. */}
      {favorites.length ? (
        // La galerie actualise cette liste quand un favori est retiré.
        <Galerie medias={favorites} onFavoriteChange={setFavorites} />
      ) : (
        <p>Vous n’avez pas encore de favoris.</p>
      )}
    </>
  );
}
