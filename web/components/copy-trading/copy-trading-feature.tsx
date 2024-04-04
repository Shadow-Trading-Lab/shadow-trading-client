'use client';

import { PageTitle, LeaderCardList, SearchInput, ApplyLeadTrader} from '@/components/copy-trading/copy-trading-ui'

const LeadersFeature = () => {
  return (
    <div>
      <ApplyLeadTrader />
      <div className="p-4 md:px-8 min-h-screen max-w-screen-xl mx-auto">
        <div className='py-12 flex justify-between'>
          <PageTitle />
          <SearchInput />
        </div>
        <LeaderCardList />
      </div>
    </div>
  )
}

export default LeadersFeature