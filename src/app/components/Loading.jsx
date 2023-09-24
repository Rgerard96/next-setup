import React from 'react';

export default function Loading() {
    return (
        <div className='flex h-screen justify-center m-10'>
            <div className='flex w-14 justify-between'>
                <div className='h-3 w-3 bg-slate-600 rounded-full animate-bounce1'></div>
                <div className='h-3 w-3 bg-slate-600 rounded-full animate-bounce2'></div>
                <div className='h-3 w-3 bg-slate-600 rounded-full animate-bounce3'></div>
            </div>
        </div>
    );
}
