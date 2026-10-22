import { Link } from "react-router";
import FavoriteButton from "./favoriteButton";
// Palier 1 : Carte d'un média
// Attendus respectés :
// - vignette (thumbUrl)
// - titre
// - date
// - type de média
export default function MediaCard({ media, onFavoriteChange }) {
  return (
        <li className="card">
            <Link to={`/medias/${media.id}`}>
                <img className="img-media" src={media.thumbUrl} alt={media.title} />
                <div>
                    <h4 className="title-media">{media.title}</h4>
                    <p className="date-media">Date : {media.date}</p>
                    <p className="type-media">{media.mediaType}</p>
                </div>            
            </Link>
            <FavoriteButton media={media} onToggle={onFavoriteChange} />
        </li>
  );
}