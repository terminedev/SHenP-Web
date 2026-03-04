// Librerías
import { useCallback, useEffect } from 'react';
import { Link, Navigate, useParams } from "react-router-dom";

// Constantes y funciones utilitarias (Firebase)
import { CATEGORIES } from 'constants/categories';
import { getProjectsByCatalog } from 'utils/firebase/obtainings';

// Componentes
import ListCategories from 'components/categories/ListCategories';

// 4. Estilos
import completeCatalogStyle from 'styles/pages/CompleteCatalog.module.css';

export default function CompleteCatalog() {

    // Obtenemos el parámetro de la URL, por defecto 'series'.
    const { nameCategory = 'series' } = useParams();

    // Buscamos la categoría actual verificando el plural.
    const actualCategory = CATEGORIES.find(
        category => `${category.nameCategory}s` === nameCategory
    );

    // Memoizamos la función de obtener projectos por catálogo. 
    const fetchProjects = useCallback(
        async () => getProjectsByCatalog(actualCategory?.nameCategory),
        [actualCategory?.nameCategory]
    );

    // Si el usuario ingresa manualmente una categoría que no existe en la URL, 
    // lo redirigimos a una categoría segura por defecto ('series').
    if (!actualCategory) {
        return <Navigate to="/catalogo/series" replace />;
    }

    // Cambiar el título de la pestaña
    document.title = `Sección ${nameCategory} | Series hechas en Paint`;

    return (

        <section className={completeCatalogStyle.container} aria-label="Catálogo completo">

            <header className={completeCatalogStyle.header}>
                <nav className={completeCatalogStyle.nav} aria-label="Categorías del catálogo">
                    {CATEGORIES.map(category => {
                        const categoryPath = `${category.nameCategory}s`;
                        const isActive = categoryPath === nameCategory;

                        return (
                            <Link
                                key={category.nameCategory}
                                to={`/catalogo/${categoryPath}`}
                                className={`${completeCatalogStyle.link} ${isActive ? completeCatalogStyle.active : ''}`}
                                aria-current={isActive ? 'page' : undefined}
                            >
                                {categoryPath}
                            </Link>
                        );
                    })}
                </nav>
            </header>

            <hr className={completeCatalogStyle.divider} aria-hidden="true" />

            <main className={completeCatalogStyle.main}>
                <ListCategories
                    category={actualCategory}
                    asynchronousFunction={fetchProjects}
                />
            </main>
        </section>
    );
}