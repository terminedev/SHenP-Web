import { Link, Navigate, useParams } from "react-router-dom";
import { CATEGORIES } from 'constants/categories';
import ListCategories from 'components/categories/ListCategories';
import { getProjectsByCatalog } from 'utils/firebase/obtainings';

// Importamos el módulo de estilos
import styles from 'styles/pages/CompleteCatalog.module.css';

export default function CompleteCatalog() {

    const { nameCategory } = useParams();

    const actualCategory = CATEGORIES.find(category => category.nameCategory === nameCategory);
    if (!actualCategory) return <Navigate to={'/catalogo/series'} replace />

    return (
        // Agregamos el contenedor principal
        <section className={styles.catalogContainer}>
            <header className={styles.catalogHeader}>
                <nav className={styles.catalogNav}>
                    {CATEGORIES.map(category =>
                        <Link
                            key={category.nameCategory}
                            to={`/catalogo/${category.nameCategory}`}
                            // Lógica opcional para subrayar la categoría activa
                            className={`${styles.navLink} ${category.nameCategory === nameCategory ? styles.activeLink : ''}`}
                        >
                            {category.nameCategory}
                        </Link>
                    )}
                </nav>
            </header>

            {/* La línea divisoria puede ser estilizada o removida si se prefiere border-bottom en el header */}
            <hr className={styles.divider} />

            <main className={styles.catalogMain}>
                {/* Asumimos que infoCategory contiene los "dos filtros" o información superior */}
                <div className={styles.filtersArea}>
                    {actualCategory.infoCategory}
                </div>

                {/* Envolvemos ListCategories o estilizamos su contenedor directamente desde CSS */}
                <div className={styles.gridWrapper}>
                    <ListCategories
                        category={actualCategory}
                        asynchronousFunction={async () => getProjectsByCatalog(actualCategory.nameCategory)}
                    />
                </div>
            </main>
        </section>
    );
};