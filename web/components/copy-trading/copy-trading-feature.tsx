'use client';

import { PageTitle, LeaderCardList, SearchInput, ApplyLeadTrader} from '@/components/copy-trading/copy-trading-ui'

const LeadersFeature = () => {
  return (
    <>
      <ApplyLeadTrader />
      <div className="px-4 pt-4 md:px-8">
        <div className='pt-12 flex justify-between'>
          <PageTitle />
          <SearchInput />
        </div>
        <LeaderCardList />
      </div>
    </>
  )
}

export default LeadersFeature