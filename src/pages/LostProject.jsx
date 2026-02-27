// Librería
import { useState, useEffect } from "react";

// Utilizades
import { getProjectsLost } from 'utils/firebase/obtainings';
import { getFirebaseErrorMessage } from 'utils/helpers/getFirebaseErrorMessage.js';

// Estilos
import styles from 'styles/pages/LostProject.module.css';

export default function LostProject() {

    // Datos asíncronos obtenidos. 
    const [asynchronousData, setAsynchronousData] = useState({
        lostProject: [],
        isLoading: true,
        error: null,
    });

    const { lostProject, isLoading, error } = asynchronousData;

    // Se obtiene los proyectos perdidos. 
    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const projects = await getProjectsLost();
                setAsynchronousData({
                    lostProject: projects,
                    isLoading: false,
                    error: null
                });
            } catch (error) {
                setAsynchronousData({
                    lostProject: [],
                    isLoading: false,
                    error: error
                });
            }
        };

        fetchProjects();
    }, []);


    return (
        <section
            className={styles.container}
            aria-labelledby="lost-projects-title"
        >
            <header className={styles.header}>
                <h2 id="lost-projects-title">Proyectos perdidos</h2>
                <p>Homenaje a los proyectos que no pudieron ser recuperados.</p>
            </header>

            {/* Estado: Cargando  */}
            {isLoading && (
                <div aria-live="polite" aria-busy="true">
                    <p className={`${styles.loading} space-center`}>Obteniendo proyectos...</p>
                </div>
            )}

            {/* Estado: Error */}
            {error && (
                <div aria-live="assertive"> {/* ARIA: Interrumpe para anunciar el error inmediatamente */}
                    <p className={`${styles.error} space-center`}>
                        {getFirebaseErrorMessage(error.message)}
                    </p>
                </div>
            )}

            {/* Estado: Éxito (Con datos) */}
            {!isLoading && !error && lostProject.length > 0 && (
                <ul
                    className={styles.projectList}
                    aria-label="Lista de proyectos perdidos" // ARIA: Describe el propósito de esta lista
                >
                    {lostProject.map((project) => (
                        <li key={project.idProyect} className={styles.projectCard}>

                            {/* Contenedor de la Imagen */}
                            <div className={styles.imageContainer}>
                                <img
                                    src={project.coverArtUrl}
                                    alt={`Portada del proyecto ${project.projectName ?? 'desconocido'}`}
                                    className={styles.coverImage}
                                    loading="lazy"
                                />
                            </div>

                            {/* Contenedor de los Detalles */}
                            <div className={styles.detailsContainer}>
                                <h3 className={styles.title}>{project.projectName}</h3>

                                {project.authorName && (
                                    <p className={styles.author}>
                                        <strong>Autor:</strong> {project.authorName}
                                    </p>
                                )}

                                {project.releaseDate && (
                                    <p className={styles.date}>
                                        <strong>Fecha:</strong> {project.releaseDate}
                                    </p>
                                )}

                                {project.catalog && (
                                    <p className={styles.catalog}>
                                        <strong>Catálogo:</strong> {project.catalog}
                                    </p>
                                )}

                                {project.description && (
                                    <p className={styles.description}>{project.description}</p>
                                )}
                            </div>
                        </li>
                    ))}
                </ul>
            )}

            {/* Estado: Éxito (Sin datos) */}
            {!isLoading && !error && lostProject.length === 0 && (
                <div aria-live="polite">
                    <p className={`${styles.empty} space-center`}>No hay proyectos perdidos</p>
                </div>
            )}
        </section>
    );
}