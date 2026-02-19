import { useState, useMemo } from "react";
import ListFilters from 'components/filters/ListFilters';
import ProjectCard from 'components/proyects/ProjectCard';
import { filterProjects } from 'utils/filters';
import NoResults from 'components/ui/NoResults';

import filteredListStyles from 'styles/components/FilteredList.module.css';

export default function FilteredList({ proyects = [] }) {

    const [filter, setFilter] = useState({
        gender: null,
        state: null
    });

    const filteredResults = useMemo(() => {
        if (!proyects) return [];
        return filterProjects(filter, proyects);
    }, [filter, proyects]);

    return (
        <>
            <ListFilters filterActual={filter} changeFilter={setFilter} />

            {
                filteredResults.length > 0
                    ?
                    (
                        <ul className={filteredListStyles.gridContainer}>
                            {filteredResults.map(proyect => (
                                <li key={proyect.id} className={filteredListStyles.gridItem}>
                                    <ProjectCard proyect={proyect} />
                                </li>
                            ))}
                        </ul>
                    )
                    :
                    (
                        <NoResults />
                    )
            }
        </>
    );
}