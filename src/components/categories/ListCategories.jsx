import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import FilteredList from 'components/filters/FilteredList';
import ProjectCard from 'components/proyects/ProjectCard';
import { Loading } from 'components/ui/SVGs';
import { getFirebaseErrorMessage } from 'utils/helpers/getFirebaseErrorMessage.js';

import listCategoriesStyles from 'styles/components/ListCategories.module.css';

export default function ListCategories({
    category,
    allowFiltering = true,
    asynchronousFunction = async () => { },
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
    }, [nameCategory, asynchronousFunction]);

    const { proyects, isLoading, error } = asynchronousData;

    return (
        <div className={listCategoriesStyles.container}>
            <h2 className={listCategoriesStyles.title}>{`${nameCategory}s`}</h2>

            {
                isLoading
                    ?
                    (
                        <div className='space-center'>
                            <Loading />
                        </div>
                    )
                    :
                    (
                        allowFiltering
                            ?
                            (
                                <FilteredList
                                    proyects={proyects}
                                />
                            )
                            :
                            (
                                proyects.length > 0
                                    ? (
                                        <ul className={listCategoriesStyles.projectList}>
                                            {proyects.map(proyect => (
                                                <li key={proyect.id} className={listCategoriesStyles.projectItem}>
                                                    <ProjectCard proyect={proyect} />
                                                </li>
                                            ))}

                                            <li className={listCategoriesStyles.viewMoreItem}>
                                                <Link to={`/catalogo/${nameCategory}`} className={listCategoriesStyles.viewMoreLink}>
                                                    Ver más
                                                </Link>
                                            </li>
                                        </ul>
                                    )
                                    : <p
                                        className={`${listCategoriesStyles.emptyMessage} space-center`}
                                    >
                                        No hay proyectos.
                                    </p>
                            )
                    )
            }
            {error &&
                <p
                    className={`${listCategoriesStyles.errorMessage} space-center`}
                >
                    {getFirebaseErrorMessage(error.message)}
                </p>
            }
        </div>
    );
}