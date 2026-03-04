import styles from 'styles/pages/ShenpReflection.module.css';

export default function ShenpReflection() {
    return (
        <section className={styles.container} aria-labelledby="shenp-reflection-title">
            <div className={styles.header}>
                <h2 id="shenp-reflection-title" className={styles.mainTitle}>Reflexión de SHenP: Legado de una CREW</h2>
                <p className={styles.intro}>
                    A través de una reflexión sobre los proyectos de la banda de Shenp,
                    Dani contó su historia de integración. Explicó lo que significó ese
                    cambio para él y su impacto en el grupo, sin olvidar el legado que
                    cada uno de ellos representa.
                </p>
            </div>

            <ul className={styles.videoGrid} aria-label="Lista de videos sobre el legado y proyectos de SHenP">

                {/* Ítem 1: CONTRA-PARTES */}
                <li className={styles.card} aria-labelledby="title-contra-partes">
                    <h3 id="title-contra-partes" className={styles.cardTitle}>Entendiendo los orígenes externos de LeinaD (CONTRA-PARTES 5° Aniversario)</h3>
                    <iframe
                        src="https://www.youtube.com/embed/NrTaknCZKqY?si=Yn-77qa9l2KRmuGs"
                        title="Entendiendo los orígenes externos de LeinaD"
                        aria-label="Video de YouTube: Entendiendo los orígenes externos de LeinaD"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen
                        className={styles.iframe}>
                    </iframe>
                    <p className={styles.cardText}>
                        <em>CONTRA-PARTES</em> celebra su quinto aniversario. Desde su lanzamiento, muchas
                        cosas han cambiado; diversas anécdotas y eventualidades acompañaron el desarrollo de
                        una de las obras más importantes de la comunidad. En esta retrospectiva exploramos cómo,
                        irónicamente, ciertas situaciones personales influyeron de manera directa en su consolidación
                        a largo plazo.
                    </p>
                </li>

                {/* Ítem 2: EXE World 2 */}
                <li className={styles.card} aria-labelledby="title-exe-world">
                    <h3 id="title-exe-world" className={styles.cardTitle}>Exe World 2 es más que un juego PPT</h3>
                    <iframe
                        src="https://www.youtube.com/embed/O1AUvzFLiZw?si=EYrheQRp9sN1I8ee"
                        title="Gaston EXE World 2 es más que un juego PPT"
                        aria-label="Video de YouTube: Gaston EXE World 2 es más que un juego PPT"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen
                        className={styles.iframe}>
                    </iframe>
                    <p className={styles.cardText}>
                        <em>Gaston EXE World 2</em> no fue solo un juego PPT; fue un fenómeno que marcó un antes y
                        un después para SHenP, DP2002 y toda la comunidad de creadores en PowerPoint. A cinco años de
                        su estreno, reflexionamos sobre la magia que impulsó su rotundo éxito y recordamos el enorme
                        legado que dejó tras su última actualización.
                    </p>
                </li>

                {/* Ítem 3: GLITCH-WAR */}
                <li className={styles.card} aria-labelledby="title-glitch-war">
                    <h3 id="title-glitch-war" className={styles.cardTitle}>La Post-producción de GLITCH-WAR</h3>
                    <iframe
                        src="https://www.youtube.com/embed/TIxwuAQAX-s?si=3lODgflXfWUY76p-"
                        title="La Post-producción de GLITCH-WAR"
                        aria-label="Video de YouTube: La Post-producción de GLITCH-WAR"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen
                        className={styles.iframe}>
                    </iframe>
                    <p className={styles.cardText}>
                        Glitch-War es, sin duda, uno de los proyectos más ambiciosos dentro de SHenP.
                        Automode Animations le ha dedicado un nivel de detalle y tiempo inusual, un esfuerzo
                        que pocos logran replicar. Aunque el camino ha estado lleno de desafíos, la etapa de
                        post-producción del episodio piloto demuestra que las barreras han quedado atrás,
                        prometiendo un cierre que brindará una gran satisfacción.
                    </p>
                </li>

                {/* Ítem 4: Pig001: Adventure */}
                <li className={styles.card} aria-labelledby="title-pig001">
                    <h3 id="title-pig001" className={styles.cardTitle}>El legado de Pig001: Adventure (5° Aniversario)</h3>
                    <iframe
                        src="https://www.youtube.com/embed/oj6X6zWB5BY?si=IBYZFb7g6nuoFi2e"
                        title="El legado de Pig001: Adventure"
                        aria-label="Video de YouTube: El legado de Pig001: Adventure"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen
                        className={styles.iframe}>
                    </iframe>
                    <p className={styles.cardText}>
                        SHenP no sería lo que es hoy sin <em>Pig Adventure</em>. A cinco años de su lanzamiento
                        en DP2002, rememoramos los sucesos clave que forjaron este legado tan especial. Desde su
                        conceptualización hasta su inminente cancelación, repasamos los momentos más icónicos
                        de la serie para celebrar un aniversario que honra el verdadero origen de todo.
                    </p>
                </li>

            </ul>
        </section>
    );
}