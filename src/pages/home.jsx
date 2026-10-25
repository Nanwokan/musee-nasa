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

  
  const [listeDeMedias, setListeDeMedias] = useState([]);
  const currentPage = Math.max(1, parseInt(searchParams.get("page"), 10) || 1);
  const mediasPerPage = 20;

  
  const lastMediaIndex = currentPage * mediasPerPage;
  const firstMediaIndex = lastMediaIndex - mediasPerPage;
  const currentMedias = listeDeMedias.slice(firstMediaIndex, lastMediaIndex);

  
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
    newParams.set("page", "1");

    loadWithParams(newParams);
  }

  function updateSearch(recherche) {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("q", recherche);
    newParams.set("page", "1");

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
      <SearchBar key={q} value={q} onSearch={updateSearch} />
      <Filtres
        type={type}
        startYear={startYear}
        endYear={endYear}
        onTypeChange={(value) => updateFilter("media_type", value)}
        onStartYearChange={(value) => updateFilter("year_start", value)}
        onEndYearChange={(value) => updateFilter("year_end", value)}
      />

      {isLoading && (
        <div className="state">
          <div className="spinner"></div>
          <p>Chargement des médias en cours...</p>
        </div>
      )}

      {!isLoading && error && (
        <div className="state state--error">
          <p>{error}</p>
        </div>
      )}

      {!isLoading && !error && listeDeMedias.length === 0 && (
        <div className="state">
          <p>Aucun média trouvé pour cette recherche.</p>
        </div>
      )}

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
