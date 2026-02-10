import { useState } from "react";
import { Navigate, useParams } from "react-router-dom";

export default function ProjectTemplate() {
    const { idProyect } = useParams();

    if (idProyect.trim() !== '') return <Navigate to={'/'} replace />

    const [proyect, setProyect] = useState(null);

    // Función para obtener un proyecto mediante idProyect;

    return (
        <article>
            <h2>Nombre: {proyect.projectName}</h2>
            {
                proyect.coverArtUrl?.trim() !== '' && <img src={proyect.coverArtUrl} alt={`Portada del proyecto ${projectName ?? 'desconocido'}`} />
            }
        </article>
    )
};