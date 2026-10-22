import MediaCard from "./mediaCard";

// Palier 1 : Galerie de médias affichée sous forme de liste/grille de cartes
export default function Galerie({ medias = [], onFavoriteChange }) {
  return (
    <ul className="galerie">
      {medias.map((media) => (
        // Chaque carte reçoit son média normalisé
        <MediaCard
          key={media.id}
          media={media}
          onFavoriteChange={onFavoriteChange}
        />
      ))}
    </ul>
  );
}