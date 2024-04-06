'use client';

import React, { useState } from 'react'
import { AlertSuccess, Uniswap, UniswapCopy } from './swap-stl-ui';

const SwapSTLFeature = () => {
    const [action, setAction] = useState('swap' as string)
    const [showModal, setShowModal] = useState(false)
    const [price, setPrice] = useState(100)

    return (
        <div className="p-16 md:px-8 min-h-screen max-w-screen-xl mx-auto">
            {showModal&&<AlertSuccess msg={action==='swap'?"swap successfully":"unswap successfully"} setShowModal={setShowModal} />}
            {/* <Uniswap setAction={setAction} setShowModal={setShowModal} price={price} /> */}
            <UniswapCopy setAction={setAction} setShowModal={setShowModal} price={price} />
        </div>
    )
}

export default SwapSTLFeature