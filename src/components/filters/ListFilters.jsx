import { useCallback, memo } from 'react';
import { FILTERS } from 'constants/filters';
import { STATE_OF_ISSUE } from 'constants/state-of-issue';

import listFiltersStyles from 'styles/filters/ListFilters.module.css';

export default memo(function ListFilters({ filterActual = {}, changeFilter = () => { }, disabled = false }) {

    // 1. Desestructuración de los valores actuales
    const { gender, state } = filterActual;


    // 2. Manejador de cambios optimizado con useCallback
    const handleChange = useCallback((field, value) => {
        if (disabled) return;

        changeFilter(prev => ({
            ...prev,
            [field]: value === "" ? null : value
        }));
    }, [changeFilter]);


    // 3. Si el filtro está desactivado: 
    const styles = {
        opacity: disabled ? 0.5 : 1,
        pointerEvents: disabled ? 'none' : 'auto',
        filter: disabled ? 'grayscale(1)' : 'none'
    };


    // Sub-componente interno para evitar la duplicación de código en los selectores.
    const FilterGroup = ({ id, label, value, field, options, defaultOptionText }) => (
        <div className={listFiltersStyles.filterGroup}>
            <label htmlFor={id} className={listFiltersStyles.label}>
                {label}:
            </label>
            <select
                id={id}
                value={value || ""}
                onChange={(e) => handleChange(field, e.target.value)}
                className={listFiltersStyles.select}
                aria-label={`Filtrar por ${label}`}
            >
                <option value="">{defaultOptionText}</option>
                {options.map(item => (
                    <option key={item} value={item}>
                        {item}
                    </option>
                ))}
            </select>
        </div>
    );

    // 3. Renderizado principal
    return (
        <aside
            className={listFiltersStyles.filtersContainer}
            style={styles}
            role="search"
            aria-label="Filtros de búsqueda"
        >
            {/* Control para Géneros */}
            <FilterGroup
                id="currentGenre"
                label="Géneros"
                field="gender"
                value={gender}
                options={FILTERS}
                defaultOptionText="Todos"
            />

            {/* Control para Estados */}
            <FilterGroup
                id="currentState"
                label="Estados"
                field="state"
                value={state}
                options={STATE_OF_ISSUE}
                defaultOptionText="Todos los estados"
            />
        </aside>
    );
});