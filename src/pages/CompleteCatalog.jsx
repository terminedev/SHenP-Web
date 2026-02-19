import { Link, Navigate, useParams } from "react-router-dom";
import { CATEGORIES } from 'constants/categories';
import ListCategories from 'components/categories/ListCategories';
import { getProjectsByCatalog } from 'utils/firebase/obtainings';

import completeCatalogStyle from 'styles/pages/CompleteCatalog.module.css';

export default function CompleteCatalog() {

    const { nameCategory = 'juegos' } = useParams();

    const actualCategory = CATEGORIES.find(category => `${category.nameCategory}s` === nameCategory);
    if (!actualCategory) return <Navigate to={'/catalogo/series'} replace />

    return (
        <section className={completeCatalogStyle.container}>
            <header className={completeCatalogStyle.header}>
                <nav className={completeCatalogStyle.nav}>
                    {CATEGORIES.map(category => {
                        const isActive = `${category.nameCategory}s` === nameCategory;

                        return (
                            <Link
                                key={category.nameCategory}
                                to={`/catalogo/${category.nameCategory}s`}
                                className={`${completeCatalogStyle.link} ${isActive ? completeCatalogStyle.active : ''}`}
                            >
                                {`${category.nameCategory}s`}
                            </Link>
                        );
                    })}
                </nav>
            </header>

            <hr className={completeCatalogStyle.divider} />

            <main className={completeCatalogStyle.main}>
                <ListCategories
                    category={actualCategory}
                    asynchronousFunction={async () => getProjectsByCatalog(actualCategory.nameCategory)}
                />
            </main>
        </section>
    );
};