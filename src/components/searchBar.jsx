import { Search } from "lucide-react";
import { useState } from "react";

// Palier 1 : Composant de recherche permettant de changer le thème de la galerie
export default function SearchBar({ value, onSearch }) {
  const [recherche, setRecherche] = useState(value);

  function handleSearchSubmit(event) {
    event.preventDefault();
    // On transmet la recherche saisie (ou vide)
    onSearch(recherche);
  }

  return (
    <form className="search" onSubmit={handleSearchSubmit}>
      <input
        type="text"
        value={recherche}
        onChange={(event) => setRecherche(event.target.value)}
        placeholder="Rechercher dans la photothèque (ex: Mars, Hubble, Apollo...)"
        aria-label="Recherche de médias spatiaux"
      />
      <button type="submit" aria-label="Lancer la recherche">
        <Search size={18} />
      </button>
    </form>
  );
}
