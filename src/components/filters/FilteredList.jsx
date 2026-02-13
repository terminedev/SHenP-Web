import { useState, useMemo } from "react";
import ListFilters from 'components/filters/ListFilters';
import ProjectCard from 'components/proyects/ProjectCard';
import { filterProjects } from 'functions/filters';

export default function FilteredList({ proyects }) {
    const [filter, setFilter] = useState({
        gender: null,
        state: null
    });

    const filteredResults = useMemo(() =>
        filterProjects(filter, proyects),
        [filter, proyects]
    );

    return (
        <>
            <ListFilters filterActual={filter} changeFilter={setFilter} />
            {
                filteredResults.length > 0
                    ?
                    <ul>
                        {filteredResults.map(proyect => <li key={proyect.id}><ProjectCard proyect={proyect} /></li>)}
                    </ul>
                    :
                    <p>No hay proyectos</p>
            }
        </>
    );
}