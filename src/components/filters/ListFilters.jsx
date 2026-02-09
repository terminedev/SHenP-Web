export default function ListFilters({ filterActual, changeFilter }) {

    const filters = [
        'rpg',
        'aventura',
        'comedia',
        'drama',
        'duelos',
        'terror',
        'suspenso',
        'supervivencia',
        'guerra'
    ];

    return (
        <ul>
            {filters.map(filter => (
                <li key={filter}>
                    <button type="button" onClick={() => changeFilter(filter)}>
                        {filter}
                        {filterActual === filter && <button type="button" onClick={() => changeFilter(null)}>X</button>}
                    </button>
                </li>
            ))}
        </ul>
    );

};