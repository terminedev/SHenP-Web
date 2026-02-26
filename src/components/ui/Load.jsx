import { getRandomPhrase } from 'constants/phrases-references';
import { Glasses } from 'components/ui/SVGs';

import loadStyles from 'styles/ui/Load.module.css';


export default function Load() {
    const phrase = getRandomPhrase();

    return (
        <section
            className={loadStyles.container}
            role="status"
            aria-live="polite"
            aria-busy="true"
        >
            <p>{phrase}</p>

            <div aria-hidden="true">
                <Glasses />
            </div>
        </section>
    );
}