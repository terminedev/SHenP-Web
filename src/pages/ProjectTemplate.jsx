// Librerías
import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { Loading } from 'components/ui/SVGs';

// Utilidades
import { getProject } from 'utils/firebase/obtainings';

// Estilos
import projectTemplateStyles from 'styles/pages/ProjectTemplate.module.css';

export default function ProjectTemplate() {

    // Obtiene el id del proyecto.
    const { idProyect } = useParams();


    // Controla qué imagen se muestra en el modal interactivo de la galería
    const [selectedImage, setSelectedImage] = useState(null);


    // Agrupa la lógica asíncrona (datos, carga y errores) en un solo estado
    const [asynchronousData, setAsynchronousData] = useState({
        proyect: null,
        isLoading: true,
        error: null,
    });


    useEffect(() => {
        // Validación temprana por si el idProyect viene vacío desde la URL
        if (!idProyect?.trim()) return;

        const fetchProject = async () => {
            try {
                // Se reinicia el estado de carga antes de pedir los nuevos datos
                setAsynchronousData({ proyect: null, isLoading: true, error: null });
                const fetchedProyect = await getProject(idProyect);

                setAsynchronousData({ proyect: fetchedProyect, isLoading: false, error: null });
            } catch (error) {
                setAsynchronousData({ proyect: null, isLoading: false, error: error });
            }
        };

        fetchProject();
    }, [idProyect]);


    // Si no hay parámetro de URL válido, redirigimos inmediatamente al inicio
    if (!idProyect?.trim()) return <Navigate to={'/'} replace />;

    const { proyect, isLoading, error } = asynchronousData;


    // Cambiar el título de la pestaña
    useEffect(() => {
        if (proyect) {
            document.title = `${proyect.projectName} | Series Hechas en Paint`;
        } else {
            document.title = `Proyecto... | Series Hechas en Paint`;
        }
    }, [proyect]);


    // Vista: Pantalla de Carga
    if (isLoading) {
        return (
            <div
                className={projectTemplateStyles.loadingContainer}
                aria-live="polite"
                aria-busy="true"
            >
                <Loading />
            </div>
        );
    }

    // Vista: Pantalla de Error
    if (error) {
        return (
            <div
                className={projectTemplateStyles.errorContainer}
                role="alert"
                aria-live="assertive"
            >
                <p>Ocurrió un error al cargar el proyecto: {error.message}</p>
            </div>
        );
    }

    // Prevención de errores si el objeto proyecto no existe o viene mal formado
    if (!proyect) return null;

    return (
        <article className={projectTemplateStyles.mainContainer}>

            {/* Sección Hero */}
            <header className={projectTemplateStyles.heroSection} aria-label="Cabecera del proyecto">

                {/* Imagen de fondo del Hero */}
                {proyect.introUrl && (
                    <img
                        className={projectTemplateStyles.heroBackground}
                        src={proyect.introUrl}
                        alt="" // Vacío intencionalmente (es decorativo, aria-hidden lo ignora)
                        aria-hidden="true"
                    />
                )}

                {/* Degradado oscuro decorativo */}
                <div className={projectTemplateStyles.heroVignette} aria-hidden="true"></div>

                {/* Contenido principal del Hero */}
                <div className={projectTemplateStyles.heroContent}>

                    {/* Contenedor Izquierdo: Texto */}
                    <div className={projectTemplateStyles.heroContentLeft}>
                        <h1 className={projectTemplateStyles.title}>
                            {proyect.projectName}
                        </h1>

                        <div className={projectTemplateStyles.metadata} aria-label="Metadatos del proyecto">
                            <span
                                className={`${projectTemplateStyles.status} ${projectTemplateStyles[proyect.status] || ''}`}
                                aria-label={`Estado actual: ${proyect.status}`}
                            >
                                {proyect.status?.toUpperCase() || 'Desconocido'}
                            </span>
                            <span aria-label={`Año de lanzamiento: ${proyect.releaseDate}`}>
                                {proyect.releaseDate}
                            </span>
                            <span className={projectTemplateStyles.catalog} aria-label={`Catálogo: ${proyect.catalog}`}>
                                {proyect.catalog}
                            </span>
                        </div>

                        <p className={projectTemplateStyles.description}>
                            {proyect.description}
                        </p>

                        <div className={projectTemplateStyles.actions}>
                            {proyect.projectUrl && (
                                <a
                                    href={proyect.projectUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    className={projectTemplateStyles.btnPrimary}
                                    aria-label={`Ir al proyecto ${proyect.projectName} en una nueva pestaña`}
                                >
                                    <span aria-hidden="true">▶</span> Ver Proyecto
                                </a>
                            )}
                        </div>

                        <div className={projectTemplateStyles.detailsInfo}>
                            <p>
                                <span className={projectTemplateStyles.detailsLabel}>Autor: </span>
                                {proyect.authorProfileUrl ? (
                                    <a
                                        href={proyect.authorProfileUrl}
                                        target="_blank"
                                        rel="noreferrer"
                                        className={projectTemplateStyles.authorLink}
                                        aria-label={`Perfil del autor: ${proyect.authorName}`}
                                    >
                                        {proyect.authorName} ↗
                                    </a>
                                ) : (
                                    proyect.authorName
                                )}
                            </p>
                            <p>
                                <span className={projectTemplateStyles.detailsLabel}>Géneros: </span>
                                <span className={projectTemplateStyles.genres}>{proyect.genre?.join(', ')}</span>
                            </p>
                        </div>
                    </div>

                    {/* Contenedor Derecho: Logo */}
                    <div className={projectTemplateStyles.heroContentRight}>
                        {proyect.logoUrl && (
                            <img
                                src={proyect.logoUrl}
                                alt={`Logo de ${proyect.projectName}`}
                                className={projectTemplateStyles.heroLogo}
                            />
                        )}
                    </div>

                </div>
            </header>

            {/* Sección galería */}
            {proyect.gallery && proyect.gallery.length > 0 && (
                <section className={projectTemplateStyles.gallerySection} aria-labelledby="gallery-title">
                    <h2 id="gallery-title" className={projectTemplateStyles.galleryTitle}>
                        Galería del proyecto
                    </h2>

                    <div className={projectTemplateStyles.galleryRow} role="list">
                        {proyect.gallery.map((imgUrl, index) => (
                            <img
                                key={index}
                                src={imgUrl}
                                alt={`Ampliar imagen ${index + 1} de la galería`}
                                className={projectTemplateStyles.galleryImage}
                                onClick={() => setSelectedImage(imgUrl)}
                                role="button"
                                tabIndex={0}
                                aria-haspopup="dialog"
                            />
                        ))}
                    </div>
                </section>
            )}

            {/* Modal imagen ampleada */}
            {selectedImage && (
                <div
                    className={projectTemplateStyles.modalOverlay}
                    onClick={() => setSelectedImage(null)}
                    role="dialog"
                    aria-modal="true"
                    aria-label="Vista ampliada de la imagen"
                >
                    <div
                        className={projectTemplateStyles.modalContent}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            className={projectTemplateStyles.closeButton}
                            onClick={() => setSelectedImage(null)}
                            aria-label="Cerrar vista ampliada"
                            autoFocus
                        >
                            <span aria-hidden="true">✕</span>
                        </button>

                        <img
                            src={selectedImage}
                            alt="Vista ampliada de la galería"
                            className={projectTemplateStyles.expandedImage}
                        />
                    </div>
                </div>
            )}
        </article>
    );
}