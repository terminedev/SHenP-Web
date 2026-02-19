import NoResultMessage from 'assets/no-results/no-results-text.png';
import noResultsStyles from 'styles/ui/NoResults.module.css'; // Lo renombré a 'styles' por convención, es más corto

export default function NoResults() {
    return (
        <div className={noResultsStyles.container}>
            <img
                className={noResultsStyles.messageImage}
                src={NoResultMessage}
                alt='resultados no encontrados'
            />
        </div>
    );
}