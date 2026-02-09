import ListCategories from 'components/categories/ListCategories';
import { CATEGORIES } from 'constants/categories';

export default function FeaturedProducts() {

    // const categorias

    return (
        <section>
            <button type="button">▾ Explora nuestro catálogo ▾</button>
            {
                <ul>
                    {CATEGORIES.map(category => <ListCategories category={category} />)}
                </ul>
            }
        </section>
    );
};