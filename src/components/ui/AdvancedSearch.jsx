import { useState, useEffect } from "react";

// Componentes
import { Link } from "react-router-dom";
import { Loading } from 'components/ui/SVGs';

// Utilidades
import { searchProductsByName } from 'utils/firebase/obtainings';
import { getFirebaseErrorMessage } from 'utils/helpers/getFirebaseErrorMessage.js';

// Estilos
import advancedSearchStyles from 'styles/ui/AdvancedSearch.module.css';

export default function AdvancedSearch({ onClose = () => { } }) {

    // Estado de la consulta.
    const [query, setQuery] = useState('');


    // Respuesta local de la busqueda. 
    const [asynchronousData, setAsynchronousData] = useState({
        results: [],
        isLoading: false,
        error: null,
    });

    const { results, isLoading, error } = asynchronousData;


    // Maneja el cierre con la tecla Escape para mejorar la UX/Accesibilidad
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [onClose]);


    // Lógica de Búsqueda
    useEffect(() => {

        // Si el input está vacío, reseteamos el estado inmediatamente.
        if (!query.trim()) {
            setAsynchronousData({ results: [], isLoading: false, error: null });
            return;
        }

        setAsynchronousData(prev => ({ ...prev, isLoading: true, error: null }));

        const debounceTimer = setTimeout(async () => {

            try {
                const queryClean = query
                    .trim()
                    .toLocaleLowerCase()
                    .replaceAll(' ', '-');

                const data = await searchProductsByName(queryClean);
                setAsynchronousData({ results: data, isLoading: false, error: null });

            } catch (error) {
                setAsynchronousData({ results: [], isLoading: false, error });
            }
        }, 500);

        return () => clearTimeout(debounceTimer);
    }, [query]);



    return (
        <section
            className={advancedSearchStyles.overlayWrapper}
            role="dialog"
            aria-modal="true"
            aria-label="Buscador avanzado de proyectos"
        >


            {/* Botón cerrar buscador */}
            <button
                className={advancedSearchStyles.overlay}
                onClick={onClose}
                aria-hidden="true"
                tabIndex="-1"
            />


            {/* Buscador */}
            <div className={advancedSearchStyles.container}>
                <input
                    type="search"
                    className={advancedSearchStyles.searchInput}
                    placeholder="Busca proyecto por nombre..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    autoFocus
                    aria-label="Escribe el nombre del proyecto"
                    aria-controls="search-results"
                    aria-expanded={results.length > 0}
                />

                {/* Contenedor de Resultados con Live Region para Lectores de Pantalla */}
                <div
                    className={advancedSearchStyles.resultsContainer}
                    id="search-results"
                    role="region"
                    aria-live="polite"
                >

                    {/* Estado: Cargando */}
                    {isLoading && (
                        <div className="space-center" aria-busy="true">
                            <Loading />
                            <span className="sr-only">Buscando resultados...</span>
                        </div>
                    )}


                    {/* Estado: Lista de Resultados */}
                    {!isLoading && results.length > 0 && (
                        <ul className={advancedSearchStyles.resultsList} role="listbox">
                            {results.map((proyect) => (
                                <li key={proyect.idProyect} className={advancedSearchStyles.resultItem} role="option">
                                    <Link
                                        to={`/proyecto/${proyect.idProyect}`}
                                        className={advancedSearchStyles.resultLink}
                                        onClick={onClose}
                                    >
                                        <div className={advancedSearchStyles.infoContainer}>
                                            <p className={advancedSearchStyles.projectTitle}>{proyect.projectName}</p>
                                            <p className={advancedSearchStyles.projectCatalog}>{proyect.catalog}</p>
                                        </div>

                                        {proyect.coverArtUrl?.trim() && (
                                            <img
                                                src={proyect.coverArtUrl}
                                                alt={`Portada de ${proyect.projectName}`}
                                                className={advancedSearchStyles.coverImage}
                                                loading="lazy"
                                            />
                                        )}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    )}

                    {/* Estado: Sin Resultados */}
                    {!isLoading && query.trim() !== '' && results.length === 0 && !error && (
                        <p className={`${advancedSearchStyles.statusMessage} space-center`}>
                            No se encontraron proyectos para "{query}"
                        </p>
                    )}

                    {/* Estado: Error */}
                    {error && (
                        <p className={`${advancedSearchStyles.errorMessage} space-center`} role="alert">
                            {getFirebaseErrorMessage(error.message)}
                        </p>
                    )}
                </div>
            </div>
        </section>
    );
};