'use client';

import React, { useRef, useState } from 'react';
import { ImageFrame } from './SmallComponents';
import { LineLoose } from './Line';
import { myAction } from './GuestBook_server';

export default function GuestBook() {
    const [name, setName] = useState('');
    const formref = useRef<null | HTMLFormElement>(null);
    const Update = myAction.bind(null);

    return (
        <form
            ref={formref}
            action={async (formData: FormData) => {
                const { message } = await Update(formData);
                formref?.current?.reset();
                console.log(message);
            }}
            className="tw-w-full tw-flex tw-flex-col tw-gap-6 tw-justify-end tw-items-center"
        >
            <h2>Leave me a sign that you are here too!</h2>
            <ImageFrame elem={LineLoose} className="tw-w-full tw-h-full">
                <label className="tw-w-full tw-flex tw-gap-4 tw-p-2">
                    <input
                        className="tw-w-full !tw-text-black tw-p-3"
                        type="text"
                        name="name"
                        onChange={(e) => setName(e.target.value)}
                    />
                    <div className="tw-font-bold tw-py-3 tw-px-1 tw-text-center hover:after:tw-content-['_<-'] hover:before:tw-content-['->_'] tw-w-[8rem] tw-cursor-pointer">
                        <input type="submit" className="tw-cursor-pointer" />
                    </div>
                </label>
            </ImageFrame>
        </form>
    );
}
