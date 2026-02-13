import { getRandomPhrase } from 'constants/phrases-references';

export default function Load() {
    const phrase = getRandomPhrase();

    return (
        <div>
            <p>{phrase}</p>
        </div>
    );
};