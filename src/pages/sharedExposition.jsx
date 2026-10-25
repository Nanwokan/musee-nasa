import { Link, useSearchParams } from "react-router";
import ErrorPage from "./errorPage";

export default function SharedExposition() {
  const [searchParams] = useSearchParams();
  const data = searchParams.get("data");

  let exposition;

  try {
    exposition = data ? JSON.parse(data) : null;
  } catch {
    exposition = null;
  }

  if (!exposition || !Array.isArray(exposition.medias)) {
    return (
      <ErrorPage
        title="Lien de partage invalide"
        message="Cette exposition ne peut pas être affichée."
      />
    );
  }

  return (
    <div className="shared-exposition">
      <header className="shared-exposition__header">
        <span>Exposition partagÃ©e</span>
        <h1>{exposition.title}</h1>
        {exposition.description && <p>{exposition.description}</p>}
      </header>

      {exposition.medias.length ? (
        <ul className="galerie">
          {exposition.medias.map((item) => (
            <li className="card" key={item.media.id}>
              <Link to={`/medias/${item.media.id}`}>
                <img
                  className="img-media"
                  src={item.media.thumbUrl}
                  alt={item.media.title}
                />
                <div>
                  <h2>{item.media.title}</h2>
                  <p>{item.media.date}</p>
                  {item.comment && <p>{item.comment}</p>}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>Cette exposition ne contient pas encore de média.</p>
      )}
    </div>
  );
}
