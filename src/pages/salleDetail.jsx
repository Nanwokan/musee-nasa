import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router";
import { salles } from "../data/salles";
import { getMediasFromNASA } from "../services/nasaApi";

function sortByDate(medias) {
  return [...medias].sort((a, b) => {
    const dateA = Date.parse(a.date);
    const dateB = Date.parse(b.date);
    return (Number.isNaN(dateA) ? Infinity : dateA) -
      (Number.isNaN(dateB) ? Infinity : dateB);
  });
}

export default function SalleDetail() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const salle = salles.find((item) => item.id === id);
  const [medias, setMedias] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!salle) return;

    let isCurrent = true;

    async function loadMedias() {
      try {
        const results = await getMediasFromNASA(salle.query);
        const orderedMedias = sortByDate(results);

        if (isCurrent) {
          setMedias(orderedMedias);
        }
      } catch (loadError) {
        console.error("Impossible de charger les médias de la salle :", loadError);
        if (isCurrent) {
          setError("Impossible de charger les médias de cette salle.");
        }
      } finally {
        if (isCurrent) {
          setIsLoading(false);
        }
      }
    }

    loadMedias();

    return () => {
      isCurrent = false;
    };
  }, [salle]);

  if (!salle) {
    return (
      <section className="salle-detail">
        <button
          className="back-button"
          type="button"
          onClick={() => navigate(location.key === "default" ? "/salles" : -1)}
        >
          ← Retour
        </button>
        <h1>Salle introuvable</h1>
      </section>
    );
  }

  return (
    <section className="salle-detail">
      <button
        className="back-button"
        type="button"
        onClick={() => navigate(location.key === "default" ? "/salles" : -1)}
      >
        ← Retour
      </button>
      <h1>{salle.name}</h1>
      <p className="salle-detail__description">{salle.description}</p>
      <h2>Frise chronologique</h2>

      {isLoading && <p role="status">Chargement des médias...</p>}
      {error && <p role="alert">{error}</p>}
      {!isLoading && !error && medias.length === 0 && (
        <p>Aucun média trouvé pour cette salle.</p>
      )}

      {!isLoading && !error && medias.length > 0 && (
        <ol className="salle-timeline">
          {medias.map((media) => (
            <li className="salle-timeline__item" key={media.id}>
              <time>{media.date}</time>
              {media.thumbUrl && (
                <img src={media.thumbUrl} alt="" loading="lazy" />
              )}
              <Link to={`/medias/${media.id}`}>{media.title}</Link>
            </li>
          ))}
        </ol>
      )}
    </section>
  );
}
