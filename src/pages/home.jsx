import SearchBar from "../components/searchBar";
import Galerie from "../components/galerie";
import { useState, useEffect } from "react";
import { getMediasFromNASA } from "../services/nasaApi";
import Pagination from "../components/pagination";

export default function Home() {
  // Liste complète des médias récupérés de l'API NASA
  const [listeDeMedias, setListeDeMedias] = useState([]);
  // Gestion de la pagination (Palier 1 : la galerie est paginée)
  const [currentPage, setCurrentPage] = useState(1);
  const mediasPerPage = 20; // 20 médias par page (fixe pour éviter l'erreur lint de variable inutilisée)

  // Découpage des médias pour la page actuelle
  const lastMediaIndex = currentPage * mediasPerPage;
  const firstMediaIndex = lastMediaIndex - mediasPerPage;
  const currentMedias = listeDeMedias.slice(firstMediaIndex, lastMediaIndex);

  // États pour informer l'utilisateur de ce qui se passe (Palier 1 : chargement, erreur, sans résultat)
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Chargement initial au premier affichage (thème par défaut : apollo)
  useEffect(() => {
    getMediasFromNASA("apollo")
      .then((medias) => {
        setListeDeMedias(medias || []);
      })
      .catch((err) => {
        console.error("Échec du chargement initial :", err);
        setError("Une erreur est survenue lors de la communication avec l'API de la NASA.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      {/* Palier 1 : Champ de recherche pour changer le thème de la galerie */}
        <SearchBar onSearch={(recherche) => getMediasFromNASA(recherche).then((medias) => setListeDeMedias(medias))}/>

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