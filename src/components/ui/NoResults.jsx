import NoResultMessage from 'assets/no-results/no-results-text.png';
import noResultsStyles from 'styles/ui/NoResults.module.css';

export default function NoResults() {
    return (
        <div
            className={noResultsStyles.container}
            role="status"
            aria-live="polite"
        >
            <img
                className={noResultsStyles.messageImage}
                src={NoResultMessage}
                alt="No se encontraron resultados para tu búsqueda"
                loading="lazy"
            />
        </div>
    );
}