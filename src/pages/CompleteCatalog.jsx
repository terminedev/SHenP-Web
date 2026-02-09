import { Link } from "react-router-dom";
import { CATEGORIES } from 'constants/categories';

export default function CompleteCatalog() {
    return (
        <section>
            <header>
                {
                    CATEGORIES.map(category => <Link to={`/catalogo/${category.name}`}>{category.name}</Link>)
                }
            </header>

            <hr />

            <main>

            </main>
        </section>
    );
};