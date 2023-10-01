import { Line } from './Line';
import { tw_line_overflow, tw_divider } from './TailwindClass';

export default function Footer() {
    return <Line className={`${tw_line_overflow} ${tw_divider}`}></Line>;
}
