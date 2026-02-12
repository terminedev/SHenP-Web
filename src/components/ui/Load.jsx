import { getRandomPhrase } from 'constants/phrases-references';
import { ReactComponent as LogoLoading } from 'assets/svg/loading.svg';

export default function Load() {
    const phrase = getRandomPhrase();

    return (
        <div>
            <LogoLoading />
            <p>{phrase}</p>
        </div>
    );
};