import { FILTERS } from 'constants/filters';
import { STATE_OF_ISSUE } from 'constants/state-of-issue';

import listFiltersStyles from 'styles/filters/ListFilters.module.css';

export default function ListFilters({ filterActual, changeFilter }) {
    const { gender, state } = filterActual;

    const handleChange = (field, value) => {
        changeFilter(prev => ({ ...prev, [field]: value === "" ? null : value }));
    };

    return (
        <div className={listFiltersStyles.filtersContainer}>

            {/* Grupo de Filtro: Géneros */}
            <div className={listFiltersStyles.filterGroup}>
                <label htmlFor='currentGenre' className={listFiltersStyles.label}>
                    Géneros:
                </label>
                <select
                    id='currentGenre'
                    value={gender || ""}
                    onChange={(e) => handleChange('gender', e.target.value)}
                    className={listFiltersStyles.select}
                >
                    <option value="">Todos</option>
                    {FILTERS.map(filter => (
                        <option key={filter} value={filter}>
                            {filter}
                        </option>
                    ))}
                </select>
            </div>

            {/* Grupo de Filtro: Estados */}
            <div className={listFiltersStyles.filterGroup}>
                <label htmlFor='currentState' className={listFiltersStyles.label}>
                    Estados:
                </label>
                <select
                    id='currentState'
                    value={state || ""}
                    onChange={(e) => handleChange('state', e.target.value)}
                    className={listFiltersStyles.select}
                >
                    <option value="">Todos los estados</option>
                    {STATE_OF_ISSUE.map(filter => (
                        <option key={filter} value={filter}>
                            {filter}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
}