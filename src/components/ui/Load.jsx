import { getRandomPhrase } from 'constants/phrases-references';

import loadStyles from 'styles/ui/Load.module.css';
import { Glasses } from 'components/ui/SVGs';

export default function Load() {
    const phrase = getRandomPhrase();

    return (
        <section className={loadStyles.container}>
            <p>{phrase}</p>
            <Glasses />
        </section>
    );
}