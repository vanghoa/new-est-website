import { ReactNode, Suspense } from 'react';

function SuspenseFallback() {
    return <div>Waiting</div>;
}

export function SuspenseNotion({ children }: { children: ReactNode }) {
    return (
        <Suspense fallback={<SuspenseFallback></SuspenseFallback>}>
            {children}
        </Suspense>
    );
}
