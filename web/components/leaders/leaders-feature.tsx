'use client';

import React from 'react'
import { PageTitle, LeaderCardList} from '@/components/leaders/leaders-ui'

const LeadersFeature = () => {
  return (
    <div className="px-4 pt-4 md:px-8">
      <PageTitle />
      <LeaderCardList />
    </div>
  )
}

export default LeadersFeature