'use client';
import React, {
    useContext,
    useRef,
    ReactNode,
    useEffect,
    PropsWithChildren,
} from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { LayoutRouterContext } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { usePathname } from 'next/navigation';
/*
function FrozenRouter(props: PropsWithChildren<{}>) {
    const context = useContext(LayoutRouterContext);
    const frozen = useRef(context).current;

    return (
        <LayoutRouterContext.Provider value={frozen}>
            {props.children}
        </LayoutRouterContext.Provider>
    );
}

export function AnimatePresenceClient({ children }: { children: ReactNode }) {
    const pathname = usePathname();
    return (
        <AnimatePresence mode="wait" key={'animatepres'}>
            <motion.div
                key={pathname}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
            >
                <FrozenRouter>{children}</FrozenRouter>
            </motion.div>
        </AnimatePresence>
    );
}
*/
export default function AnimatePageComp({
    children,
    backgroundColor = 'var(--default-bg)',
    textColor = 'white',
    upwght = false,
}: {
    children: ReactNode;
    backgroundColor?: string;
    textColor?: string;
    upwght?: boolean;
}) {
    useEffect(() => {
        document.documentElement.style.setProperty(
            '--background-color',
            backgroundColor
        );
        document.documentElement.style.setProperty('--text-color', textColor);
        document.documentElement.style.setProperty(
            '--font-wght',
            upwght ? '500' : '100'
        );
    }, []);
    return <>{children}</>;
}
