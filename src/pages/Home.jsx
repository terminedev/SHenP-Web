import { CATEGORIES } from 'constants/categories';
import ListCategories from 'components/categories/ListCategories';
// getProjectsByLimitedCategory

export default function Home() {

    const handleScroll = () => {
        window.scrollTo({
            top: window.innerHeight,
            left: 0,
            behavior: 'smooth'
        });
    };

    return (
        <>
            <section>
                <p>10 años haciendo historias, dibujamos por pasión.</p>
                <p>SP</p>
                <h1>Series hechas en Paint</h1>
                <p>Entre amigos, forjamos mundos desde la imaginación, donde la creatividad y
                    la diversión se entrelazan en series, juegos, cómics, entre otros medios originales.
                    ¡Bienvenido a Shenp!
                </p>
            </section>

            <section>
                <button
                    type="button"
                    onClick={handleScroll}
                >
                    ▾ Explora nuestro catálogo ▾
                </button>
                {
                    <ul>
                        {CATEGORIES.map(category =>
                            <li key={category.nameCategory}>
                                <ListCategories
                                    category={category}
                                    allowFiltering={false}
                                    asynchronousFunction={async () => getProjectsByLimitedCategory(category.nameCategory, 4)}
                                />
                            </li>
                        )}
                    </ul>
                }
            </section>
        </>
    );
};