import { useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { getExpositions, updateExposition } from "../services/expositions";

export default function AddToExpositionModal({ media, onClose }) {
  const [expositionId, setExpositionId] = useState("");
  const [message, setMessage] = useState("");
  const expositions = getExpositions();
  const titleId = `add-to-exposition-title-${media.id}`;

  function addMedia() {
    const exposition = expositions.find((item) => item.id === expositionId);

    if (!exposition) {
      setMessage("Choisissez une exposition.");
      return;
    }

    if (exposition.medias.some((item) => item.media.id === media.id)) {
      setMessage("Ce média est déjà dans cette exposition.");
      return;
    }

    updateExposition({
      ...exposition,
      medias: [...exposition.medias, { media, comment: "" }],
    });
    setExpositionId("");
    setMessage("Média ajouté à l'exposition.");
  }

  return createPortal(
    <div
      className="exposition-modal-backdrop"
      role="presentation"
      onClick={onClose}
    >
      <section
        className="exposition-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="exposition-modal__header">
          <h2 id={titleId}>Ajouter à une exposition</h2>
          <button
            className="btn btn-ghost btn-icon"
            type="button"
            aria-label="Fermer"
            onClick={onClose}
          >
            <X size={18} aria-hidden="true" />
          </button>
        </div>

        {expositions.length ? (
          <>
            <label htmlFor={`exposition-${media.id}`}>Exposition</label>
            <select
              id={`exposition-${media.id}`}
              value={expositionId}
              onChange={(event) => setExpositionId(event.target.value)}
            >
              <option value="">Choisir une exposition</option>
              {expositions.map((exposition) => (
                <option key={exposition.id} value={exposition.id}>
                  {exposition.title}
                </option>
              ))}
            </select>
            <button className="btn" type="button" onClick={addMedia}>
              Ajouter
            </button>
          </>
        ) : (
          <p>Créez d'abord une exposition pour y ajouter ce média.</p>
        )}

        {message && <p role="status">{message}</p>}
      </section>
    </div>,
    document.body,
  );
}
