import { useEffect, useState } from "react";
import { Link } from "react-router";
import { getMediasFromNASA } from "../services/nasaApi";

export default function SallesCard({ salle }) {
  const [image, setImage] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    let isCurrent = true;

    getMediasFromNASA(salle.query, "image")
      .then((medias) => {
        const media = medias.find((item) => item.thumbUrl);
        if (isCurrent) {
          setImage(media?.thumbUrl || "");
        }
      })
      .catch((loadError) => {
        console.error(
          `Impossible de charger l’image de la salle ${salle.name} :`,
          loadError,
        );
        if (isCurrent) {
          setError(true);
        }
      });

    return () => {
      isCurrent = false;
    };
  }, [salle]);

  return (
    <Link className="salle-card" to={`/salles/${salle.id}`}>
      {image && (
        <img
          className="salle-card__image"
          src={image}
          alt={`Illustration de la salle ${salle.name}`}
          loading="lazy"
        />
      )}
      {error && <p role="alert">Image de la salle indisponible.</p>}
      <div className="salle-card__content">
        <span className="salle-card__eyebrow">Salle thématique</span>
        <h3>{salle.name}</h3>
        <p>{salle.description}</p>
        <span className="salle-card__link">Découvrir la salle</span>
      </div>
    </Link>
  );
}
