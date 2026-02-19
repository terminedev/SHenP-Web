import NoResultMessage from 'assets/no-results/no-results-text.png';

export default function NoResults() {
    return (
        <div>
            <img src={NoResultMessage} alt='resultados no encontrados' />
        </div>
    )
};