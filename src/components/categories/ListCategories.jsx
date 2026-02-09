import { useMemo, useState } from "react";
import ListFilters from 'components/filters/ListFilters';
import ProjectCard from 'components/proyects/ProjectCard';
import { filterProjects } from 'functions/filters';
import { Link } from "react-router-dom";

export default function ListCategories({ category }) {

    const { nameCategory } = category;

    const [proyects, setProyects] = useState([]);
    const [filter, setFilter] = useState(null);
    const filteredResults = useMemo(() => filterProjects(filter, proyects), [filter, setProyects, proyects]);

    // Obtener proyectos por categoría y con un límite

    return (
        <li key={nameCategory}>

            <h2>{nameCategory}</h2>
            <ListFilters filterActual={filter} changeFilter={setFilter} />

            {
                filteredResults.length > 0
                    ?
                    <ul>
                        {filteredResults.map(proyect => <ProjectCard proyect={proyect} />)}
                        <li key={`ver-mas-${nameCategory}`}><Link to={`/proyectos/${nameCategory}`}>Ver más</Link></li>
                    </ul>
                    : <p>No hay proyectos</p>
            }

        </li>
    );
};