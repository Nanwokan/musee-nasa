import { salles } from "../data/salles";
import SallesCard from "../components/sallesCard";

export default function Salles() {
  return (
    <section className="salles-page">
      <header className="salles-page__intro">
        <span className="eyebrow">Le Louvre 404 · Collections</span>
        <h1>Les salles du musée</h1>
        <p>Explorez les grandes missions et découvertes de l’espace.</p>
      </header>

      <div className="salles">
        {salles.map((salle) => (
          <SallesCard key={salle.id} salle={salle} />
        ))}
      </div>
    </section>
  );
}
