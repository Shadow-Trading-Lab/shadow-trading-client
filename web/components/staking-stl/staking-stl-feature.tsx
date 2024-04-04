'use client';

import React, { useState } from 'react'
import { StakingTabs, AlertSuccess } from '@/components/staking-stl/staking-stl-ui'

const StakingSTLFeature = () => {
    const [action, setAction] = useState('staking' as string)
    const [showModal, setShowModal] = useState(false)
  return (
    <div className="px-4 pt-4 md:px-8">
        {showModal&&<AlertSuccess msg={action==='staking'?"stake successfully":"unstake successfully"} setShowModal={setShowModal} />}
        <StakingTabs setAction={setAction} setShowModal={setShowModal} />
    </div>
  )
}

export default StakingSTLFeature