import { Link } from "react-router";

export default function ErrorPage({
  title = "Page introuvable",
  message = "Cette adresse n'existe pas.",
}) {
  return (
    <div className="state state--error" role="alert">
      <h1>{title}</h1>
      <p>{message}</p>
      <Link className="btn" to="/">Retour à l'accueil</Link>
    </div>
  );
}
