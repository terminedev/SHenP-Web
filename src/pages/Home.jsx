import { CATEGORIES } from 'constants/categories';
import ListCategories from 'components/categories/ListCategories';
import { getProjectsByLimitedCategory } from 'utils/firebase/obtainings';
import mainCover from 'assets/main-cover/portada-oficial.png';

import homeStyle from 'styles/pages/Home.module.css';

export default function Home() {
    const handleScroll = () => {
        const catalogSection = document.getElementById('catalog-section');
        if (catalogSection) {
            catalogSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section className={homeStyle.mainContainer}>
            {/* Contenedor Flex para la imagen y el texto 50/50 */}
            <div className={homeStyle.heroSection}>
                <div className={homeStyle.imageWrapper}>
                    <img
                        src={mainCover}
                        alt="main-cover"
                        className={homeStyle.coverImage}
                    />
                </div>

                <div className={homeStyle.textWrapper}>
                    <p className={homeStyle.subtitle}>10 años haciendo historias. Dibujamos por pasión.</p>
                    <h1 className={homeStyle.title}>Series hechas en Paint</h1>
                    <p className={homeStyle.description}>
                        Entre amigos, forjamos mundos desde la imaginación,
                        donde la creatividad y la diversión se entrelazan en series, juegos,
                        cómics, entre otros medios originales. ¡Bienvenido a Shenp!
                    </p>

                    <button
                        type="button"
                        onClick={handleScroll}
                        className={homeStyle.exploreButton}
                    >
                        ▾ EXPLORA NUESTRO CATÁLOGO ▾
                    </button>
                </div>
            </div>

            {/* Sección del catálogo */}
            <section id="catalog-section" className={homeStyle.catalogSection}>
                <ul className={homeStyle.categoryList}>
                    {CATEGORIES.map((category) => (
                        <li key={category.nameCategory} className={homeStyle.categoryListItem}>
                            <ListCategories
                                category={category}
                                allowFiltering={false}
                                asynchronousFunction={async () => getProjectsByLimitedCategory(category.nameCategory, 4)}
                            />
                        </li>
                    ))}
                </ul>
            </section>
        </section>
    );
}