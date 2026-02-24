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

    return (
        <Link
            to={`/proyecto/${idProyect}`}
            className={projectCardStyles.card}
        >
            {/* Contenedor de la Imagen */}
            <div className={projectCardStyles.imageContainer}>
                <img
                    src={coverArtUrl}
                    alt={`Portada del proyecto: ${projectName}`}
                    className={projectCardStyles.image}
                    loading="lazy"
                />
            </div>

            {/* Contenedor de Información */}
            <div className={projectCardStyles.info}>
                <h3 className={projectCardStyles.title}>{projectName}</h3>
                <span className={projectCardStyles.date}>{releaseDate}</span>
            </div>
        </Link>
    );
}