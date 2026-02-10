import { Link } from "react-router-dom";

export default function Sidebar({ onClose }) {
    return (
        <aside>
            <button type="button" onClick={onClose}>Cerrar</button>
            <nav>
                <h2>Mapa del Sitio</h2>

                <hr />
                <Link to={'/'}>Página Principal | ¿Quiénes Somos?</Link>

                <hr />
                <p>El Catálogo</p>
                <Link to={'/catalogo/series'}>Series</Link>
                <Link to={'/catalogo/comics'}>Cómics</Link>
                <Link to={'/catalogo/libros'}>Libros</Link>
                <Link to={'/catalogo/juegos'}>Juegos</Link>

                <hr />
                <p>Extras</p>
                <Link to={'/proyectos-perdidos'}>Proyectos Perdidos</Link>
                <Link to={'/personalizacion'}>Personalización</Link>
            </nav>
        </aside>
    );
};