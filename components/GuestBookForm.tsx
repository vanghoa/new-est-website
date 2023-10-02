'use client';

import React, { useRef, useState } from 'react';
import { ImageFrame } from './SmallComponents';
import { LineLoose } from './Line';
import { myAction } from './GuestBook_ServerAction';
//import { useAddGuest } from './GuestBookContext';

export default function GuestBookForm() {
    const [name, setName] = useState('');
    const formref = useRef<HTMLFormElement>(null);
    const [trace, setTrace] = useState('Leave your trace!');
    const Update = myAction.bind(null);
    //const addGuest = useAddGuest();

    return (
        <form
            ref={formref}
            action={async (formData: FormData) => {
                const { message, data } = await Update(formData);
                formref.current?.reset();
                setTrace('Thank you for being here <3');
                console.log(message);
                //data && addGuest(data);
            }}
            onSubmit={() => setTrace(`Posting...`)}
            id="guestbookform"
            className="tw-w-full tw-flex tw-flex-col tw-gap-6 tw-justify-end tw-items-center"
        >
            <h2>{trace}</h2>
            {trace != 'Thank you for being here <3' && (
                <ImageFrame elem={LineLoose} className="tw-w-full tw-h-full">
                    <label className="tw-w-full tw-flex tw-flex-col sm:tw-flex-row tw-items-center tw-gap-3">
                        <input
                            className="tw-w-full !tw-text-black tw-p-3"
                            type="text"
                            name="name"
                            onChange={(e) => setName(e.target.value)}
                        />
                        <div className="tw-font-bold tw-py-3 tw-px-1 tw-text-center hover:after:tw-content-['_<-'] hover:before:tw-content-['->_'] sm:tw-w-[8rem] tw-w-full tw-cursor-pointer">
                            <input
                                type="submit"
                                value="Submit"
                                className="tw-cursor-pointer"
                            />
                        </div>
                    </label>
                </ImageFrame>
            )}
        </form>
    );
}
