import { useEffect, useState } from "react";
import { GALLERY } from "constants/gallery.js";
import { Loading } from 'components/ui/SVGs';

import { getGallery } from 'utils/firebase/obtainings.js';
import { getFirebaseErrorMessage } from 'utils/helpers/getFirebaseErrorMessage.js';

import galleryStyles from 'styles/pages/Gallery.module.css';

export default function Gallery() {

    const [sectionedGallery, setSectionedGallery] = useState('ninguna');
    const [selectedImage, setSelectedImage] = useState(null);

    // Cambiar el título de la pestaña
    document.title = `Galería | Series Hechas en Paint`;

    // Datos galería local
    const [asynchronousData, setAsynchronousData] = useState({
        gallery: [],
        isLoading: false,
        error: null,
    });

    const { gallery, isLoading, error } = asynchronousData;

    // Obtención de una galería
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

        return () => isMounted = false;

    }, [sectionedGallery]);


    // Selector de Galería:
    const GallerySelector = () => {

        const handleChange = (newValue) => {
            setSectionedGallery(newValue);
            setSelectedImage(null); // Resetea el modal si cambia la galería
        };

        return (
            <div className={galleryStyles.selectorContainer}>
                <label htmlFor="sectioned-gallery" className={galleryStyles.label}>
                    Selecciona una galería
                </label>
                <select
                    id="sectioned-gallery"
                    className={galleryStyles.selectInput}
                    value={sectionedGallery}
                    onChange={(e) => handleChange(e.target.value)}
                >
                    <option value="ninguna">Elige una opción...</option>
                    {GALLERY.map(gallery => (
                        <option key={gallery.keyName} value={gallery.keyName}>
                            {gallery.name}
                        </option>
                    ))}
                </select>
            </div>
        )
    };

    // Renderizado Condicional
    const renderContent = () => {

        // Estado 1: Cargando
        if (isLoading) {
            return (
                <div className={`space-center`} style={{ height: 'clamp(180px, 10vw + 150px, 270px)' }}>
                    <Loading className={galleryStyles.loading} />
                </div>
            );
        }

        // Estado 2: Lista si hay imagenes en la galería
        if (gallery.length > 0) {
            return (
                <ul className={galleryStyles.galleryGrid}>
                    {gallery.map((image, index) => (
                        image?.imageUrl && (
                            <li key={image.imageUrl} className={galleryStyles.imageItem}>
                                <img
                                    className={galleryStyles.image}
                                    src={image.imageUrl}
                                    alt={`Galería n${index + 1} de la sección ${image.seccion}`}
                                    loading="lazy"
                                    onClick={() => setSelectedImage(image.imageUrl)} // Abre el modal
                                />
                            </li>
                        )
                    ))}
                </ul>
            );
        }

        // Estado 3: Vacío (sin imagenes)
        if (gallery.length <= 0 && !error && sectionedGallery !== 'ninguna') {
            return (
                <p className={`${galleryStyles.messageContainer} ${galleryStyles.empty}`}>
                    No hay imágenes para mostrar en esta galería.
                </p>
            );
        }

        // Estado 4: Error
        if (error && !isLoading) {
            return (
                <p className={`${galleryStyles.messageContainer} ${galleryStyles.error}`}>
                    {getFirebaseErrorMessage(error.message)}
                </p>
            );
        }

        return null;
    };

    // Renderizado Principal
    return (
        <section className={galleryStyles.gallerySection}>
            {GallerySelector()}
            {renderContent()}

            {/* Renderizado del Modal */}
            {selectedImage && (
                <div
                    className={galleryStyles.modalOverlay}
                    onClick={() => setSelectedImage(null)} // Cierra al hacer click fuera
                >
                    <div
                        className={galleryStyles.modalContent}
                        onClick={(e) => e.stopPropagation()} // Evita que el click en la imagen cierre el modal
                    >
                        <button
                            className={galleryStyles.closeButton}
                            onClick={() => setSelectedImage(null)}
                            aria-label="Cerrar modal"
                        >
                            &times;
                        </button>
                        <img
                            src={selectedImage}
                            alt="Imagen en pantalla completa"
                            className={galleryStyles.modalImage}
                        />
                    </div>
                </div>
            )}
        </section>
    );
};