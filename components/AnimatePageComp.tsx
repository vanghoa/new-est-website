'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { ReactNode, useEffect } from 'react';

export default function AnimatePageComp({
    children,
    backgroundColor = 'black',
    textColor = 'white',
}: {
    children: ReactNode;
    backgroundColor?: string;
    textColor?: string;
}) {
    useEffect(() => {
        document.documentElement.style.setProperty(
            '--background-color',
            backgroundColor
        );
        document.documentElement.style.setProperty('--text-color', textColor);
    }, []);
    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 2 }}
            >
                {children}
            </motion.div>
        </AnimatePresence>
    );
}
