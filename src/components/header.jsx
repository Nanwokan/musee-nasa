import { NavLink } from "react-router";

export default function HeaderTop () {
    return (
        <header>
            <nav>
                <strong>Le Louvre 404</strong>
                <NavLink to="/" end>Acceuil</NavLink>
                <NavLink to="/salles">Salles d'exposition</NavLink>       
                <NavLink to="/favoris">Favoris</NavLink>
                       
            </nav>
        </header>
    )
}