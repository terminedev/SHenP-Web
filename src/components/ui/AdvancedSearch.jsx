import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { searchProductsByName } from 'utils/firebase/obtainings';

import advancedSearchStyles from 'styles/structure/ui/AdvancedSearch.module.css';
import { Loading } from 'components/ui/SVGs';

export default function AdvancedSearch({ onClose, searchFunction }) {

    const [query, setQuery] = useState('');

    const [asynchronousData, setAsynchronousData] = useState({
        results: [],
        isLoading: false,
        error: null,
    });

    useEffect(() => {
        if (query.trim() === '') return setAsynchronousData({ results: [], isLoading: false, error: null });

        const debounceTimer = setTimeout(async () => {
            try {
                setAsynchronousData({ results: [], isLoading: true, error: null });

                const queryClean = query
                    .trim()
                    .toLocaleLowerCase()
                    .replaceAll(' ', '-');

                const data = await searchProductsByName(queryClean);

                setAsynchronousData({ results: data, isLoading: false, error: null });

            } catch (error) {
                setAsynchronousData({ results: [], isLoading: false, error: error });
            }
        }, 700);

        return () => clearTimeout(debounceTimer);
    }, [query, searchFunction]);

    const { results, isLoading, error } = asynchronousData;

    return (
        <>
            <div className={advancedSearchStyles.overlay} onClick={onClose} />

            <div className={advancedSearchStyles.container}>
                <input
                    type="search"
                    className={advancedSearchStyles.searchInput}
                    placeholder="Busca proyecto por nombre..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    autoFocus
                />

                <div className={advancedSearchStyles.resultsContainer}>
                    {isLoading ? (
                        <Loading className={advancedSearchStyles.loading} />
                    ) : (
                        results.length > 0 ? (
                            <ul className={advancedSearchStyles.resultsList}>
                                {results.map(proyect => (
                                    <li key={proyect.id} className={advancedSearchStyles.resultItem}>
                                        <Link
                                            to={`/proyecto/${proyect.idProyect}`}
                                            className={advancedSearchStyles.resultLink}
                                            onClick={onClose}
                                        >
                                            <div className={advancedSearchStyles.infoContainer}>
                                                <p className={advancedSearchStyles.projectTitle}>{proyect.projectName}</p>
                                                <p className={advancedSearchStyles.projectCatalog}>{proyect.catalog}</p>
                                            </div>

                                            {proyect.coverArtUrl?.trim() !== '' && (
                                                <img
                                                    src={proyect.coverArtUrl}
                                                    alt={`Portada de ${proyect.projectName}`}
                                                    className={advancedSearchStyles.coverImage}
                                                />
                                            )}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            query.trim() !== '' && <p className={advancedSearchStyles.statusMessage}>No hay resultados de búsqueda</p>
                        )
                    )}

                    {error && <p className={advancedSearchStyles.errorMessage}>{error.message}</p>}
                </div>
            </div>
        </>
    );
};