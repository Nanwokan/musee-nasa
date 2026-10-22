import SearchBar from "../components/searchBar";
import Galerie from "../components/galerie";
import { useState, useEffect } from "react";
import { getMediasFromNASA } from "../services/nasaApi";
import Pagination from "../components/pagination";
import { useSearchParams } from "react-router";
import Filtres from "../components/filtres";

export default function Home() {
  const [searchParams, setSearchParams] = useSearchParams();

  const q = searchParams.get("q") ?? "apollo"; //(thème par défaut : apollo)
  const type = searchParams.get("media_type") ?? "";
  const startYear = searchParams.get("year_start") ?? "1900";
  const endYear = searchParams.get("year_end") ?? "2026";

  // Liste complète des médias récupérés de l'API NASA
  const [listeDeMedias, setListeDeMedias] = useState([]);
  const currentPage = Math.max(1, parseInt(searchParams.get("page"), 10) || 1);
  const mediasPerPage = 20; // 20 médias par page (fixe pour éviter l'erreur lint de variable inutilisée)

  // Découpage des médias pour la page actuelle
  const lastMediaIndex = currentPage * mediasPerPage;
  const firstMediaIndex = lastMediaIndex - mediasPerPage;
  const currentMedias = listeDeMedias.slice(firstMediaIndex, lastMediaIndex);

  // États pour informer l'utilisateur de ce qui se passe (Palier 1 : chargement, erreur, sans résultat)
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  function setCurrentPage(page) {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("page", page);
    setSearchParams(newParams);
  }

  function loadWithParams(params) {
    if (new URLSearchParams(params).toString() === searchParams.toString()) return;
    setIsLoading(true);
    setError(null);
    setSearchParams(params);
  }

  function updateFilter(name, value) {
    const newParams = new URLSearchParams(searchParams);

    newParams.set(name, value);

    loadWithParams(newParams);
  }

  // Chargement initial au premier affichage
  useEffect(() => {
    getMediasFromNASA(q, type, startYear, endYear)
      .then((medias) => {
        setListeDeMedias(medias || []);
      })
      .catch((err) => {
        console.error("Échec du chargement initial :", err);
        setError(
          "Une erreur est survenue lors de la communication avec l'API de la NASA.",
        );
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [q, type, startYear, endYear]);

  return (
    <>
      {/* Palier 1 : Champ de recherche pour changer le thème de la galerie */}
      <SearchBar onSearch={(recherche) => loadWithParams({ q: recherche })} />
      <Filtres
        onTypeChange={(value) => updateFilter("media_type", value)}
        onStartYearChange={(value) => updateFilter("year_start", value)}
        onEndYearChange={(value) => updateFilter("year_end", value)}
      />

      {/* Palier 1 : L'utilisateur sait toujours ce qui se passe */}
      {/* 1. Chargement en cours */}
      {isLoading && (
        <div className="state">
          <div className="spinner"></div>
          <p>Chargement des médias en cours...</p>
        </div>
      )}

      {/* 2. Erreur de l'API :
          !isLoading = le chargement est terminé
          error = il y a un message d'erreur (ex: coupure réseau ou problème côté NASA)
          Si ces 2 conditions sont vraies, on affiche le message d'erreur en rouge (classe CSS state--error) */}
      {!isLoading && error && (
        <div className="state state--error">
          <p>{error}</p>
        </div>
      )}

      {/* 3. Recherche sans résultat */}
      {!isLoading && !error && listeDeMedias.length === 0 && (
        <div className="state">
          <p>Aucun média trouvé pour cette recherche.</p>
        </div>
      )}

      {/* 4. Affichage de la galerie et de la pagination lorsque les résultats sont là */}
      {!isLoading && !error && listeDeMedias.length > 0 && (
        <>
          <Galerie medias={currentMedias} />
          <Pagination
            totalMedias={listeDeMedias.length}
            mediasPerPage={mediasPerPage}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </>
      )}
    </>
  );
}
