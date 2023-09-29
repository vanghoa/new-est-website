import seedrandom from 'seedrandom';

export default function useFixedRandom() {
    seedrandom('fixed random', { global: true });
    return null;
}

export function _useFixedRandomWSeed(seed: any) {
    seedrandom(`${seed}`, { global: true });
    return null;
}
