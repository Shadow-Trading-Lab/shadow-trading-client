'use client';

import React, { useState } from 'react'
import { SwapTabs } from './swap-stl-ui';

const SwapSTLFeature = () => {
    const [action, setAction] = useState('swap' as string)
    const [showModal, setShowModal] = useState(false)
    const [price, setPrice] = useState(0)

    return (
        <div className="px-4 pt-4 md:px-8">
            <SwapTabs setAction={setAction} setShowModal={setShowModal} price={price} />
        </div>
    )
}

export default SwapSTLFeature