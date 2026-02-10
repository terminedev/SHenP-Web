import { Link } from "react-router-dom";

export default function ProjectCard({ proyect }) {

    const {
        idProyect,
        projectName,
        coverArtUrl,
        releaseDate
    } = proyect;

    return (
        <Link to={`/proyecto/${idProyect}`}>

            {/* Si hay portada mostrarla */}
            {
                coverArtUrl?.trim() !== '' && <img src={coverArtUrl} alt={`Portada del proyecto ${projectName ?? 'desconocido'}`} />
            }

            <p>{projectName}</p>
            <p>{releaseDate}</p>
        </Link>
    )
};