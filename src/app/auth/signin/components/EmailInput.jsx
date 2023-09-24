"use client";

import React, { useCallback, useState } from 'react';
import { signIn } from 'next-auth/react';

export default function EmailInput({ onSuccess }) {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSignin = useCallback(async () => {
        setLoading(true);
        const res = await signIn('email', {
            email: email,
            redirect: false,
            // callbackUrl: '/'
        });
        setLoading(false);
        if (res.error) {
            if (res.url) {
                window.location.replace(res.url);
            }

        } else {
            onSuccess(email);
        }
    }, [email, onSuccess]);

    const onKeyPress = useCallback(
        (e) => {
            if (e.key === 'Enter') {
                handleSignin();
            }
        },
        [handleSignin]
    );

    return (
        <div className='flex flex-col space-y-10'>
            <input
                type="email"
                name="email"
                placeholder="e.g. jane.doe@company.com"
                value={email}
                onChange={(e) => {
                    setEmail(e.target.value);
                }}
                onKeyDown={onKeyPress}
                className='focus:outline-none focus:ring-2 focus:ring-slate-500 border rounded-md py-3 px-5'
            />
            <button disabled={loading} onClick={handleSignin} className='bg-slate-800 text-white rounded-md py-3 w-full text-center hover:bg-slate-700'>Next</button>
        </div>
    );
};
