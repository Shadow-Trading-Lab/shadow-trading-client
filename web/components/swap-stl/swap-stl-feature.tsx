'use client';

import React, { useState } from 'react'
import { AlertSuccess, Uniswap } from './swap-stl-ui';

const SwapSTLFeature = () => {
    const [action, setAction] = useState('swap' as string)
    const [showModal, setShowModal] = useState(false)
    const [price, setPrice] = useState(100)

    return (
        <div className="px-4 pt-4 md:px-8">
            {showModal&&<AlertSuccess msg={action==='swap'?"swap successfully":"unswap successfully"} setShowModal={setShowModal} />}
            <Uniswap setAction={setAction} setShowModal={setShowModal} price={price} />
        </div>
    )
}

export default SwapSTLFeature