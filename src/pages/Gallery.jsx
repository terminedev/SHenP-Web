// Librerías
import { useEffect, useState } from "react";

// Componentes
import { GALLERY } from "constants/gallery.js";
import { Loading } from 'components/ui/SVGs';

// Utilidades
import { getGallery } from 'utils/firebase/obtainings.js';
import { getFirebaseErrorMessage } from 'utils/helpers/getFirebaseErrorMessage.js';

// Estilos
import galleryStyles from 'styles/pages/Gallery.module.css';

export default function Gallery() {

    // Galería seleccionada
    const [sectionedGallery, setSectionedGallery] = useState('ninguna');

    // Imagen seleccionada (para el modal)
    const [selectedImage, setSelectedImage] = useState(null);

    // Datos locales obtenidos
    const [asynchronousData, setAsynchronousData] = useState({
        gallery: [],
        isLoading: false,
        error: null,
    });

    const { gallery, isLoading, error } = asynchronousData;


    // Cambiar el título de la pestaña (Side Effect seguro)
    document.title = `Galería | Series Hechas en Paint`;


    // Obtención de los datos de la galería
    useEffect(() => {
        let isMounted = true;
        if (sectionedGallery === 'ninguna') return;

        const getProyects = async () => {
            try {
                setAsynchronousData(prev => ({ ...prev, isLoading: true, error: null }));
                const fetchedProyects = await getGallery(sectionedGallery);

                if (isMounted) {
                    setAsynchronousData({ gallery: fetchedProyects, isLoading: false, error: null });
                }
            } catch (err) {
                if (isMounted) {
                    setAsynchronousData({ gallery: [], isLoading: false, error: err });
                }
            }
        };

        getProyects();

        return () => {
            isMounted = false;
        };
    }, [sectionedGallery]);


    // Manejar el cambio de galería
    const handleGalleryChange = (e) => {
        const newValue = e.target.value;
        setSectionedGallery(newValue);
        setSelectedImage(null);
    };


    // Renderizado condicional
    const renderContent = () => {


        // Estado 1: Cargando
        if (isLoading) {
            return (
                <div
                    className={`space-center`}
                    role="status"
                    aria-label="Cargando galería"
                >
                    <Loading />
                </div>
            );
        }


        // Estado 2: Error
        if (error) {
            return (
                <p
                    className={`${galleryStyles.messageContainer} ${galleryStyles.error}`}
                    role="alert"
                >
                    {getFirebaseErrorMessage(error.message)}
                </p>
            );
        }


        // Estado 3: Lista si hay imágenes en la galería
        if (gallery.length > 0) {
            return (
                <ul
                    className={galleryStyles.galleryGrid}
                    aria-label={`Imágenes de la galería ${sectionedGallery}`}
                >
                    {gallery.map((image, index) => (
                        image?.imageUrl && (
                            <li key={image.imageUrl} className={galleryStyles.imageItem}>
                                <img
                                    className={galleryStyles.image}
                                    src={image.imageUrl}
                                    alt={`Ilustración de ${image.seccion} número ${index + 1}`}
                                    loading="lazy"
                                    onClick={() => setSelectedImage(image.imageUrl)}
                                />
                            </li>
                        )
                    ))}
                </ul>
            );
        }


        // Estado 4: Vacío (sin imágenes)
        if (gallery.length <= 0 && sectionedGallery !== 'ninguna') {
            return (
                <p
                    className={`${galleryStyles.messageContainer} ${galleryStyles.empty}`}
                    aria-live="polite"
                >
                    No hay imágenes para mostrar en esta galería.
                </p>
            );
        }

        return null;
    };


    // Renderizado principal
    return (
        <section className={galleryStyles.gallerySection}>

            {/* Selector de Galería */}
            <div className={galleryStyles.selectorContainer}>
                <label htmlFor="sectioned-gallery" className={galleryStyles.label}>
                    Selecciona una galería
                </label>
                <select
                    id="sectioned-gallery"
                    className={galleryStyles.selectInput}
                    value={sectionedGallery}
                    onChange={handleGalleryChange}
                    aria-label="Selector de sección de galería"
                >
                    <option value="ninguna">Elige una opción...</option>
                    {GALLERY.map(galleryOption => (
                        <option key={galleryOption.keyName} value={galleryOption.keyName}>
                            {galleryOption.name}
                        </option>
                    ))}
                </select>
            </div>

            {/* Contenido Dinámico */}
            {renderContent()}

            {/* Modal de Imagen */}
            {selectedImage && (
                <div
                    className={galleryStyles.modalOverlay}
                    onClick={() => setSelectedImage(null)}
                    role="dialog"
                    aria-modal="true"
                    aria-label="Vista de imagen en pantalla completa"
                >
                    <div
                        className={galleryStyles.modalContent}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            className={galleryStyles.closeButton}
                            onClick={() => setSelectedImage(null)}
                            aria-label="Cerrar vista en pantalla completa"
                        >
                            ⨉
                        </button>
                        <img
                            src={selectedImage}
                            alt="Imagen ampliada en pantalla completa"
                            className={galleryStyles.modalImage}
                        />
                    </div>
                </div>
            )}
        </section>
    );
}