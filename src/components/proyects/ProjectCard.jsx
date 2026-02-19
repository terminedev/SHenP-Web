import { Link } from "react-router-dom";

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
        >
            {/* Contenedor de la imagen */}
            <div>
                {coverArtUrl?.trim() !== '' ? (
                    <img
                        src={coverArtUrl}
                        alt={`Portada de ${projectName}`}
                    />
                ) : (
                    // Opcional: un placeholder si no hay imagen
                    <div>Sin Imagen</div>
                )}
            </div>

            {/* Contenedor de información */}
            <div >
                <h3 >{projectName}</h3>
                <span>{releaseDate}</span>
            </div>
        </Link>
    );
};