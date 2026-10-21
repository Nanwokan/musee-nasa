import { Search } from "lucide-react";

export default function SearchBar () {
    return (
        <form>
            <input placeholder="saisissez au minimun trois caracteres"></input>
            <button type="submit"><Search/></button>
        </form>
    )
}