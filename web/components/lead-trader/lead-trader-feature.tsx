'use client';

import React from 'react'
import { PageTitle, LeaderCardList, AlertSuccess, SearchInput} from '@/components/lead-trader/lead-trader-ui'

const LeadersFeature = () => {
  return (
    <div className="px-4 pt-4 md:px-8">
      <AlertSuccess msg="Team member has been added successfully." />
      <div className='pt-12 flex justify-between'>
        <PageTitle />
        <SearchInput />
      </div>
      <LeaderCardList />
    </div>
  )
}

export default LeadersFeature