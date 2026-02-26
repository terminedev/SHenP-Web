import { Link } from "react-router-dom";

import styles from 'styles/ui/Sidebar.module.css';

export default function Sidebar({ onClose = () => { }, isOpen = true }) {

    // Manejadores de eventos
    const handleSidebarClick = (e) => e.stopPropagation();

    return (
        /* Fondo oscuro */
        <div
            className={`${styles.overlay} ${isOpen ? styles.open : ''}`}
            onClick={onClose}
            aria-hidden={!isOpen} // Oculta el componente a los lectores de pantalla si está cerrado
        >

            {/* Sidebar */}
            <aside
                className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}
                onClick={handleSidebarClick}
                role="dialog"
                aria-modal="true"
                aria-label="Menú de navegación lateral"
            >

                {/* Cerrar sidebar */}
                <button
                    type="button"
                    onClick={onClose}
                    className={styles.closeButton}
                    aria-label="Cerrar menú"
                    title="Cerrar menú"
                >
                    <span aria-hidden="true">⨉</span>
                </button>

                {/* Navegación */}
                <nav className={styles.nav} aria-labelledby="sidebar-title">
                    <h2 id="sidebar-title">Mapa del Sitio</h2>

                    {/* SECCIÓN: Inicio */}
                    <Link to="/" className={styles.link} onClick={onClose}>
                        Página Principal | ¿Quiénes Somos?
                    </Link>

                    <hr aria-hidden="true" /> {/* ARIA: Las líneas son visuales, se ocultan al lector */}

                    {/* SECCIÓN: Catálogo */}
                    {/* Agrupamos los enlaces bajo un mismo contexto para el lector de pantalla */}
                    <p id="nav-catalogo" aria-hidden="true">El Catálogo</p>
                    <div role="group" aria-labelledby="nav-catalogo">
                        <Link to="/catalogo/series" className={styles.link} onClick={onClose}>Series</Link>
                        <Link to="/catalogo/comics" className={styles.link} onClick={onClose}>Cómics</Link>
                        <Link to="/catalogo/libros" className={styles.link} onClick={onClose}>Libros</Link>
                        <Link to="/catalogo/juegos" className={styles.link} onClick={onClose}>Juegos</Link>
                    </div>

                    <hr aria-hidden="true" />

                    {/* SECCIÓN: Extras */}
                    <p id="nav-extras" aria-hidden="true">Extras</p>
                    <div role="group" aria-labelledby="nav-extras">
                        <Link to="/proyectos-perdidos" className={styles.link} onClick={onClose}>Proyectos Perdidos</Link>
                        <Link to="/personalizacion" className={styles.link} onClick={onClose}>Personalización</Link>
                    </div>
                </nav>

            </aside>
        </div>
    );
}