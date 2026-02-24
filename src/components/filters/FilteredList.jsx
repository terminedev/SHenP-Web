// Librerías externas
import { useState, useMemo } from "react";

// Componentes internos
import ListFilters from 'components/filters/ListFilters';
import ProjectCard from 'components/proyects/ProjectCard';
import NoResults from 'components/ui/NoResults';

// Utilidades
import { filterProjects } from 'utils/filters';

// Estilos
import filteredListStyles from 'styles/filters/FilteredList.module.css';

export default function FilteredList({ proyects = [] }) {

    // 1. Estado local del filtro.
    const [filter, setFilter] = useState({
        gender: null,
        state: null
    });

    // 2. Memorizar los filtrados.
    const filteredResults = useMemo(() => {
        return filterProjects(filter, proyects);
    }, [filter, proyects]);

    // 3. Almacenar si hay resultados.
    const hasResults = filteredResults.length > 0;

    return (
        <>
            {/* Controles de filtrado */}
            <ListFilters filterActual={filter} changeFilter={setFilter} />

            {/* Renderizado condicional de resultados */}
            {hasResults ? (
                <ul
                    className={filteredListStyles.gridContainer}
                    aria-label="Resultados filtrados"
                    aria-live="polite"
                    aria-atomic="false"
                >
                    {filteredResults.map((proyect) => (
                        <li key={proyect.idProyect} className={filteredListStyles.gridItem}>
                            <ProjectCard proyect={proyect} />
                        </li>
                    ))}
                </ul>
            ) : (
                <div
                    className="space-center"
                    role="status"
                    aria-live="polite"
                >
                    <NoResults />
                </div>
            )}
        </>
    );
}