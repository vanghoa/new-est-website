import seedrandom from 'seedrandom';

export default function useFixedRandom() {
    seedrandom('fixed random', { global: true });
    return null;
}
