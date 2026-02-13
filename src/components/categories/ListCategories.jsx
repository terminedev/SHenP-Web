import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import FilteredList from 'components/filters/FilteredList';
import ProjectCard from 'components/proyects/ProjectCard';

export default function ListCategories({
    category,
    allowFiltering = true,
    asynchronousFunction = async () => { } }) {

    const { nameCategory } = category;

    const [asynchronousData, setAsynchronousData] = useState({
        proyects: [],
        isLoading: false,
        error: null,
    });

    useEffect(() => {
        const getProyects = async () => {
            try {
                setAsynchronousData({ proyects: [], isLoading: true, error: null });

                const proyects = await asynchronousFunction();

                setAsynchronousData({ proyects: proyects, isLoading: false, error: null });
            } catch (error) {
                setAsynchronousData({ proyects: [], isLoading: false, error: error });
            }
        }

        getProyects();
    }, []);

    const { proyects, isLoading, error } = asynchronousData;

    return (
        <>
            <h2>{nameCategory}</h2>

            {
                isLoading
                    ?
                    <p>Obteniendo proyectos...</p>
                    :
                    (
                        allowFiltering
                            ?
                            <FilteredList
                                proyects={proyects}
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
                    )

            }
            {
                error &&
                <p>{error.message}</p>
            }
        </>
    );
};