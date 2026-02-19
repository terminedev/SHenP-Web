import { useState, useEffect } from 'react'; // Importar hooks
import { CATEGORIES } from 'constants/categories';
import ListCategories from 'components/categories/ListCategories';
import { getProjectsByLimitedCategory } from 'utils/firebase/obtainings';

import homeStyle from 'styles/structure/pages/Home.module.css';
import logoWeb from 'assets/default-customization/web-lg.png'
import coverCharacter from 'assets/main-cover/cover-character.png';

export default function Home() {
    const [showButton, setShowButton] = useState(true);

    // 2. Lógica para ocultar el botón al hacer scroll
    useEffect(() => {
        const handleVisibility = () => {
            // Si baja más de 100px, oculta el botón
            if (window.scrollY > 100) {
                setShowButton(false);
            } else {
                setShowButton(true);
            }
        };

        window.addEventListener('scroll', handleVisibility);
        return () => window.removeEventListener('scroll', handleVisibility);
    }, []);

    const handleScroll = () => {
        // Scrollear hacia la sección del catálogo
        const catalogSection = document.getElementById('catalog-section');
        if (catalogSection) {
            catalogSection.scrollIntoView({ behavior: 'smooth' });
        }
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

                {/* MOVIDO: El botón ahora vive aquí adentro para estar en la pantalla inicial */}
                <button
                    type="button"
                    onClick={handleScroll}
                    className={`${homeStyle.scrollButton} ${!showButton ? homeStyle.hidden : ''}`}
                >
                    ▾ EXPLORA NUESTRO CATÁLOGO ▾
                </button>
            </div>

            {/* Sección del Catálogo */}
            {/* Agregamos ID para el scroll target */}
            <section id="catalog-section" className={homeStyle.catalogSection}>
                <ul className={homeStyle.categoryList}>
                    {CATEGORIES.map((category) => (
                        <li key={category.nameCategory}>
                            <ListCategories
                                category={category}
                                allowFiltering={false}
                                asynchronousFunction={async () => getProjectsByLimitedCategory(category.nameCategory, 4)}
                                customClass={homeStyle.projectsRow}
                            />
                        </li>
                    ))}
                </ul>
            </section>
        </section>
    );
}