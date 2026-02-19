import { Link } from "react-router-dom";
import projectCardStyles from 'styles/structure/components/ProjectCard.module.css';

export default function ProjectCard({ proyect }) {

    const {
        idProyect,
        projectName,
        coverArtUrl,
        releaseDate
    } = proyect;

    return (
        <Link
            to={`/proyecto/${idProyect}`}
            className={projectCardStyles.card} // Clase principal
        >
            {/* Contenedor de la imagen */}
            <div className={projectCardStyles.imageContainer}>
                {coverArtUrl?.trim() !== '' ? (
                    <img
                        src={coverArtUrl}
                        alt={`Portada de ${projectName}`}
                        className={projectCardStyles.image}
                    />
                ) : (
                    // Opcional: un placeholder si no hay imagen
                    <div className={projectCardStyles.placeholder}>Sin Imagen</div>
                )}
            </div>

            {/* Contenedor de información */}
            <div className={projectCardStyles.info}>
                <h3 className={projectCardStyles.title}>{projectName}</h3>
                <span className={projectCardStyles.date}>{releaseDate}</span>
            </div>
        </Link>
    );
};