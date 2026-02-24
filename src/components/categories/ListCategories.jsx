import { useEffect, useState, memo } from "react";
import { Link } from "react-router-dom";

// Componentes
import FilteredList from 'components/filters/FilteredList';
import ProjectCard from 'components/proyects/ProjectCard';
import { Loading } from 'components/ui/SVGs';

// Utilidades y Estilos
import { getFirebaseErrorMessage } from 'utils/helpers/getFirebaseErrorMessage.js';
import listCategoriesStyles from 'styles/components/ListCategories.module.css';

export default function ListCategories({
    category,
    allowFiltering = true,
    asynchronousFunction = async () => { },
}) {


    // 1. Variables y Estado 
    const { nameCategory } = category;

    const [asynchronousData, setAsynchronousData] = useState({
        proyects: [],
        isLoading: false,
        error: null,
    });

    const { proyects, isLoading, error } = asynchronousData;


    // 2. Efecto secundario para obtener la función asíncrona.
    useEffect(() => {
        let isMounted = true;

        const getProyects = async () => {
            try {
                setAsynchronousData(prev => ({ ...prev, isLoading: true, error: null }));

                const fetchedProyects = await asynchronousFunction();

                if (isMounted) {
                    setAsynchronousData({ proyects: fetchedProyects, isLoading: false, error: null });
                }
            } catch (err) {
                if (isMounted) {
                    setAsynchronousData({ proyects: [], isLoading: false, error: err });
                }
            }
        };

        getProyects();

        return () => isMounted = false;

    }, [nameCategory, asynchronousFunction]);


    // 3. Funciones de Renderizado Condicional

    const renderContent = () => {

        // Estado 1: Cargando
        if (isLoading) {
            return (
                <div className="space-center">
                    <Loading />
                </div>
            );
        }

        // Estado 2: Lista con filtros activados
        if (allowFiltering) {
            return <FilteredList proyects={proyects} />;
        }

        // Estado 3: Lista normal sin filtros (si hay proyectos)
        if (proyects.length > 0) {
            return (
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
            );
        }

        // Estado 4: Vacío (sin proyectos)
        return (
            !error && (
                <p className={`${listCategoriesStyles.emptyMessage} space-center`}>
                    No hay proyectos.
                </p>
            )
        );
    };

    // 4. Renderizado Principal
    return (
        <div className={listCategoriesStyles.container}>
            <h2 className={listCategoriesStyles.title}>
                {`${nameCategory}s`}
            </h2>

            {/* Contenido principal basado en las condiciones */}
            {renderContent()}

            {/* Mensaje de error (si existe) */}
            {error && (
                <p className={`${listCategoriesStyles.errorMessage} space-center`}>
                    {getFirebaseErrorMessage(error.message)}
                </p>
            )}
        </div>
    );
};