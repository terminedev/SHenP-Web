import { useState } from "react";
import { Navigate, useParams } from "react-router-dom";

// getProject(idProyect);

export default function ProjectTemplate() {
    const { idProyect } = useParams();

    if (idProyect.trim() !== '') return <Navigate to={'/'} replace />

    const [asynchronousData, setAsynchronousData] = useState({
        proyect: [],
        isLoading: false,
        error: null,
    });

    useEffect(() => {
        const getProyect = async () => {
            try {
                setAsynchronousData({ proyect: [], isLoading: true, error: null });

                const proyect = await getProject(idProyect);

                setAsynchronousData({ proyect: proyect, isLoading: false, error: null });
            } catch (error) {
                setAsynchronousData({ proyect: [], isLoading: false, error: error });
            }
        }

        getProyect();
    }, []);

    const { proyect, isLoading, error } = asynchronousData;

    return (
        <article>
            {
                isLoading
                    ? <p>Obteniendo proyecto...</p>
                    : (
                        <>
                            <h2>Nombre: {proyect.projectName}</h2>

                            {proyect.coverArtUrl?.trim() !== '' && (
                                <img
                                    src={proyect.coverArtUrl}
                                    alt={`Portada del proyecto ${proyect.projectName ?? 'desconocido'}`}
                                />
                            )}
                        </>
                    )
            }
            {
                error && <p>{error.message}</p>
            }
        </article>
    )
};