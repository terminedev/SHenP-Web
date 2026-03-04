import { Link } from "react-router-dom";

import sidebarStyles from 'styles/ui/Sidebar.module.css';

export default function Sidebar({ onClose = () => { }, isOpen = true }) {

    // Manejadores de eventos
    const handleSidebarClick = (e) => e.stopPropagation();

    return (

        /* Fondo oscuro */
        <div
            className={`${sidebarStyles.overlay} ${isOpen ? sidebarStyles.open : ''}`}
            onClick={onClose}
            inert={!isOpen}
        >

            {/* Sidebar */}
            <aside
                className={`${sidebarStyles.sidebar} ${isOpen ? sidebarStyles.open : ''}`}
                onClick={handleSidebarClick}
                role="dialog"
                aria-modal="true"
                aria-label="Menú de navegación lateral"
            >

                {/* Cerrar sidebar */}
                <button
                    type="button"
                    onClick={onClose}
                    className={sidebarStyles.closeButton}
                    aria-label="Cerrar menú"
                    title="Cerrar menú"
                >
                    <span aria-hidden="true">⨉</span>
                </button>

                {/* Navegación */}
                <nav className={sidebarStyles.nav} aria-labelledby="sidebar-title">
                    <h2 id="sidebar-title">Mapa del Sitio</h2>

                    {/* Sección: Inicio */}
                    <Link to="/" className={sidebarStyles.link} onClick={onClose}>
                        Página Principal
                    </Link>

                    <hr aria-hidden="true" /> {/* ARIA: Las líneas son visuales, se ocultan al lector */}

                    {/* Sección: Catálogo */}
                    <p id="nav-catalogo" aria-hidden="true">El Catálogo</p>
                    <div className={sidebarStyles.nav} role="group" aria-labelledby="nav-catalogo">
                        <Link to="/catalogo/series" className={sidebarStyles.link} onClick={onClose}>Series</Link>
                        <Link to="/catalogo/comics" className={sidebarStyles.link} onClick={onClose}>Cómics</Link>
                        <Link to="/catalogo/libros" className={sidebarStyles.link} onClick={onClose}>Libros</Link>
                        <Link to="/catalogo/juegos" className={sidebarStyles.link} onClick={onClose}>Juegos</Link>
                    </div>

                    <hr aria-hidden="true" />

                    {/* Sección: Extras */}
                    <p id="nav-extras" aria-hidden="true">Extras</p>
                    <div className={sidebarStyles.nav} role="group" aria-labelledby="nav-extras">
                        <Link to="/proyectos-perdidos" className={sidebarStyles.link} onClick={onClose}>Proyectos Perdidos</Link>
                        <Link to="/galeria" className={sidebarStyles.link} onClick={onClose}>Galería</Link>
                        <Link to="/personalizacion" className={sidebarStyles.link} onClick={onClose}>Personalización</Link>
                        <Link to="/reflexion-shenp" className={sidebarStyles.link} onClick={onClose}>Reflexión ShenP</Link>
                    </div>
                </nav>

            </aside>
        </div>
    );
}