import { Search } from "lucide-react";
import { useState } from "react";

export default function SearchBar ({onSearch}) {
    const [recherche, setRecherche] = useState("")

    function handleSearchSubmit (event) {
        event.preventDefault()
        onSearch(recherche)
    }
    return (
        <form onSubmit={handleSearchSubmit}>
            <input placeholder="saisissez au minimun trois caracteres"></input>
            <button type="submit"><Search/></button>
        </form>
    )
}