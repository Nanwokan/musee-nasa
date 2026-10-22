// Palier 1 : Carte d'un média
// Attendus respectés :
// - vignette (thumbUrl)
// - titre
// - date
// - type de média
export default function MediaCard({ media }) {
  // Vignette par défaut si l'API ne fournit pas d'aperçu direct (ex: certains fichiers audio)
  const defaultPlaceholder = "https://images.nasa.gov/images/nasa_logo-large.ee5daa0f.png";

  return (
    <li className="card">
      <img
        className="img-media"
        src={media.thumbUrl || defaultPlaceholder}
        alt={media.title || "Média de la NASA"}
        loading="lazy"
        onError={(e) => {
          // Si l'image distante échoue au chargement, on remplace par le logo NASA
          e.currentTarget.onerror = null;
          e.currentTarget.src = defaultPlaceholder;
        }}
      />
      <div>
        <h4 className="title-media">{media.title}</h4>
        <p className="date-media">Date : {media.date}</p>
        <p className="type-media">{media.mediaType}</p>
      </div>
    </li>
  );
}
