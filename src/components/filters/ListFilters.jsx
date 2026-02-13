import { FILTERS } from 'constants/filters';
import { STATE_OF_ISSUE } from 'constants/state-of-issue';

export default function ListFilters({ filterActual, changeFilter }) {
    const { gender, state } = filterActual;

    const handleChange = (field, value) => {
        changeFilter(prev => ({ ...prev, [field]: value === "" ? null : value }));
    };

    return (
        <>
            <label htmlFor='currentGenre'>Géneros:</label>
            <select
                id='currentGenre'
                value={gender || ""}
                onChange={(e) => handleChange('gender', e.target.value)}
            >
                <option value="">Todos</option>
                {FILTERS.map(filter => (
                    <option key={filter} value={filter}>
                        {filter}
                    </option>
                ))}
            </select>

            <label htmlFor='currentState'>Estados:</label>
            <select
                id='currentState'
                value={state || ""}
                onChange={(e) => handleChange('state', e.target.value)}
            >
                <option value="">Todos los estados</option>
                {STATE_OF_ISSUE.map(filter => (
                    <option key={filter} value={filter}>
                        {filter}
                    </option>
                ))}
            </select>
        </>
    );
};