import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { getProject } from 'utils/firebase/obtainings';

import projectTemplateStyles from 'styles/pages/ProjectTemplate.module.css';

export default function ProjectTemplate() {
    const { idProyect } = useParams();

    // Estado para controlar qué imagen se ve en grande en la galería
    const [selectedImage, setSelectedImage] = useState(null);

    const [asynchronousData, setAsynchronousData] = useState({
        proyect: null, // Cambiado a null para evaluar mejor si hay datos
        isLoading: true,
        error: null,
    });

    if (!idProyect?.trim()) return <Navigate to={'/'} replace />;

    useEffect(() => {
        const getProyect = async () => {
            try {
                setAsynchronousData({ proyect: null, isLoading: true, error: null });
                const fetchedProyect = await getProject(idProyect);
                setAsynchronousData({ proyect: fetchedProyect, isLoading: false, error: null });
            } catch (error) {
                setAsynchronousData({ proyect: null, isLoading: false, error: error });
            }
        };

        getProyect();
    }, [idProyect]); // Agregado idProyect a las dependencias

    const { proyect, isLoading, error } = asynchronousData;

    if (isLoading) {
        return (
            <div className={projectTemplateStyles.loadingContainer}>
                <div className={projectTemplateStyles.spinner}></div>
            </div>
        );
    }

    if (error) {
        return <div className={projectTemplateStyles.errorContainer}><p>{error.message}</p></div>;
    }

    if (!proyect) return null;

    return (
        <article className={projectTemplateStyles.mainContainer}>
            {/* Sección Hero (Estilo Portada de Netflix) */}
            <header className={projectTemplateStyles.heroSection}>
                {proyect.introUrl && (
                    <img
                        className={projectTemplateStyles.heroBackground}
                        src={proyect.introUrl}
                        alt={`Portada de ${proyect.projectName}`}
                    />
                )}
                <div className={projectTemplateStyles.heroVignette}></div> {/* Degradado oscuro */}

                <div className={projectTemplateStyles.heroContent}>
                    <h1 className={projectTemplateStyles.title}>{proyect.projectName}</h1>

                    <div className={projectTemplateStyles.metadata}>
                        <span className={`${projectTemplateStyles.status} ${projectTemplateStyles[proyect.status] || ''}`}>
                            {proyect.status?.toUpperCase() || 'Desconocido'}
                        </span>
                        <span>{proyect.releaseDate}</span>
                        <span className={projectTemplateStyles.catalog}>{proyect.catalog}</span>
                    </div>

                    <p className={projectTemplateStyles.description}>{proyect.description}</p>

                    <div className={projectTemplateStyles.actions}>
                        {proyect.projectUrl && (
                            <a href={proyect.projectUrl} target="_blank" rel="noreferrer" className={projectTemplateStyles.btnPrimary}>
                                <span>▶</span> Ver Proyecto
                            </a>
                        )}
                    </div>

                    <div className={projectTemplateStyles.detailsInfo}>
                        <p>
                            <span className={projectTemplateStyles.detailsLabel}>Autor: </span>
                            {proyect.authorProfileUrl ? (
                                <a href={proyect.authorProfileUrl} target="_blank" rel="noreferrer" className={projectTemplateStyles.authorLink}>
                                    {proyect.authorName}
                                </a>
                            ) : (
                                proyect.authorName
                            )}
                        </p>
                        <p>
                            <span className={projectTemplateStyles.detailsLabel}>Géneros: </span>
                            {proyect.genre?.join(', ')}
                        </p>
                    </div>
                </div>
            </header>

            {/* Sección de Galería (Fila estilo Netflix) */}
            {proyect.gallery && proyect.gallery.length > 0 && (
                <section className={projectTemplateStyles.gallerySection}>
                    <h2 className={projectTemplateStyles.galleryTitle}>Galería del proyecto</h2>
                    <div className={projectTemplateStyles.galleryRow}>
                        {proyect.gallery.map((imgUrl, index) => (
                            <img
                                key={index}
                                src={imgUrl}
                                alt={`Galería ${index + 1}`}
                                className={projectTemplateStyles.galleryImage}
                                onClick={() => setSelectedImage(imgUrl)}
                            />
                        ))}
                    </div>
                </section>
            )}

            {/* Modal para ver imagen en grande */}
            {selectedImage && (
                <div className={projectTemplateStyles.modalOverlay} onClick={() => setSelectedImage(null)}>
                    <div className={projectTemplateStyles.modalContent}>
                        <button className={projectTemplateStyles.closeButton} onClick={() => setSelectedImage(null)}>✕</button>
                        <img src={selectedImage} alt="Vista ampliada" className={projectTemplateStyles.expandedImage} />
                    </div>
                </div>
            )}
        </article>
    );
}