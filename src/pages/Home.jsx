// Librerías
import { useMemo } from 'react';

// Constantes y Utilidades
import { CATEGORIES } from 'constants/categories';
import { getProjectsByLimitedCategory } from 'utils/firebase/obtainings';

// Componentes
import ListCategories from 'components/categories/ListCategories';

// Assets y Estilos
import mainCover from 'assets/main-cover/portada-oficial.png';
import homeStyle from 'styles/pages/Home.module.css';

export default function Home() {

    // Pre-creamos las funciones de fetching para cada categoría usando useMemo.
    const fetchFunctions = useMemo(() => {
        const fetchers = {};
        CATEGORIES.forEach((category) => {
            fetchers[category.nameCategory] = async () => {
                return await getProjectsByLimitedCategory(category.nameCategory, 4);
            };
        });
        return fetchers;
    }, []);

    // Cambiar el título de la pestaña
    document.title = `Página Principal | Series hechas en Paint`;

    return (
        <main className={homeStyle.mainContainer} role="main" aria-label="Página de inicio de Shenp">

            {/* Sección hero */}
            <section className={homeStyle.heroSection} aria-labelledby="hero-title">

                {/* Contenedor de Imagen */}
                <div className={homeStyle.imageWrapper}>
                    <img
                        src={mainCover}
                        alt="Portada oficial de Series Hechas en Paint ilustrando sus personajes y mundos"
                        className={homeStyle.coverImage}
                    />
                </div>

                {/* Contenedor de Texto y Llamado a la Acción */}
                <div className={homeStyle.textWrapper}>
                    <p className={homeStyle.subtitle}>10 años haciendo historias. Dibujamos por pasión.</p>

                    <h1 id="hero-title" className={homeStyle.title}>
                        Series hechas en Paint
                    </h1>

                    <p className={homeStyle.description}>
                        Entre amigos, forjamos mundos desde la imaginación,
                        donde la creatividad y la diversión se entrelazan en series, juegos,
                        cómics, entre otros medios originales. ¡Bienvenido a Shenp!
                        <br /> <br />
                        Recopilación de proyectos independientes realizados entre 2016 y 2018.
                        Este grupo se creó originalmente con el fin de exhibir y apoyar obras desarrolladas
                        íntegramente en Paint.

                    </p>

                    <a
                        href='#catalogo-rapido'
                        className={homeStyle.exploreLink}
                        aria-label="Desplazarse hacia abajo para explorar el catálogo"
                        aria-controls="catalog-section"
                    >
                        <span aria-hidden="true">▾</span> EXPLORA NUESTRO CATÁLOGO <span aria-hidden="true">▾</span>
                    </a>
                </div>
            </section>

            {/* Sección catálogo rápido */}
            <section
                id="catalogo-rapido"
                className={homeStyle.catalogSection}
                aria-label="Catálogo de categorías y proyectos"
            >
                <ul className={homeStyle.categoryList} role="list">
                    {CATEGORIES.map((category) => (
                        <li
                            key={category.nameCategory}
                            className={homeStyle.categoryListItem}
                            role="listitem"
                        >
                            <ListCategories
                                category={category}
                                allowFiltering={false}
                                asynchronousFunction={fetchFunctions[category.nameCategory]}
                            />
                        </li>
                    ))}
                </ul>
            </section>


            {/* Sección especial  */}
            <figure
                aria-labelledby="caption-ferxo"
                className={homeStyle.figureContainer}
            >
                <iframe
                    src="https://www.youtube.com/embed/Odaeaho0CQs?si=6Jh3Sl5Qg6FkYsXF"
                    title="Reproductor de vídeo: SHENP BALL SUPER (DB Super Intro Parodia)"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                    className={homeStyle.videoIframe}
                ></iframe>
                <figcaption
                    id="caption-ferxo"
                    className={homeStyle.captionContainer}
                >
                    <strong className={homeStyle.captionTitle}>
                        SHENP BALL SUPER (DB Super Intro Parodia)
                    </strong>
                    <br />
                    <span className={homeStyle.captionDescription}>
                        Vídeo parodia de nuestro amigo FerXo Animations!
                    </span>
                </figcaption>
            </figure>

        </main>
    );
}