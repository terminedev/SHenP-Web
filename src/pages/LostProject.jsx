import { useState, useEffect } from "react";
import { getProjectsLost } from 'utils/firebase/obtainings';
import { getFirebaseErrorMessage } from 'utils/helpers/getFirebaseErrorMessage.js';

// Simplifiqué el nombre del import a "styles" para que el código sea más limpio
import styles from 'styles/pages/LostProject.module.css';

export default function LostProject() {
    const [asynchronousData, setAsynchronousData] = useState({
        lostProyect: [],
        isLoading: false,
        error: null,
    });

    useEffect(() => {
        const getProyects = async () => {
            try {
                setAsynchronousData({ lostProyect: [], isLoading: true, error: null });
                const lostProyect = await getProjectsLost();
                setAsynchronousData({ lostProyect: lostProyect, isLoading: false, error: null });
            } catch (error) {
                setAsynchronousData({ lostProyect: [], isLoading: false, error: error });
            }
        }

        getProyects();
    }, []);

    const { lostProyect, isLoading, error } = asynchronousData;

    return (
        <section className={styles.container}>
            <div className={styles.header}>
                <h2>Proyectos perdidos</h2>
                <p>Homenaje a los proyectos que no pudieron ser recuperados.</p>
            </div>

            {isLoading
                ?
                (
                    <p className={`${styles.loading} space-center`}>Obteniendo proyectos...</p>
                )
                :
                (
                    lostProyect.length > 0
                        ?
                        (
                            <ul className={styles.projectList}>
                                {lostProyect.map((proyect) => (
                                    <li key={proyect.id} className={styles.projectCard}>

                                        {/* Contenedor de la Imagen */}
                                        <div className={styles.imageContainer}>
                                            <img
                                                src={proyect.coverArtUrl}
                                                alt={`Portada del proyecto ${proyect.projectName ?? 'desconocido'}`}
                                                className={styles.coverImage}
                                            />
                                        </div>

                                        {/* Contenedor de los Detalles */}
                                        <div className={styles.detailsContainer}>
                                            <h3 className={styles.title}>{proyect.projectName}</h3>

                                            {proyect.authorName && (
                                                <p className={styles.author}><strong>Autor:</strong> {proyect.authorName}</p>
                                            )}

                                            {proyect.releaseDate && (
                                                <p className={styles.date}><strong>Fecha:</strong> {proyect.releaseDate}</p>
                                            )}

                                            {proyect.catalog && (
                                                <p className={styles.catalog}><strong>Catálogo:</strong> {proyect.catalog}</p>
                                            )}

                                            {proyect.description && (
                                                <p className={styles.description}>{proyect.description}</p>
                                            )}
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )
                        :
                        (
                            !error && <p className={`${styles.empty} space-center`}>No hay proyectos perdidos</p>
                        )
                )}

            {error && <p className={`${styles.error} space-center`}> {getFirebaseErrorMessage(error.message)}</p>}
        </section>
    );
};