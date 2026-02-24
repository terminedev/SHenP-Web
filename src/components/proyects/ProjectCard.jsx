// Dependencias externas
import { Link } from "react-router-dom";

// Estilos
import projectCardStyles from 'styles/proyects/ProjectCard.module.css';

export default function ProjectCard({ proyect }) {

    // Si el objeto project no existe, evitamos que la aplicación se rompa.
    if (!proyect) return null;

    // 4. Desestructuración del objeto proyecto.
    const {
        idProyect,
        projectName,
        coverArtUrl,
        releaseDate
    } = proyect;

    // Generamos un ID único para el título para relacionarlo con el enlace
    const titleId = `project-title-${idProyect}`;

    return (
        <Link
            to={`/proyecto/${idProyect}`}
            className={projectCardStyles.card}
            aria-labelledby={titleId}
            aria-label={`Ver detalles del proyecto: ${projectName}`}
        >
            {/* Contenedor de la Imagen */}
            <div
                className={projectCardStyles.imageContainer}
                aria-hidden="true"
            >
                {/* Mantenemos el alt descriptivo, pero marcamos el contenedor como 
                  aria-hidden si el Link ya tiene un label potente, 
                  evitando redundancia en algunos lectores de pantalla.
                */}
                <img
                    src={coverArtUrl}
                    alt={`Portada de ${projectName}`}
                    className={projectCardStyles.image}
                    loading="lazy"
                />
            </div>

            {/* Contenedor de Información */}
            <div className={projectCardStyles.info}>
                <h3
                    id={titleId}
                    className={projectCardStyles.title}
                >
                    {projectName}
                </h3>
                <span
                    className={projectCardStyles.date}
                    aria-label={`Fecha de lanzamiento: ${releaseDate}`}
                >
                    {releaseDate}
                </span>
            </div>
        </Link>
    );
}