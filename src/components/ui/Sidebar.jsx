import { Link } from "react-router-dom";
import styles from 'styles/structure/ui/Sidebar.module.css';

export default function Sidebar({ onClose, isOpen }) {
    return (
        <div
            className={`${styles.overlay} ${isOpen ? styles.open : ''}`}
            onClick={onClose}
        >
            <aside
                className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}
                onClick={(e) => e.stopPropagation()}
            >

                <button
                    type="button"
                    onClick={onClose}
                    className={styles.closeButton}
                >
                    ⨉
                </button>

                <nav className={styles.nav}>
                    <h2>Mapa del Sitio</h2>

                    <Link to={'/'} className={styles.link} onClick={onClose}>
                        Página Principal | ¿Quiénes Somos?
                    </Link>

                    <hr />
                    <p>El Catálogo</p>
                    <Link to={'/catalogo/series'} className={styles.link} onClick={onClose}>Series</Link>
                    <Link to={'/catalogo/comics'} className={styles.link} onClick={onClose}>Cómics</Link>
                    <Link to={'/catalogo/libros'} className={styles.link} onClick={onClose}>Libros</Link>
                    <Link to={'/catalogo/juegos'} className={styles.link} onClick={onClose}>Juegos</Link>

                    <hr />
                    <p>Extras</p>
                    <Link to={'/proyectos-perdidos'} className={styles.link} onClick={onClose}>Proyectos Perdidos</Link>
                    <Link to={'/personalizacion'} className={styles.link} onClick={onClose}>Personalización</Link>
                </nav>
            </aside>
        </div>
    );
};