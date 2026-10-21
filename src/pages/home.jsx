import SearchBar from "../components/searchBar";
import Galerie from "../components/galerie";
import { useState, useEffect } from "react";
import { getMediasFromNASA } from "../services/nasaApi";

export default function Home() {
    const [listeDeMedias, setListeDeMedias] = useState([])

    useEffect(() => {
        getMediasFromNASA().then((medias) => setListeDeMedias(medias))
    }, [])
    return (
        <>
          <SearchBar onSearch={(recherche) => getMediasFromNASA(recherche).then((medias) => setListeDeMedias(medias))}/>
          <Galerie medias={listeDeMedias}/>   
          
        </>
    )
}