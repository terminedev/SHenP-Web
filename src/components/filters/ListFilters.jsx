import { FILTERS } from 'constants/filters';

export default function ListFilters({ filterActual, changeFilter }) {

    return (
        <ul>
            {FILTERS.map(filter => (
                <li key={filter}>
                    <button type="button" onClick={() => changeFilter(filter)}>
                        {filter}
                        {filterActual === filter &&
                            <button
                                type="button"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    changeFilter(null);
                                }}
                            >
                                X
                            </button>}
                    </button>
                </li>
            ))}
        </ul>
    );

};