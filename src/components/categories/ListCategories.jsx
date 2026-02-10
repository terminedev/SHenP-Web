import { useState } from "react";
import FilteredList from 'components/filters/FilteredList';
import ProjectCard from 'components/proyects/ProjectCard';
import { Link } from "react-router-dom";

export default function ListCategories({ category, allowFiltering = true, asynchronousFunction = () => { } }) {

    const { nameCategory } = category;
    const [proyects, setProyects] = useState([]);



    return (
        <>
            <h2>{nameCategory}</h2>

            {
                allowFiltering
                    ?
                    <FilteredList
                        proyects={proyects}
                        nameCategory={nameCategory}
                    />
                    :
                    (
                        proyects.length > 0
                            ?
                            <ul>
                                {proyects.map(proyect => <li key={proyect.id}><ProjectCard proyect={proyect} /></li>)}
                                <li><Link to={`/proyectos/${nameCategory}`}>Ver más</Link></li>
                            </ul>
                            :
                            <p>No hay proyectos.</p>
                    )
            }
        </>
    );
};