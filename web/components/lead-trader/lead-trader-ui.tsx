import { ChartContainer } from '@mui/x-charts';
import { LinePlot, MarkPlot } from '@mui/x-charts/LineChart';
import { useState } from "react";

export function LeaderCard({name, pnl30, mdd30, aum}: {name: string, pnl30: number, mdd30: number, aum: number}) {
  const [showDepositCard, setShowDepositCard] = useState(false)
  return (<>
    <div className="relative group overflow-hidden p-8 rounded-xl bg-white border border-gray-200 dark:border-gray-800 dark:bg-gray-700">
      <div aria-hidden="true" className="inset-0 absolute aspect-video border rounded-full -translate-y-1/2 group-hover:-translate-y-1/4 duration-300 bg-gradient-to-b from-green-500 to-white dark:from-white dark:to-white blur-2xl opacity-25 dark:opacity-5 dark:group-hover:opacity-10"></div>
      <div className="relative">
          <div>
            <span className="text-xl text-white font-bold">{name}</span>
          </div>
          <div>
            <PnlChart />
          </div>
          <div className="mt-6 pb-6 flex justify-between gap-16">
            <div>
              <div>30 MDD</div>
              <div className="font-semibold text-white">{mdd30} %</div>
            </div>
            <div>
              <div>30 Pnl</div>
              <div className="font-semibold text-white">{pnl30}</div>
            </div>
            <div>
              <div>AUM</div>
              <div className="font-semibold text-white">{aum}</div>
            </div>
          </div>
          <div className="w-full">
            <button 
              className="px-4 py-2 w-full text-white bg-indigo-600 rounded-lg duration-150 hover:bg-indigo-700 active:shadow-lg"
              onClick={() => setShowDepositCard(true)}>
              Copy
            </button>
          </div>
      </div>
    </div>
  </>)
}

type Leader = {
  name: string;
  aum: number;
  mdd30: number;
  pnl30: number; // Allow pnl30 to be either string or number
};

export function LeaderCardList(){
  const leaders: Leader[] = [
    {
      name: 'Jack',
      aum: 588800,
      mdd30: 16.8,
      pnl30: 10045
    },
    {
      name: 'Amy',
      aum: 188800,
      mdd30: 18.8,
      pnl30: 10045
    },
    {
      name: 'Tom',
      aum: 388800,
      mdd30: 58.8,
      pnl30: 10045
  },
    {
      name: 'Jack',
      aum: 588800,
      mdd30: 16.8,
      pnl30: 10045
    },
    {
      name: 'Amy',
      aum: 188800,
      mdd30: 18.8,
      pnl30: 10045
    },
    {
      name: 'Tom',
      aum: 388800,
      mdd30: 58.8,
      pnl30: 10045
  },
    {
      name: 'Jack',
      aum: 588800,
      mdd30: 16.8,
      pnl30: 10045
    },
    {
      name: 'Amy',
      aum: 188800,
      mdd30: 18.8,
      pnl30: 10045
    },
    {
      name: 'Tom',
      aum: 388800,
      mdd30: 58.8,
      pnl30: 10045
  },
]
  return <div className="py-16">
    <div className="flex flex-wrap justify-center gap-x-8 gap-y-12">
      {leaders.map(el => <LeaderCard key={el.name} {...el} />)}
    </div>
  </div>
}

export function PnlChart() {
  const pData = [4000, 3000, 2000, 2780, 1890, 2390, 3490];
const xLabels = [
  'Page A',
  'Page B',
  'Page C',
  'Page D',
  'Page E',
  'Page F',
  'Page G',
];

  return (
    <ChartContainer
      width={500}
      height={300}
      series={[{ type: 'line', data: pData }]}
      xAxis={[{ scaleType: 'point', data: xLabels }]}
      sx={{
        '.MuiLineElement-root': {
          stroke: '#8884d8',
          strokeWidth: 2,
        },
        '.MuiMarkElement-root': {
          stroke: '#8884d8',
          scale: '0.6',
          fill: '#fff',
          strokeWidth: 2,
        },
      }}
      disableAxisListener
    >
      <LinePlot />
      <MarkPlot />
    </ChartContainer>
  );
}

export function PageTitle(){
  return <div className="max-w-lg px-8 pt-12">
  <h2 className="text-white-800 text-5xl font-bold">
    Lead Traders
  </h2>
</div>
}

export function BeATraderButton(){
  return <div className="max-w-lg px-8 pt-12">
    <button
      className="px-6 py-3.5 text-indigo-600 bg-indigo-50 rounded-lg duration-150 hover:bg-indigo-100 active:bg-indigo-200"
    >
      Be a trader
    </button>
  </div>
}