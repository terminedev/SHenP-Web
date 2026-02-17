import { CATEGORIES } from 'constants/categories';
import ListCategories from 'components/categories/ListCategories';
import { getProjectsByLimitedCategory } from 'utils/firebase/obtainings';

import homeStyle from 'styles/structure/pages/Home.module.css';
import logoWeb from 'assets/default-customization/web-lg.png'

export default function Home() {
    const handleScroll = () => {
        window.scrollTo({
            top: window.innerHeight,
            left: 0,
            behavior: 'smooth'
        });
    };

    return (
        <main className={homeStyle.mainContainer}>
            {/* Sección Superior: Texto + Logo */}
            <section className={homeStyle.heroSection}>
                <div className={homeStyle.textContainer}>
                    <p>10 años haciendo historias.</p>
                    <h1>Series hechas en Paint</h1>
                    <p>dibujamos por pasión. Entre amigos, forjamos mundos desde la imaginación,
                        donde la creatividad y la diversión se entrelazan en series, juegos,
                        cómics, entre otros medios originales. ¡Bienvenido a Shenp!
                    </p>
                </div>

                <div className={homeStyle.logoContainer}>
                    <img
                        src={logoWeb}
                        alt="Logo Shenp"
                        className={homeStyle.logo}
                    />
                </div>
            </section>

            {/* Sección del Catálogo */}
            <section className={homeStyle.catalogSection}>
                <button
                    type="button"
                    onClick={handleScroll}
                    className={homeStyle.scrollButton}
                >
                    EXPLORA NUESTRO CATÁLOGO
                </button>

                <ul className={homeStyle.categoryList}>
                    {CATEGORIES.map((category) => (
                        <li key={category.nameCategory}>
                            <ListCategories
                                category={category}
                                allowFiltering={false}
                                asynchronousFunction={async () => getProjectsByLimitedCategory(category.nameCategory, 4)}
                            />
                        </li>
                    ))}
                </ul>
            </section>
        </main>
    );
}