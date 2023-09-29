'use client';

import { GuestBook } from '@prisma/client';
import {
    useState,
    createContext,
    ReactNode,
    Dispatch,
    SetStateAction,
    useContext,
} from 'react';

export const passedContext = createContext<{
    guests: GuestBook[];
    setGuests: Dispatch<SetStateAction<GuestBook[]>>;
} | null>(null);

export function useAddGuest() {
    const passedValue = useContext(passedContext);
    return (guest: GuestBook) =>
        passedValue?.setGuests([...passedValue?.guests, guest]);
}

export function useRetrieveGuest() {
    const passedValue = useContext(passedContext);
    return passedValue?.guests || [];
}

export default function GuestBookContext({
    children,
}: {
    children: ReactNode;
}) {
    const [guests, setGuests] = useState<GuestBook[]>([]);
    const passedValue = {
        guests,
        setGuests,
    };

    return (
        <passedContext.Provider value={passedValue}>
            {children}
        </passedContext.Provider>
    );
}
