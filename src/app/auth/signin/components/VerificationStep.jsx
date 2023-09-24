"use client";

import React, { useCallback, useState } from 'react';

export default function VerificationStep({ email }) {
    const [code, setCode] = useState('');

    const onReady = useCallback(() => {
        window.location.href = `/api/auth/callback/email?&token=${code}&email=${encodeURIComponent(
            email
        )}`;

    }, [code, email]);

    const onKeyPress = useCallback(
        (e) => {
            if (e.key === 'Enter') {
                onReady();
            }
        },
        [onReady]
    );

    return (
        <div className='border rounded-md p-7 w-1/2 max-w-md'>
            <h2 className='text-xl font-bold mb-3 text-center'>Verify email</h2>
            <p className='text-center mb-5'>Insert the magic code you received on your email</p>
            <div className='flex flex-col space-y-10'>
                <div className='flex flex-col items-center space-y-5'>
                    <label className='text-lg font-semibold'>
                        Magic code
                    </label>
                    <input
                        type="text"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        onKeyDown={onKeyPress}
                        className='focus:outline-none focus:ring-2 focus:ring-slate-500 border rounded-md py-3 px-5 w-full text-center'
                    />
                </div>

                <button onClick={onReady} className='bg-slate-800 text-white rounded-md py-3 w-full text-center hover:bg-slate-700'>Go</button>
            </div>
        </div>
    );
};
