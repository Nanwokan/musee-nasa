import { useState } from "react";
import { deleteExposition, getExpositions } from "../services/expositions";
import { Link } from "react-router";

export default function Expositions() {
  const [expos, setExpos] = useState(getExpositions);
  return (
    <>
      {/* Lien vers la page de création */}
      <div className="expositions-page">
        <div className="expositions-page__heading">
        <h2>Mes expositions</h2>
        <Link className="btn" to="/expositions/create">
          Créer une exposition
        </Link>
        </div>
      </div>

      {expos.length ? (
        <ul className="expositions-list">
          {expos.map((exposition) => (
            <li className="expositions-list__item" key={exposition.id}>
              <Link to={`/expositions/${exposition.id}`}>
                {exposition.title}
              </Link>
              <button
                className="btn btn-ghost"
                type="button"
                onClick={() => setExpos(deleteExposition(exposition.id))}
              >
                Supprimer
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>Vous n’avez pas encore créé d’exposition.</p>
      )}
    </>
  );
}
