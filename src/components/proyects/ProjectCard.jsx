import { Link } from "react-router-dom";
import projectCardStyles from 'styles/proyects/ProjectCard.module.css';

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
            className={projectCardStyles.card}
        >
            {/* Contenedor de la imagen */}
            <div className={projectCardStyles.imageContainer}>
                <img
                    src={coverArtUrl}
                    alt={`Portada de ${projectName}`}
                    className={projectCardStyles.image}
                />
            </div>

            {/* Contenedor de información */}
            <div className={projectCardStyles.info}>
                <h3 className={projectCardStyles.title}>{projectName}</h3>
                <span className={projectCardStyles.date}>{releaseDate}</span>
            </div>
        </Link>
    );
}