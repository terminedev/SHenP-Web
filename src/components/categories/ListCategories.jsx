import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import FilteredList from 'components/filters/FilteredList';
import ProjectCard from 'components/proyects/ProjectCard';

// 1. Agregamos 'customClass' a las props (por defecto string vacío)
export default function ListCategories({
    category,
    allowFiltering = true,
    asynchronousFunction = async () => { },
    customClass = ""
}) {

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
    }, [nameCategory]);

    const { proyects, isLoading, error } = asynchronousData;

    return (
        <>
            {/* Si quieres, puedes pasarle la clase al h2 también, o dejarlo así */}
            <h2>{nameCategory}</h2>

            {
                isLoading
                    ? <p>Obteniendo proyectos...</p>
                    : (
                        allowFiltering
                            ? <FilteredList proyects={proyects} />
                            : (
                                proyects.length > 0
                                    ? (
                                        // 2. Aquí aplicamos la clase dinámica junto con las que ya tenga
                                        <ul className={customClass}>
                                            {proyects.map(proyect => (
                                                <li key={proyect.id}>
                                                    <ProjectCard proyect={proyect} />
                                                </li>
                                            ))}

                                            {/* El botón de ver más será el último elemento de la fila */}
                                            <li className="see-more-item">
                                                <Link to={`/catalogo/${nameCategory}`}>
                                                    Ver más
                                                </Link>
                                            </li>
                                        </ul>
                                    )
                                    : <p>No hay proyectos.</p>
                            )
                    )
            }
            {error && <p>{error.message}</p>}
        </>
    );
};