import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { searchProductsByName } from 'utils/firebase/obtainings';

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
        <div>
            <button type="button" onClick={onClose}>Cerrar buscador</button>

            <input
                type="search"
                placeholder="Busca proyecto por nombre..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />

            {
                isLoading
                    ? <p>Buscando proyectos...</p>
                    : (
                        results.length > 0
                            ? <ul>
                                {results.map(proyect =>
                                    <li key={proyect.id}>
                                        <Link to={`/proyecto/${proyect.idProyect}`}>
                                            <p>{proyect.projectName}</p>
                                            {
                                                proyect.coverArtUrl?.trim() !== '' &&
                                                <img
                                                    src={proyect.coverArtUrl}
                                                    alt={`Portada de ${proyect.projectName}`}
                                                />
                                            }
                                        </Link>
                                    </li>
                                )}
                            </ul>
                            : (
                                query.trim() !== '' && <p>No hay resultados de búsqueda</p>
                            )
                    )
            }

            {
                error && <p>{error.message}</p>
            }
        </div>
    );
};

