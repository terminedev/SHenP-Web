import { CATEGORIES } from 'constants/categories';
import ListCategories from 'components/categories/ListCategories';
import { getProjectsByLimitedCategory } from 'utils/firebase/obtainings';

import homeStyle from 'styles/structure/pages/Home.module.css';
import logoWeb from 'assets/default-customization/web-lg.png'
import coverCharacter from 'assets/main-cover/cover-character.png';

export default function Home() {
    const handleScroll = () => {
        window.scrollTo({
            top: window.innerHeight,
            left: 0,
            behavior: 'smooth'
        });
    };

    return (
        <section className={homeStyle.home}>

            {/* Portada principal */}
            <div className={homeStyle.mainCover}>

                {/* Personaje y logotipo */}
                <div className={homeStyle.logoContainer}>
                    <img
                        className={homeStyle.coverCharacter}
                        src={coverCharacter}
                        alt="character"
                    />
                    <img
                        src={logoWeb}
                        alt="Logo Shenp"
                        className={homeStyle.logo}
                    />
                </div>

                {/* Info principal */}
                <section className={homeStyle.heroSection}>
                    <p>10 años haciendo historias. Dibujamos por pasión. </p>
                    <h1>Series hechas en Paint</h1>
                    <p>Entre amigos, forjamos mundos desde la imaginación,
                        donde la creatividad y la diversión se entrelazan en series, juegos,
                        cómics, entre otros medios originales. ¡Bienvenido a Shenp!
                    </p>
                </section>
            </div>

            {/* Sección del Catálogo */}
            <section className={homeStyle.catalogSection}>
                <button
                    type="button"
                    onClick={handleScroll}
                    className={homeStyle.scrollButton}
                >
                    ▾ EXPLORA NUESTRO CATÁLOGO ▾
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
        </section>
    );
}