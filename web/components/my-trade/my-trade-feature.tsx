'use client';

import React from 'react'
import { LeaderTradeContent, TradeTabs} from '@/components/my-trade/my-trade-ui'

const MyTradeFeature = () => {
  return (
    <div className="p-4 md:px-8 min-h-screen max-w-screen-xl mx-auto">
        <TradeTabs />
        {/* <LeaderTradeContent /> */}
    </div>
  )
}

export default MyTradeFeature