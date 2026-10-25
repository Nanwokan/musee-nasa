import { NavLink } from "react-router";
import { Landmark } from "lucide-react";

export default function HeaderTop () {
    return (
        <header>
            <nav>
                <strong><Landmark aria-hidden="true" className="brand-icon" />Le Louvre 404</strong>
                <NavLink to="/" end>Acceuil</NavLink>
                <NavLink to="/salles">Salles Thématiques</NavLink> 
                <NavLink to="/expositions">Mes Expositions</NavLink>
                <NavLink to="/favoris">Favoris</NavLink>         
            </nav>
        </header>
    )
}