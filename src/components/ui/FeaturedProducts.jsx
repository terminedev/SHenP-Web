import { useState } from "react";
import ListCategories from 'components/categories/ListCategories';

export default function FeaturedProducts() {

    const [categories, setCategories] = useState([]);

    return (
        <section>
            <button type="button">▾ Explora nuestro catálogo ▾</button>

            {
                categories.length > 0
                    ?
                    <ul>
                        {categories.map(category => <ListCategories category={category} />)}
                    </ul>
                    : <p>No hay catálogos</p>
            }

        </section>
    );
};