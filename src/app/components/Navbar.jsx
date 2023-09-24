"use client";

import { signOut, useSession } from "next-auth/react";
import Link from 'next/link';
import React from 'react';

export default function Navbar() {
    const { data: session } = useSession();
    return (
        <div className='bg-slate-800 text-white'>
            <div className='p-7 flex items-center justify-between'>
                <div className="space-x-5 flex">
                    <Link href='/'>Home</Link>
                    <Link href='/dashboard'>Dashboard</Link>
                </div>
                <div>
                    {session ? (
                        <div className="space-x-5 flex">
                            <Link href='/' onClick={() => signOut()}>Sign out</Link>
                            <p>{session.user.email}</p>
                        </div>
                    ) : (
                        <Link href='/auth/signin'>Sign in</Link>
                    )}
                </div>
            </div>
        </div>
    );
}
