"use client";

import React from 'react';
import { useLazyQuery } from '@apollo/client';
import { createCheckoutSession } from '@/lib/graphql';
import Loading from './Loading';

export default function CheckoutButton() {
    const [startCheckout, { loading, error, data }] = useLazyQuery(createCheckoutSession, {
        onCompleted: (queryData) => {
            console.log(queryData);
            let data = JSON.parse(queryData.createCheckoutSession);

            let checkoutUrl = data.url;

            window.location.assign(checkoutUrl);
        }
    });


    if (loading) return <Loading />;

    if (error) return `error = ${error}`;

    return (
        <div>
            <button onClick={() => startCheckout()} className='bg-slate-800 text-white rounded-md py-3 px-5 text-center hover:bg-slate-700'>Checkout</button>
        </div>
    );
}
