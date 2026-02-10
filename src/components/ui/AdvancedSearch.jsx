import { Link } from "react-router-dom";

export default function AdvancedSearch({ onClose }) {

    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);

    useEffect(() => {
        if (query.trim() === '') return;

        const debounceTimer = setTimeout(async () => {

        }, 700);

        return () => clearTimeout(debounceTimer);
    }, [query]);

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
                results.length > 0
                    ?
                    <ul>
                        {results.map(proyect =>
                            <li key={proyect.id}>
                                <Link to={`/proyecto/${proyect.idProyect}`}>
                                    <p>{proyect.projectName}</p>
                                    {
                                        proyect.coverArtUrl?.trim() !== '' && <img src={proyect.coverArtUrl} alt={`Portada del proyecto ${projectName ?? 'desconocido'}`} />
                                    }
                                </Link>
                            </li>
                        )
                        }
                    </ul>
                    :
                    <p>No hay resultados de búsqueda</p>
            }
        </div>
    );
};
