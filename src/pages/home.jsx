import SearchBar from "../components/searchBar";
import Galerie from "../components/galerie";
import { useState, useEffect } from "react";
import { getMediasFromNASA } from "../services/nasaApi";
import Pagination from "../components/pagination";

export default function Home() {
    const [listeDeMedias, setListeDeMedias] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [mediasPerPage, setMediasPerPage] = useState(20)

    const lastMediaIndex = currentPage * mediasPerPage
    const firstMediaIndex = lastMediaIndex - mediasPerPage
    const currentMedias = listeDeMedias.slice(firstMediaIndex,lastMediaIndex)
    
    useEffect(() => {
        getMediasFromNASA()
            .then((medias) => setListeDeMedias(medias))
            .catch((error) => console.error("Failed to load NASA media:", error))
    }, [])
    return (
        <>
          <SearchBar onSearch={(recherche) => getMediasFromNASA(recherche).then((medias) => setListeDeMedias(medias))}/>
          <Galerie medias={currentMedias}/>   
          <Pagination totalMedias={listeDeMedias.length} mediasPerPage={mediasPerPage} currentPage={currentPage} setCurrentPage={setCurrentPage}/>
        </>
    )
}