'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { ReactNode, useEffect } from 'react';

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
    return (
        <AnimatePresence key={'animatepres'}>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
            >
                {children}
            </motion.div>
        </AnimatePresence>
    );
}
