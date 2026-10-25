import { useState } from "react";
import { useParams } from "react-router";
import { getExpositions, updateExposition } from "../services/expositions";
import ErrorPage from "./errorPage";

export default function ExpositionDetail() {
  const { id } = useParams();

  const [exposition, setExposition] = useState(() =>
    getExpositions().find((item) => item.id === id),
  );

  if (!exposition) {
    return (
      <ErrorPage
        title="Exposition introuvable"
        message="Cette exposition n'existe pas."
      />
    );
  }

  function updateField(name, value) {
    const updated = { ...exposition, [name]: value };

    setExposition(updated);
    updateExposition(updated);
  }

  function updateComment(index, comment) {
    const medias = exposition.medias.map((item, itemIndex) =>
      itemIndex === index ? { ...item, comment } : item,
    );

    updateField("medias", medias);
  }

  function removeMedia(index) {
    updateField(
      "medias",
      exposition.medias.filter((_, itemIndex) => itemIndex !== index),
    );
  }

  function moveMedia(index, direction) {
    const medias = [...exposition.medias];
    const [media] = medias.splice(index, 1);
    medias.splice(index + direction, 0, media);

    updateField("medias", medias);
  }

  const shareData = {
    title: exposition.title,
    description: exposition.description,
    medias: exposition.medias,
  };
  const shareUrl = `/expositions/partage?data=${encodeURIComponent(
    JSON.stringify(shareData),
  )}`;

  return (
    <div className="exposition-page">
      <section className="exhibition-bar">
        <label>
          Titre de l'exposition
          <input
            value={exposition.title}
            onChange={(event) => updateField("title", event.target.value)}
          />
        </label>

        <label>
          Texte de présentation
          <textarea
            value={exposition.description}
            onChange={(event) => updateField("description", event.target.value)}
            placeholder="Présentez votre exposition"
          />
        </label>

        <a className="btn" href={shareUrl} target="_blank" rel="noreferrer">
          Ouvrir le lien de partage
        </a>
      </section>

      <section className="exposition-page__medias">
        <h2>Médias de l'exposition</h2>
        {exposition.medias.length ? (
          <ul className="galerie">
            {exposition.medias.map((item, index) => (
              <li className="card exhibition-item" key={item.media.id}>
                <img
                  className="img-media"
                  src={item.media.thumbUrl}
                  alt={item.media.title}
                />
                <div>
                  <h3>{item.media.title}</h3>
                  <p>{item.media.date}</p>
                  <label>
                    Commentaire
                    <textarea
                      value={item.comment}
                      onChange={(event) => updateComment(index, event.target.value)}
                    />
                  </label>
                  <button
                    type="button"
                    onClick={() => moveMedia(index, -1)}
                    disabled={index === 0}
                  >
                    ↑
                  </button>
                  <button
                    type="button"
                    onClick={() => moveMedia(index, 1)}
                    disabled={index === exposition.medias.length - 1}
                  >
                    ↓
                  </button>
                </div>
                <button
                  className="btn-remove"
                  type="button"
                  aria-label={`Retirer ${item.media.title}`}
                  onClick={() => removeMedia(index)}
                >
                  ×
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>Ajoutez des médias depuis la galerie ou une fiche média.</p>
        )}
      </section>
    </div>
  );
}
