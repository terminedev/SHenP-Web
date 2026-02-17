import { useState, useEffect } from "react"; // Agregado useEffect
import { getProjectsLost } from 'utils/firebase/obtainings';
import styles from 'styles/structure/pages/LostProject.module.css'; // Asegúrate que la ruta sea correcta

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
            <h2 className={styles.title}>Proyectos perdidos</h2>
            <p className={styles.description}>Homenaje a los proyectos que no pudieron ser recuperados.</p>

            {isLoading ? (
                <p className={styles.loading}>Obteniendo proyectos...</p>
            ) : (
                lostProyect.length > 0 ? (
                    <ul className={styles.list}>
                        {lostProyect.map((proyect) => (
                            <li key={proyect.id} className={styles.card}>
                                <h3 className={styles.projectName}>{proyect.projectName}</h3>
                                {proyect.coverArtUrl?.trim() !== '' && (
                                    <div className={styles.imageContainer}>
                                        <img
                                            src={proyect.coverArtUrl}
                                            alt={`Portada del proyecto ${proyect.projectName ?? 'desconocido'}`}
                                            className={styles.projectImage}
                                        />
                                    </div>
                                )}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className={styles.empty}>No hay proyectos perdidos</p>
                )
            )}

            {error && <p className={styles.error}>{error.message}</p>}
        </section>
    );
};