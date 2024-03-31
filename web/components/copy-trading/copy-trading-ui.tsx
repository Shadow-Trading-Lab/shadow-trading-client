import { ChartContainer } from '@mui/x-charts';
import { LinePlot, MarkPlot } from '@mui/x-charts/LineChart';

import * as Dialog from "@radix-ui/react-dialog";
import { useEffect, useState } from "react";
import { useTeamShadowProgram } from '../team-shadow/team-shadow-data-access';
import { useLeaderAccounts } from './copy-trading-data-access';


export function LeaderCard({name, pnl30, mdd30, aum, address}: {name: string, pnl30: number, mdd30: number, aum: number, address: string}) {
  return <div className="relative group overflow-hidden p-8 rounded-xl bg-white border border-gray-200 dark:border-gray-800 dark:bg-gray-700">
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
          <CopyTrade address={address} />
        </div>
    </div>
  </div>
}

type Leader = {
  name: string;
  aum: number;
  mdd30: number;
  pnl30: number; // Allow pnl30 to be either string or number
  address: string;
};

const leaders: Leader[] = [
  {
    name: 'Jack',
    aum: 588800,
    mdd30: 16.8,
    pnl30: 10045,
    address: '8MnEryqP6avszGZVB8oN5XiYa7RUjVqdA5vddKRHJtHT'
  },
  {
    name: 'Amy',
    aum: 188800,
    mdd30: 18.8,
    pnl30: 10045,
    address: '8MnEryqP6avszGZVB8oN5XiYa7RUjVqdA5vddKRHJtHT'
  },
  {
    name: 'Tom',
    aum: 388800,
    mdd30: 58.8,
    pnl30: 10045,
    address: '8MnEryqP6avszGZVB8oN5XiYa7RUjVqdA5vddKRHJtHT'
},
  {
    name: 'Jack',
    aum: 588800,
    mdd30: 16.8,
    pnl30: 10045,
    address: '8MnEryqP6avszGZVB8oN5XiYa7RUjVqdA5vddKRHJtHT'
  },
  {
    name: 'Amy',
    aum: 188800,
    mdd30: 18.8,
    pnl30: 10045,
    address: '8MnEryqP6avszGZVB8oN5XiYa7RUjVqdA5vddKRHJtHT'
  },
  {
    name: 'Tom',
    aum: 388800,
    mdd30: 58.8,
    pnl30: 10045,
    address: '8MnEryqP6avszGZVB8oN5XiYa7RUjVqdA5vddKRHJtHT'
},
  {
    name: 'Jack',
    aum: 588800,
    mdd30: 16.8,
    pnl30: 10045,
    address: '8MnEryqP6avszGZVB8oN5XiYa7RUjVqdA5vddKRHJtHT'
  },
  {
    name: 'Amy',
    aum: 188800,
    mdd30: 18.8,
    pnl30: 10045,
    address: '8MnEryqP6avszGZVB8oN5XiYa7RUjVqdA5vddKRHJtHT'
  },
  {
    name: 'Tom',
    aum: 388800,
    mdd30: 58.8,
    pnl30: 10045,
    address: '8MnEryqP6avszGZVB8oN5XiYa7RUjVqdA5vddKRHJtHT'
},
]

