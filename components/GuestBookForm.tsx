'use client';

import React, { useRef, useState } from 'react';
import { ImageFrame } from './SmallComponents';
import { LineLoose } from './Line';
import { myAction } from './GuestBook_ServerAction';
//import { useAddGuest } from './GuestBookContext';

export default function GuestBookForm() {
    const [name, setName] = useState('');
    const formref = useRef<HTMLFormElement>(null);
    const [trace, setTrace] = useState(`leave`);
    const Update = myAction.bind(null);
    //const addGuest = useAddGuest();

    return (
        <form
            ref={formref}
            action={async (formData: FormData) => {
                const { message, data } = await Update(formData);
                formref.current?.reset();
                setTrace(data ? 'success' : 'fail');
                console.log(message);
                //data && addGuest(data);
            }}
            onSubmit={() => {
                setTrace(`posting`);
                setName('');
            }}
            id="guestbookform"
            className="tw-w-full tw-flex tw-flex-col tw-text-center tw-gap-6 tw-justify-end tw-items-center"
        >
            <h2>
                {(() => {
                    switch (trace) {
                        case 'leave':
                            return `Leave some traces! ( public on this site but anonymously )`;
                        case 'success':
                            return "Thank you for being here <3 you can view by tapping ``'-...__...-'``";
                        case 'posting':
                            return 'Posting...';
                        default:
                            return 'Something is wrong... Please try again later thank qiu :((';
                    }
                })()}
            </h2>
            {(trace == 'leave' || trace == 'posting') && (
                <ImageFrame elem={LineLoose} className="tw-w-full tw-h-full">
                    <label
                        className={`tw-w-full tw-flex tw-flex-col sm:tw-flex-row tw-items-center tw-p-2`}
                    >
                        <input
                            className="tw-w-full !tw-text-black tw-p-3"
                            type="text"
                            name="name"
                            onChange={(e) => setName(e.target.value)}
                        />
                        <div
                            className={`tw-font-bold tw-py-3 tw-px-1 tw-text-center sm:tw-w-[8rem] tw-w-full tw-cursor-pointer ${
                                name == ''
                                    ? 'tw-opacity-60'
                                    : `hover:after:tw-content-['_<-'] hover:before:tw-content-['->_']`
                            }`}
                        >
                            <input
                                type="submit"
                                value="Submit"
                                className="tw-cursor-pointer"
                                disabled={name == '' ? true : false}
                            />
                        </div>
                    </label>
                </ImageFrame>
            )}
        </form>
    );
}
