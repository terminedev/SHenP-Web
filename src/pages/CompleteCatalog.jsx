import { Link, Navigate, useLocation, useParams } from "react-router-dom";
import { CATEGORIES } from 'constants/categories';
import ListCategories from 'components/categories/ListCategories';

export default function CompleteCatalog() {

    const { nameCategory } = useParams();

    const actualCategory = CATEGORIES.find(category => category.nameCategory === nameCategory);
    if (!actualCategory) return <Navigate to={'/catalogo/series'} replace />

    // Función de obtener proyectos por catalogo.

    return (
        <section>
            <header>
                <nav>
                    {CATEGORIES.map(category =>
                        <Link
                            key={category.nameCategory}
                            to={`/catalogo/${category.nameCategory}`}>
                            {category.nameCategory}
                        </Link>
                    )}
                </nav>
            </header>

            <hr />

            <main>
                {actualCategory.infoCategory}
                <ListCategories
                    category={actualCategory}
                />
            </main>
        </section>
    );
};