export function LeaderCardList(){
  // const {data, isLoading} = useLeaderAccounts()
  // console.log(data)
  
  return <div className="py-16">
    {/* {isLoading? <>Loading...</>:  */}
    <div className="flex flex-wrap justify-center gap-x-8 gap-y-12">
      {/* {data?.map(el => <li key={`${el.publicKey}`}>{el.publicKey?.toBase58()} 
        <li>
          {el.publicKey.toBase58()}
        </li>
        <li>
          {Number(el.account?.totalDeposits)}
        </li>
      </li>)} */}
      {leaders.map((el, i) => <LeaderCard key={`${i} ${el.name}`} {...el} />)}
    </div>
    {/* } */}
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
  return <div className="max-w-lg px-8">
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

export function CopyTrade({address}: {address: string}){
  const [amount, setAmount] = useState<number>(0);
  const {} = useTeamShadowProgram()
  const handleCopyTrade = () => {
  }

  return (
    <Dialog.Root>
      <Dialog.Trigger className="px-4 py-3 w-full text-white bg-indigo-600 rounded-lg duration-150 hover:bg-indigo-700 active:shadow-lg">
        Copy
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 w-full h-full bg-black opacity-40" />
        <Dialog.Content className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-full max-w-3xl mx-auto px-4">
          <div className="rounded-md shadow-lg px-4 py-6 bg-white border border-gray-200 dark:border-gray-800 dark:bg-gray-700">
            <div className="flex items-center justify-between">
              <Dialog.Title className="text-lg font-medium text-gray-800 dark:text-white">
                Copy Trader {address}
              </Dialog.Title>
              <Dialog.Close className="p-2 text-gray-400 rounded-md hover:bg-gray-100">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 mx-auto"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </Dialog.Close>
            </div>
            <div>
              <label className="text-gray-600 dark:text-white">
                  Copy Amount
              </label>
              <div className="relative mt-2 max-w-xs text-gray-500">
                  <span className="h-6 text-gray-400 absolute left-3 inset-y-0 my-auto">
                      &#x24;
                  </span>
                  <input
                      type="number"
                      value={amount}
                      onChange={e => setAmount(+e.target.value)}
                      placeholder="0.00"
                      className="w-full pl-8 pr-16 py-2 appearance-none bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                  />
                  <div className="absolute inset-y-0 right-3 flex items-center">
                      <select className="text-sm bg-transparent outline-none px-1 rounded-lg h-full">
                          <option>SOL</option>
                      </select>
                  </div>
              </div>
            </div>
            {amount>0?
              <Dialog.Close asChild>
                <button className="text-sm mt-3 py-2.5 px-8 flex-1 text-white bg-indigo-600 rounded-md outline-none ring-offset-2 ring-indigo-600 focus:ring-2">
                  Copy
                </button>
              </Dialog.Close>:
              <button className="px-7 py-3.5 text-white bg-indigo-300 cursor-not-allowed rounded-lg">
                Copy
              </button>
            }
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export function SearchInput() {
  return <form
      onSubmit={(e) => e.preventDefault()} 
      className="max-w-md px-4">
      <div className="relative">
          <svg xmlns="http://www.w3.org/2000/svg" className="absolute top-0 bottom-0 w-6 h-6 my-auto text-gray-400 left-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
              type="text"
              placeholder="Search"
              className="w-full py-3 pl-12 pr-4 text-gray-500 dark:text-white border rounded-md outline-none bg-gray-50 focus:border-indigo-600 dark:border-gray-800 dark:bg-gray-700"
          />
      </div>
  </form>
}

export function AlertSuccess({msg}: {msg: string}) {
  return (
      <div className="fixed mt-12 mx-4 px-4 rounded-md border-l-4 border-green-500 bg-green-50 md:max-w-2xl md:mx-auto md:px-8 z-50 bottom-12 right-12">
          <div className="flex justify-between py-3">
              <div className="flex">
                  <div>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 rounded-full text-green-500" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                  </div>
                  <div className="self-center ml-3">
                      <span className="text-green-600 font-semibold">
                          Success
                      </span>
                      <p className="text-green-600 mt-1">
                          {msg}
                      </p>
                  </div>
              </div>
              <button className="self-start text-green-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
              </button>
          </div>
      </div>
  )
}

export function ApplyLeadTrader() {
    return (
      <div className="alert alert-warning bg-gray-300 text-warning-content/80 rounded-none flex justify-center">
        <span>
          <strong>Be a Lead Trader, enjoy 10% profit share!</strong> 
        </span>
        <ApplyLeadTraderButton />
      </div>
    );
}


export function ApplyLeadTraderButton(){
  const [amount, setAmount] = useState<number>(0);

  return (
    <Dialog.Root>
      <Dialog.Trigger className="px-5 py-3 text-white duration-150 bg-indigo-600 rounded-lg hover:bg-indigo-700 active:shadow-lg">
        Apply Now
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 w-full h-full bg-black opacity-40" />
        <Dialog.Content className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-full max-w-3xl mx-auto px-4">
          <div className="rounded-md shadow-lg px-4 py-6 bg-white border border-gray-200 dark:border-gray-800 dark:bg-gray-700">
            <div className="flex items-center justify-between">
              <Dialog.Title className="mb-4 text-3xl font-medium text-gray-800 dark:text-white">
                Apply Lead Trader
              </Dialog.Title>
              <Dialog.Close className="p-2 text-gray-400 rounded-md hover:bg-gray-100">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 mx-auto"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </Dialog.Close>
            </div>
            <div>
              <form
                onSubmit={(e) => e.preventDefault()}
                className="space-y-5">
                <div>
                    <label className="font-medium">
                        Name
                    </label>
                    <input
                        type="text"
                        required
                        className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-white border-gray-400 border-2 shadow-sm rounded-lg"
                    />
                </div>
                <div>
                    <label className="font-medium">
                        Describe
                    </label>
                    <textarea
                        required
                        className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-white border-gray-400 border-2 shadow-sm rounded-lg"
                    />
                </div>
                <div>
                    <label className="font-medium">
                        Amount
                    </label>
                    <input    
                        type="number"
                        placeholder='Minimum 3000 USDC'
                        required
                        className="w-full mt-2  px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-white border-gray-400 border-2 shadow-sm rounded-lg"
                    />
                </div>
                <div>
                  <div className="flex items-center space-x-2 mb-4">
                      <input id="default-checkbox" type="checkbox" value="" required className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                      <label htmlFor="default-checkbox" className="ms-2 text-sm font-medium dark:text-gray-300">I have read and agreed to the User Service Agreement</label>
                  </div>
                </div>
                <div>
                  <Dialog.Close asChild>
                    <button
                        className="w-full mt-2 px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150"
                    >
                        Apply
                    </button>
                  </Dialog.Close> 
                </div>
              </form>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};