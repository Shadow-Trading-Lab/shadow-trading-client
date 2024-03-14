'use client';

import React from 'react'
import { PageTitle, LeaderCardList, BeATraderButton} from '@/components/lead-trader/lead-trader-ui'

const LeadersFeature = () => {
  return (
    <div className="px-4 pt-4 md:px-8">
      <BeATraderButton />
      <PageTitle />
      <LeaderCardList />
    </div>
  )
}

export default LeadersFeature