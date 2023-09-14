import { ReactNode } from 'react';

export default function HeaderLayout({ children }: { children: ReactNode }) {
    return (
        <header className="tw-my-[10vh] tw-relative tw-block">
            {children}
        </header>
    );
}
