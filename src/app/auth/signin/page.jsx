"use client";

import React, { useState } from 'react';
import { getSession, getProviders } from 'next-auth/react';
import VerificationStep from './components/VerificationStep';
import EmailInput from './components/EmailInput';

export default function SignIn() {
    const session = getSession();
    const provider = getProviders();

    const [email, setEmail] = useState('');
    const [showVerificationStep, setShowVerificationStep] = useState(false);

    if (showVerificationStep) {
        return (
            <div className='h-full flex items-center justify-center'>
                <VerificationStep email={email} provider={provider} />
            </div>
        );
    }

    return (
        <div className='h-full flex items-center justify-center'>
            <div className='border rounded-md p-7 w-1/2 max-w-md'>
                <h2 className='text-xl font-bold mb-10 text-center'>Sign in with your email</h2>
                <EmailInput
                    onSuccess={(email) => {
                        setEmail(email);
                        setShowVerificationStep(true);
                    }}
                />
            </div>
        </div>
    );
};
