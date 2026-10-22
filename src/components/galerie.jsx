import MediaCard from "./mediaCard";

// Palier 1 : Galerie de médias affichée sous forme de liste/grille de cartes
export default function Galerie({ medias = [] }) {
  return (
    <ul className="galerie">
      {medias.map((media, index) => (
        // Chaque carte reçoit son média normalisé
        <MediaCard key={media.id || index} media={media} />
      ))}
    </ul>
  );
}